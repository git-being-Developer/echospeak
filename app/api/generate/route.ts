import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import OpenAI from 'openai';
import { v4 as uuidv4 } from 'uuid';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const PRESET_VOICE_ID = 'pNInz6obpgDQGcFmaJgB';

export async function POST(request: NextRequest) {
  console.log('[generate] ELEVENLABS_API_KEY exists:', !!ELEVENLABS_API_KEY);

  if (!ELEVENLABS_API_KEY) {
    return NextResponse.json({
      error: 'ELEVENLABS_API_KEY is not configured',
      details: 'Please add ELEVENLABS_API_KEY to your environment variables and restart the server'
    }, { status: 500 });
  }
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { scenario, mode, selectedVoiceType } = await request.json();

    if (!scenario || scenario.trim().length === 0) {
      return NextResponse.json({ error: 'Scenario is required' }, { status: 400 });
    }

    const generationMode = mode || 'future';

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('credits')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    if (profile.credits < 5) {
      return NextResponse.json(
        { error: 'Insufficient credits. You need at least 5 credits.' },
        { status: 400 }
      );
    }

    let useCustomVoice = false;
    let userVoiceId = null;

    if (selectedVoiceType === 'custom') {
      const { data: voice } = await supabase
        .from('voices')
        .select('id')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();

      if (voice) {
        useCustomVoice = true;
        userVoiceId = voice.id;
      } else {
        return NextResponse.json({
          error: 'No custom voice found. Please record your voice first.'
        }, { status: 400 });
      }
    }

    const systemPrompt =
      generationMode === 'future'
        ? `You write deeply personal future-self messages.

Avoid generic storytelling.
Do NOT describe waking up, sunlight, alarms, morning routines, or cinematic scene-setting.
Do NOT use filler imagery.

Write as if the future version of the user is speaking directly to them.

Focus on:
- Concrete achievements
- Specific outcomes
- Emotional transformation
- Identity shifts
- Earned success

Use second-person voice.
Keep it grounded and realistic.
No magical claims.
No fantasy imagery.
No vague motivational language.

Start directly with impact.
Do not describe surroundings.
Begin with transformation.

Keep it under 600 words.
End with a strong reinforcing closing line.`
        : `You write powerful first-person affirmations.

No storytelling.
No cinematic description.
No filler.

Write 20–25 affirmations.
Each line short.
Clear.
Identity-based.
Confident.
Grounded.

Avoid exaggerated wealth claims.
Avoid unrealistic promises.
Avoid repetition.

Tone:
Strong.
Calm.
Certain.
Concise.`;

    const userPrompt =
      generationMode === 'future'
        ? `User goal or scenario:
${scenario}

Write a specific and outcome-focused future-self message based on this.`
        : `User description:
${scenario}

Generate affirmations based on this.`;

    let completion;
    try {
      completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        max_tokens: 600,
      });
    } catch (openaiError: any) {
      return NextResponse.json({
        error: 'OpenAI script generation failed',
        details: openaiError.message || openaiError.toString()
      }, { status: 500 });
    }

    let script = completion.choices[0]?.message?.content?.trim() || '';

    if (!script) {
      return NextResponse.json({
        error: 'Failed to generate script',
        details: 'OpenAI returned empty response'
      }, { status: 500 });
    }

    if (script.length > 2000) {
      script = script.substring(0, 2000);
    }

    let tempVoiceId: string | null = null;
    let audioBuffer: Buffer;

    try {
      if (useCustomVoice) {
        const { data: voiceSampleData, error: downloadError } = await supabase.storage
          .from('voice-samples')
          .download(`${user.id}/sample.wav`);

        if (downloadError || !voiceSampleData) {
          return NextResponse.json({
            error: 'Failed to download voice sample. Please re-record your voice.',
            details: downloadError?.message
          }, { status: 500 });
        }

        const voiceSampleBuffer = Buffer.from(await voiceSampleData.arrayBuffer());
        const voiceName = `EchoSelf-${user.id}-${uuidv4()}`;

        const formData = new FormData();
        formData.append('name', voiceName);
        formData.append('files', new Blob([voiceSampleBuffer]), 'sample.wav');

        const createVoiceResponse = await fetch(
          'https://api.elevenlabs.io/v1/voices/add',
          {
            method: 'POST',
            headers: {
              'xi-api-key': ELEVENLABS_API_KEY || '',
            },
            body: formData,
          }
        );

        if (!createVoiceResponse.ok) {
          const errorText = await createVoiceResponse.text();
          return NextResponse.json({
            error: 'Failed to create temporary voice in ElevenLabs',
            details: errorText
          }, { status: 500 });
        }

        const voiceData = await createVoiceResponse.json();
        tempVoiceId = voiceData.voice_id;

        const ttsResponse = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${tempVoiceId}`,
          {
            method: 'POST',
            headers: {
              'xi-api-key': ELEVENLABS_API_KEY || '',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              text: script,
              model_id: 'eleven_multilingual_v2',
            }),
          }
        );

        if (!ttsResponse.ok) {
          const errorText = await ttsResponse.text();
          return NextResponse.json({
            error: 'Failed to generate audio with custom voice',
            details: errorText
          }, { status: 500 });
        }

        audioBuffer = Buffer.from(await ttsResponse.arrayBuffer());
      } else {
        const ttsResponse = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${PRESET_VOICE_ID}`,
          {
            method: 'POST',
            headers: {
              'xi-api-key': ELEVENLABS_API_KEY || '',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              text: script,
              model_id: 'eleven_multilingual_v2',
            }),
          }
        );

        if (!ttsResponse.ok) {
          const errorText = await ttsResponse.text();
          return NextResponse.json({
            error: 'Failed to generate audio with preset voice',
            details: errorText
          }, { status: 500 });
        }

        audioBuffer = Buffer.from(await ttsResponse.arrayBuffer());
      }
    } finally {
      if (tempVoiceId) {
        console.log('[generate] Deleting temporary voice:', tempVoiceId);
        try {
          const deleteResponse = await fetch(
            `https://api.elevenlabs.io/v1/voices/${tempVoiceId}`,
            {
              method: 'DELETE',
              headers: {
                'xi-api-key': ELEVENLABS_API_KEY || '',
              },
            }
          );
          console.log('[generate] Voice deletion status:', deleteResponse.ok ? 'success' : 'failed', deleteResponse.status);
        } catch (deleteError) {
          console.error('[generate] Voice deletion error:', deleteError);
        }
      } else {
        console.log('[generate] No temporary voice to delete (using preset voice)');
      }
    }

    const audioFileName = `${user.id}/${uuidv4()}.mp3`;

    const { error: uploadError } = await supabase.storage
      .from('generated-audios')
      .upload(audioFileName, audioBuffer, {
        contentType: 'audio/mpeg',
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json({ error: 'Failed to upload audio' }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage
      .from('generated-audios')
      .getPublicUrl(audioFileName);

    const audioUrl = publicUrlData.publicUrl;

    const { error: audioError } = await supabase.from('audios').insert({
      user_id: user.id,
      voice_id: userVoiceId,
      script,
      audio_url: audioUrl,
      credits_used: 5,
    });

    if (audioError) {
      await supabase.storage.from('generated-audios').remove([audioFileName]);
      return NextResponse.json({ error: 'Failed to save audio' }, { status: 500 });
    }

    const { data: updatedProfile, error: updateError } = await supabase
      .from('profiles')
      .update({ credits: profile.credits - 5, updated_at: new Date().toISOString() })
      .eq('id', user.id)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update credits' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      script,
      audio_url: audioUrl,
      remainingCredits: updatedProfile.credits,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message || 'Internal server error'
    }, { status: 500 });
  }
}

