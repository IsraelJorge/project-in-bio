'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/firebase'

export type Link = {
  title: string
  url: string
}

type CustomLinkData = {
  profileId: string
  links: Link[]
}

export const createCustomLinks = async (data: CustomLinkData) => {
  const session = await auth()

  if (!session?.user?.id) return

  try {
    await db.collection('profiles').doc(data.profileId).update({
      customLinks: data.links
    })

    return true
  } catch {
    return false
  }
}
