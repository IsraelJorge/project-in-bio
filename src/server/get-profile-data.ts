import 'server-only'

import { Link } from '@/actions/create-custom-links'
import { db } from '@/lib/firebase'

export type ProfileData = {
  userId: string
  name: string
  description: string
  imagePath?: string
  totalVisits: number
  socialMedias: {
    github: string
    linkedin: string
    twitter: string
    instagram: string
  }
  customLinks?: Link[]
  createdAt: number
  updatedAt: number
}

export const getProfileData = async (link: string): Promise<ProfileData> => {
  const snapshot = await db.collection('profiles').doc(link).get()
  return snapshot.data() as ProfileData
}
