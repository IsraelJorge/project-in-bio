import { notFound } from 'next/navigation'

import { auth } from '@/lib/auth'
import { Profile } from '@/pages/profile'
import { getProfileData } from '@/server/get-profile-data'

export type PageProps = {
  params: Promise<{
    profileId: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { profileId } = await params
  const session = await auth()

  const profileData = await getProfileData(profileId)
  if (!profileData) return notFound()

  const isOwner = profileData.userId === session?.user?.id

  return <Profile profileId={profileId} data={profileData} isOwner={isOwner} />
}
