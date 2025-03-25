import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

import { auth } from '@/lib/auth'
import { getProfileId } from '@/server/get-profile-id'
import { Route } from '@/utils/routes'

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth()

  if (!session?.user?.id) return redirect(Route.home)

  const profileId = await getProfileId(session.user.id)

  if (profileId) return redirect(Route.profile(profileId))

  return <>{children}</>
}
