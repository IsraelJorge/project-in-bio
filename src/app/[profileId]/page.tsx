import { notFound, redirect } from 'next/navigation'

import { increaseProfileVisits } from '@/actions/increase-profile-visits'
import { auth } from '@/lib/auth'
import { Profile } from '@/pages/profile'
import { getProfileData } from '@/server/get-profile-data'
import { getProfileProjects } from '@/server/get-profile-projects'
import { Route } from '@/utils/routes'

export type PageProps = {
  params: Promise<{
    profileId: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { profileId } = await params
  const session = await auth()

  const profileData = await getProfileData(profileId)
  const projects = await getProfileProjects(profileId)

  if (!profileData) return notFound()

  const isOwner = profileData.userId === session?.user?.id

  const isUnsubscribedTrialUser =
    !!session?.user.isTrial && !session.user.isSubscribed

  if (isOwner && !session?.user.isTrial && !session.user.isSubscribed) {
    return redirect(Route.upgrade(profileId))
  }

  if (!isOwner) {
    await increaseProfileVisits(profileId)
  }

  return (
    <Profile
      isUnsubscribedTrialUser={isUnsubscribedTrialUser}
      profileId={profileId}
      profileData={profileData}
      projects={projects}
      isOwner={isOwner}
    />
  )
}
