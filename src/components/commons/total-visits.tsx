import { manageAuth } from '@/actions/manager-auth'
import { auth } from '@/lib/auth'

import { Icon } from '../ui/icon'

import { PortalButton } from './portal-button'

type TotalVisitsProps = {
  totalVisits?: number
}

export async function TotalVisits({ totalVisits = 0 }: TotalVisitsProps) {
  const session = await auth()

  return (
    <div className="flex w-min items-center gap-5 whitespace-nowrap rounded-xl border border-border-primary bg-background-secondary px-8 py-3 shadow-lg">
      <span className="font-bold text-white">Total de visitas</span>
      <div className="flex items-center gap-2 text-accent-green">
        <span className="text-3xl font-bold">{totalVisits}</span>
        <Icon name="trending-up" />
      </div>
      {session?.user?.id && (
        <div className="flex items-center gap-2">
          {session?.user?.isSubscribed && <PortalButton />}

          <form action={manageAuth}>
            <button>Sair</button>
          </form>
        </div>
      )}
    </div>
  )
}
