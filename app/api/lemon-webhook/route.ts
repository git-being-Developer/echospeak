import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import crypto from 'crypto';

const WEBHOOK_SECRET = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-signature');

    if (!WEBHOOK_SECRET) {
      console.error('[lemon-webhook] Webhook secret not configured');
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    if (!signature) {
      console.error('[lemon-webhook] No signature provided');
      return NextResponse.json({ error: 'No signature' }, { status: 401 });
    }

    const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
    const digest = hmac.update(body).digest('hex');

    if (signature !== digest) {
      console.error('[lemon-webhook] Invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(body);
    const eventName = payload.meta?.event_name;

    console.log('[lemon-webhook] Event received:', eventName);

    if (eventName !== 'order_created') {
      return NextResponse.json({ received: true });
    }

    const orderData = payload.data;
    const customData = orderData.attributes?.first_order_item?.product_name || '';
    const userEmail = orderData.attributes?.user_email;

    console.log('[lemon-webhook] Product:', customData);
    console.log('[lemon-webhook] Email:', userEmail);

    let creditsToAdd = 0;

    if (customData.includes('10 Credits') || customData.includes('10 credits')) {
      creditsToAdd = 10;
    } else if (customData.includes('50 Credits') || customData.includes('50 credits')) {
      creditsToAdd = 50;
    } else if (customData.includes('100 Credits') || customData.includes('100 credits')) {
      creditsToAdd = 100;
    } else {
      console.error('[lemon-webhook] Unknown product:', customData);
      return NextResponse.json({ error: 'Unknown product' }, { status: 400 });
    }

    const supabase = await createClient();

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, email, credits')
      .eq('email', userEmail)
      .single();

    if (profileError || !profile) {
      console.error('[lemon-webhook] User not found:', userEmail);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('[lemon-webhook] Adding', creditsToAdd, 'credits to user:', profile.id);

    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        credits: profile.credits + creditsToAdd,
        updated_at: new Date().toISOString(),
      })
      .eq('id', profile.id);

    if (updateError) {
      console.error('[lemon-webhook] Failed to update credits:', updateError);
      return NextResponse.json({ error: 'Failed to update credits' }, { status: 500 });
    }

    const { error: transactionError } = await supabase.from('credit_transactions').insert({
      user_id: profile.id,
      credits_added: creditsToAdd,
      transaction_type: 'purchase',
      payment_reference: `lemon_${orderData.id}`,
    });

    if (transactionError) {
      console.error('[lemon-webhook] Failed to log transaction:', transactionError);
    }

    console.log('[lemon-webhook] Credits added successfully');

    return NextResponse.json({ success: true, credits_added: creditsToAdd });
  } catch (error: any) {
    console.error('[lemon-webhook] Error:', error);
    return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
  }
}
