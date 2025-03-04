'use server'

import { db } from '@/lib/firebase'

export const verifyLink = async (link: string) => {
  const snapshot = await db.collection('profiles').doc(link).get()
  return snapshot.exists
}
