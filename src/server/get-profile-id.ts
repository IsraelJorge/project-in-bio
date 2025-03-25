'use server'

import { db } from '@/lib/firebase'

export const getProfileId = async (id?: string) => {
  if (!id) return

  try {
    const snapshot = await db
      .collection('profiles')
      .where('userId', '==', id)
      .get()
    return snapshot.docs[0]?.id
  } catch (error) {
    console.log(error)
    return
  }
}
