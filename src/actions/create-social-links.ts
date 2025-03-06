'use server'

import { Timestamp } from 'firebase-admin/firestore'

import { auth } from '@/lib/auth'
import { db } from '@/lib/firebase'

type SocialLinkData = {
  profileId: string
  github: string
  linkedin: string
  twitter: string
  instagram: string
}

export const createSocialLinks = async (data: SocialLinkData) => {
  const session = await auth()

  if (!session) return

  try {
    await db
      .collection('profiles')
      .doc(data.profileId)
      .update({
        socialMedias: {
          github: data.github,
          linkedin: data.linkedin,
          twitter: data.twitter,
          instagram: data.instagram
        },
        updatedAt: Timestamp.now().toMillis()
      })

    return true
  } catch {
    return false
  }
}
