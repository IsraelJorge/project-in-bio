'use client'

import { useParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { useStripe } from '@/hooks/use-stripe'

export function PlanButtons() {
  const { createStripeCheckout } = useStripe()

  const params = useParams<{ profileId: string }>()

  async function handleSubscribe() {
    if (!params?.profileId) return
    const { profileId } = params

    await createStripeCheckout({
      metadata: { profileId },
      isSubscription: true
    })
  }

  async function handlePurchase() {
    if (!params?.profileId) return
    const { profileId } = params

    await createStripeCheckout({
      metadata: { profileId },
      isSubscription: false
    })
  }

  return (
    <div className="flex gap-4">
      <Button onClick={handleSubscribe}>R$ 9,90 / mês</Button>
      <Button onClick={handlePurchase}>R$ 99,90 Vitalício</Button>
    </div>
  )
}
