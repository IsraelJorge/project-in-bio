'use server'

import { FieldValue } from 'firebase-admin/firestore'

import { db } from '@/lib/firebase'

export const increaseProfileVisits = async (profileId: string) => {
  try {
    const profileRef = db.collection('profiles').doc(profileId)

    await db.runTransaction(async transaction => {
      const profile = await transaction.get(profileRef)

      if (!profile.exists) return

      transaction.update(profileRef, {
        totalVisits: FieldValue.increment(1)
      })
    })

    return true
  } catch {
    return false
  }
}
