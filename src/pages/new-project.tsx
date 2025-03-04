import { CreateLinkForm } from '@/components/landing-page/create-link-form'
import { Header } from '@/components/landing-page/header'
import { Icon } from '@/components/ui/icon'

export function NewProject() {
  return (
    <div>
      <Header />
      <div className="mx-auto flex h-screen max-w-xl flex-col items-center justify-center gap-10">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold text-white">Escolha seu link</h1>
          <Icon name="rocket" className="size-10" />
        </div>
        <CreateLinkForm />
      </div>
    </div>
  )
}
