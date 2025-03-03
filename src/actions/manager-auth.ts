'use server'

import { Route } from '@/utils/routes'

import { auth, signIn, signOut } from '../lib/auth'

export async function manageAuth() {
  const session = await auth()

  if (!session) {
    return await signIn('google', { redirectTo: Route.newProject })
  }

  return await signOut({ redirectTo: '/' })
}
