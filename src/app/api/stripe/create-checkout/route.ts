import { NextRequest, NextResponse } from 'next/server'

import { ENV } from '@/env'
import { auth } from '@/lib/auth'
import { db } from '@/lib/firebase'
import { stripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const { metadata, isSubscription } = await req.json()

  const price = isSubscription
    ? ENV.STRIPE_SUBSCRIPTION_ID
    : ENV.STRIPE_PRICE_ID

  const userSession = await auth()

  if (
    !userSession?.user?.id ||
    !userSession?.user?.email ||
    !userSession?.user?.name
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const {
    user: { id: userId, email, name }
  } = userSession
  let customerId

  const userRef = db.collection('users').doc(userId)
  const userDoc = await userRef.get()

  if (userDoc.exists) {
    customerId = userDoc.data()?.customerId
  }

  if (!customerId) {
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        userId
      }
    })

    customerId = customer.id

    await userRef.update({ customerId })
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
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
    client_reference_id: userId,
    metadata
  })

  return NextResponse.json({
    sessionId: session.id
  })
}
