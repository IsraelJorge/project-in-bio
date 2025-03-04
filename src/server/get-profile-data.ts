import 'server-only'

import { db } from '@/lib/firebase'

type ProfileData = {
  userId: string
  totalVisits: number
  createdAt: number
}

export const getProfileData = async (link: string): Promise<ProfileData> => {
  const snapshot = await db.collection('profiles').doc(link).get()
  return snapshot.data() as ProfileData
}
