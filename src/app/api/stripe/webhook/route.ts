import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

import { ENV } from '@/env'
import { db } from '@/lib/firebase'
import { stripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()

    const signature = req.headers.get('stripe-signature')
    const secret = ENV.STRIPE_WEBHOOK_SECRET

    if (!signature || !secret) {
      return new Response('Invalid request', { status: 400 })
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret)

    switch (event.type) {
      case 'checkout.session.completed':
        const paymentStatus = event.data.object.payment_status
        const paymentIntent = event.data.object.payment_intent

        if (paymentStatus === 'paid') {
          const userId = event.data.object.client_reference_id

          if (userId) {
            await db.collection('users').doc(userId).update({
              isSubscribed: true
            })
          }
        }

        if (paymentStatus === 'unpaid' && paymentIntent) {
          const paymentIntentId = await stripe.paymentIntents.retrieve(
            paymentIntent.toString()
          )

          const hostedVoucherUrl =
            paymentIntentId.next_action?.boleto_display_details
              ?.hosted_voucher_url

          if (hostedVoucherUrl) {
            const userEmail = event.data.object.customer_details?.email
            console.log('Boleto URL:', hostedVoucherUrl)
            console.log('User email:', userEmail)
          }
        }
        console.log('Checkout session completed')
        break
      case 'checkout.session.async_payment_succeeded':
        if (event.data.object.payment_status === 'paid') {
          const userId = event.data.object.client_reference_id

          if (userId) {
            await db.collection('users').doc(userId).update({
              isSubscribed: true
            })
          }
        }
        console.log('Checkout session async payment succeeded')
        break
      case 'customer.subscription.deleted':
        const subscription = event.data.object
        const customerId = subscription.customer as string

        if (customerId) {
          const customer = (await stripe.customers.retrieve(
            customerId
          )) as Stripe.Customer

          if (customer && customer.metadata.userId) {
            const userId = customer.metadata.userId

            await db.collection('users').doc(userId).update({
              isSubscribed: false
            })
          }
        }
        console.log('Customer subscription deleted')
        break
    }

    return new NextResponse(null, { status: 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse(null, { status: 500 })
  }
}
