import { NextResponse } from 'next/server'

import { ENV } from '@/env'
import { stripe } from '@/lib/stripe'

export async function POST(req: Request) {
  const { metadata, isSubscription } = await req.json()

  const price = isSubscription
    ? ENV.STRIPE_SUBSCRIPTION_ID
    : ENV.STRIPE_PRICE_ID

  const session = await stripe.checkout.sessions.create({
    // customer: '',
    line_items: [
      {
        price,
        quantity: 1
      }
    ],
    payment_method_types: isSubscription ? ['card'] : ['card', 'boleto'],
    mode: isSubscription ? 'subscription' : 'payment',
    success_url: `${req.headers.get('origin')}/${metadata.profileId}`,
    cancel_url: `${req.headers.get('origin')}/${metadata.profileId}/upgrade`,
    metadata
  })

  return NextResponse.json({
    sessionId: session.id
  })
}
