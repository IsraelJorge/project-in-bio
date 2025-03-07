import { Header } from '@/components/landing-page/header'
import { PlanButtons } from '@/components/plan-buttons'

export function Upgrade() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <Header />
      <h2 className="text-2xl font-bold">Escolha o plano</h2>
      <PlanButtons />
    </div>
  )
}
