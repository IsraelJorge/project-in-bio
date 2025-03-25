import { loadStripe, Stripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'

import { ENV } from '@/env'

export function useStripe() {
  const [stripe, setStripe] = useState<Stripe | null>(null)

  useEffect(() => {
    async function loadStripeAsync() {
      const stripeInstance = await loadStripe(ENV.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
      setStripe(stripeInstance)
    }

    loadStripeAsync()
  }, [])

  async function createStripeCheckout({
    metadata,
    isSubscription
  }: {
    metadata: Record<string, string>
    isSubscription: boolean
  }) {
    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ metadata, isSubscription })
      })

      const data = await response.json()

      await stripe?.redirectToCheckout({
        sessionId: data.sessionId
      })
    } catch (error) {
      console.error(error)
    }
  }

  async function handleCreateStripePortal() {
    try {
      const response = await fetch('/api/stripe/create-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        console.error('Failed to create portal')
        return
      }

      const data = await response.json()

      window.location.href = data.url
    } catch (error) {
      console.error(error)
    }
  }

  return { createStripeCheckout, handleCreateStripePortal }
}
