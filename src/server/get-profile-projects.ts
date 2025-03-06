import 'server-only'

import { db } from '@/lib/firebase'

export type ProjectData = {
  id: string
  userId: string
  title: string
  description: string
  url: string
  imagePath: string
  totalVisits?: number
  createdAt: number
}

export const getProfileProjects = async (profileId: string) => {
  const snapshot = await db
    .collection('profiles')
    .doc(profileId)
    .collection('projects')
    .get()
  return snapshot.docs.map(doc => doc.data()) as ProjectData[]
}
