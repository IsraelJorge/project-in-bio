import { Header } from '../landing-page/header'
import { Button } from '../ui/button'

export function Upgrade() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <Header />
      <h2 className="text-2xl font-bold">Escolha o plano</h2>
      <div className="flex gap-4">
        <Button>R$ 9,90 / mês</Button>
        <Button>R$ 99,90 Vitalício</Button>
      </div>
    </div>
  )
}
