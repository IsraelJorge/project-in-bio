import { Header } from '@/components/landing-page/header'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'

export function NewProject() {
  return (
    <div>
      <Header />
      <div className="mx-auto flex h-screen max-w-xl flex-col items-center justify-center gap-10">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold text-white">Escolha seu link</h1>
          <Icon name="rocket" className="size-10" />
        </div>
        <form action="" className="flex w-full items-center gap-2">
          <span>projectinbio.com/</span>
          <Input />
          <Button className="w-[126px]">Criar</Button>
        </form>
        <div>
          <span className="text-accent-pink">Erro de exemplo</span>
        </div>
      </div>
    </div>
  )
}
