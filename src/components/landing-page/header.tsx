import Image from 'next/image'
import Link from 'next/link'

import { manageAuth } from '@/actions/manager-auth'
import { auth } from '@/lib/auth'
import { getProfileId } from '@/server/get-profile-id'
import { Route } from '@/utils/routes'

import { Button } from '../ui/button'

export async function Header() {
  const session = await auth()
  const profileId = (await getProfileId(session?.user?.id ?? '')) ?? ''

  return (
    <header className="absolute left-0 right-0 top-0 mx-auto flex max-w-7xl items-center justify-between py-10">
      <div className="flex items-center gap-4">
        <Image width={27} height={32} src="/logo.svg" alt="ProjectInBio Logo" />
        <h3 className="text-2xl font-bold text-white">ProjectInBio</h3>
      </div>
      <div className="flex items-center gap-4">
        {session && (
          <Button asChild>
            <Link href={Route.profile(profileId)}>Minha Página</Link>
          </Button>
        )}
        <form action={manageAuth}>
          <Button>{session ? 'Sair' : 'Login'}</Button>
        </form>
      </div>
    </header>
  )
}
