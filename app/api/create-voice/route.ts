import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    console.log('[create-voice] Starting voice creation...');

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.log('[create-voice] No user found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('[create-voice] User ID:', user.id);

    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile) {
      console.log('[create-voice] No audio file in request');
      return NextResponse.json({ error: 'Audio file is required' }, { status: 400 });
    }

    console.log('[create-voice] Audio file received:', audioFile.name, audioFile.type, audioFile.size, 'bytes');

    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log('[create-voice] Converting to buffer, size:', buffer.length);
    console.log('[create-voice] Uploading to voice-samples bucket...');

    const { error: uploadError } = await supabase.storage
      .from('voice-samples')
      .upload(`${user.id}/sample.wav`, buffer, {
        contentType: 'audio/wav',
        upsert: true,
      });

    if (uploadError) {
      console.error('[create-voice] Upload error:', uploadError);
      return NextResponse.json({
        error: 'Failed to upload voice sample',
        details: uploadError.message,
        bucket: 'voice-samples',
        path: `${user.id}/sample.wav`
      }, { status: 500 });
    }

    console.log('[create-voice] Upload successful, checking for existing voice...');

    const { data: existingVoice } = await supabase
      .from('voices')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (existingVoice) {
      console.log('[create-voice] Existing voice found, updating...');
      const { error: updateError } = await supabase
        .from('voices')
        .update({
          provider: 'elevenlabs_dynamic',
          provider_voice_id: null,
          status: 'active'
        })
        .eq('user_id', user.id);

      if (updateError) {
        console.error('[create-voice] Update error:', updateError);
        return NextResponse.json({
          error: 'Failed to update voice',
          details: updateError.message
        }, { status: 500 });
      }
      console.log('[create-voice] Voice updated successfully');
    } else {
      console.log('[create-voice] No existing voice, creating new...');
      const { error: insertError } = await supabase.from('voices').insert({
        user_id: user.id,
        provider: 'elevenlabs_dynamic',
        provider_voice_id: null,
        status: 'active',
      });

      if (insertError) {
        console.error('[create-voice] Insert error:', insertError);
        await supabase.storage.from('voice-samples').remove([`${user.id}/sample.wav`]);
        return NextResponse.json({
          error: 'Failed to create voice',
          details: insertError.message
        }, { status: 500 });
      }
      console.log('[create-voice] Voice created successfully');
    }

    console.log('[create-voice] Voice creation complete!');
    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.error('[create-voice] Unexpected error:', error);
    return NextResponse.json({
      error: error.message || 'Internal server error',
      details: error.toString(),
      stack: error.stack
    }, { status: 500 });
  }
}
