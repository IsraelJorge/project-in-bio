import Image from 'next/image'

import { manageAuth } from '@/actions/manager-auth'
import { auth } from '@/lib/auth'

import { Button } from '../ui/button'

export async function Header() {
  const session = await auth()

  return (
    <header className="absolute left-0 right-0 top-0 mx-auto flex max-w-7xl items-center justify-between py-10">
      <div className="flex items-center gap-4">
        <Image width={27} height={32} src="/logo.svg" alt="ProjectInBio Logo" />
        <h3 className="text-2xl font-bold text-white">ProjectInBio</h3>
      </div>
      <div className="flex items-center gap-4">
        {session && <Button>Minha Página</Button>}
        <form action={manageAuth}>
          <Button>{session ? 'Sair' : 'Login'}</Button>
        </form>
      </div>
    </header>
  )
}
