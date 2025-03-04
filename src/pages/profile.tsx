import Link from 'next/link'

import { ProjectCard } from '@/components/commons/project-card'
import { TotalVisits } from '@/components/commons/total-visits'
import { UserCard } from '@/components/commons/user-card'
import { CreateProjectFormDialog } from '@/components/create-project-form-dialog'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Route } from '@/utils/routes'

type ProfileProps = {
  profileId: string
  isOwner: boolean
  data: {
    userId: string
    totalVisits: number
    createdAt: number
  }
}

export function Profile({ profileId, isOwner }: ProfileProps) {
  return (
    <div className="relative flex h-screen overflow-hidden p-20">
      <div className="fixed left-0 top-0 flex w-full items-center justify-center gap-1 bg-background-tertiary py-2">
        <span>Você está usando a versão trial.</span>
        <Button variant="link" className="font-bold text-accent-green">
          <Link href={Route.upgrade(profileId)}>Faça o upgrade agora!</Link>
        </Button>
      </div>
      <div className="flex h-min w-1/2 justify-center">
        <UserCard />
      </div>

      <ScrollArea>
        <div className="flex w-full flex-wrap content-start justify-center gap-4">
          <ProjectCard
            description="Crie uma página de links personalizada para compartilhar suas redes sociais, portfólio e muito mais."
            name="Project in Bio"
            img="/project1.jpg"
          />
          <ProjectCard
            description="Crie uma página de links personalizada para compartilhar suas redes sociais, portfólio e muito mais."
            name="Project in Bio"
            img="/project1.jpg"
          />
          <ProjectCard
            description="Crie uma página de links personalizada para compartilhar suas redes sociais, portfólio e muito mais."
            name="Project in Bio"
            img="/project1.jpg"
          />
          <ProjectCard
            description="Crie uma página de links personalizada para compartilhar suas redes sociais, portfólio e muito mais."
            name="Project in Bio"
            img="/project1.jpg"
          />
          <ProjectCard
            description="Crie uma página de links personalizada para compartilhar suas redes sociais, portfólio e muito mais."
            name="Project in Bio"
            img="/project1.jpg"
          />
          <ProjectCard
            description="Crie uma página de links personalizada para compartilhar suas redes sociais, portfólio e muito mais."
            name="Project in Bio"
            img="/project1.jpg"
          />
          <ProjectCard
            description="Crie uma página de links personalizada para compartilhar suas redes sociais, portfólio e muito mais."
            name="Project in Bio"
            img="/project1.jpg"
          />

          {isOwner && <CreateProjectFormDialog profileId={profileId} />}
        </div>

        <ScrollBar className="rounded-md bg-background-tertiary" />
      </ScrollArea>

      <div className="absolute bottom-4 left-0 right-0 mx-auto w-min">
        <TotalVisits />
      </div>
    </div>
  )
}
