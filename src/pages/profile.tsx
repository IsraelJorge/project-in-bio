import Link from 'next/link'

import { Route } from '@/utils/routes'

import { ProjectCard } from '../commons/project-card'
import { TotalVisits } from '../commons/total-visits'
import { UserCard } from '../commons/user-card'
import { Button } from '../ui/button'
import { Icon } from '../ui/icon'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

type ProfileProps = {
  profileId: string
}

export function Profile({ profileId }: ProfileProps) {
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
          <button className="flex h-[132px] w-[340px] items-center justify-center gap-2 rounded-[20px] border-border-secondary bg-background-secondary hover:border hover:border-dashed">
            <Icon name="plus" className="size-10 text-accent-green" />
            <span>Novo projeto</span>
          </button>
        </div>

        <ScrollBar className="rounded-md bg-background-tertiary" />
      </ScrollArea>

      <div className="absolute bottom-4 left-0 right-0 mx-auto w-min">
        <TotalVisits />
      </div>
    </div>
  )
}
