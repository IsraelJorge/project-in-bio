import Link from 'next/link'

import { ProjectCard } from '@/components/commons/project-card'
import { TotalVisits } from '@/components/commons/total-visits'
import { UserCard } from '@/components/commons/user-card/user-card'
import { CreateProjectFormDialog } from '@/components/create-project-form-dialog'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { getDownloadUrlFromPath } from '@/lib/firebase'
import { ProfileData } from '@/server/get-profile-data'
import { ProjectData } from '@/server/get-profile-projects'
import { Route } from '@/utils/routes'

type ProfileProps = {
  profileId: string
  isOwner: boolean
  projects: ProjectData[]
  profileData: ProfileData
}

export function Profile({
  profileId,
  isOwner,
  profileData,
  projects
}: ProfileProps) {
  return (
    <div className="relative flex h-screen overflow-hidden p-20">
      <div className="fixed left-0 top-0 flex w-full items-center justify-center gap-1 bg-background-tertiary py-2">
        <span>Você está usando a versão trial.</span>
        <Button variant="link" className="font-bold text-accent-green">
          <Link href={Route.upgrade(profileId)}>Faça o upgrade agora!</Link>
        </Button>
      </div>
      <div className="flex h-min w-1/2 justify-center">
        <UserCard profileData={profileData} isOwner={isOwner} />
      </div>

      <ScrollArea>
        <div className="flex w-full flex-wrap content-start justify-center gap-4">
          {projects.map(async project => (
            <ProjectCard
              key={project.id}
              isOwner={isOwner}
              project={{
                ...project,
                imagePath: await getDownloadUrlFromPath(project.imagePath)
              }}
            />
          ))}

          {isOwner && <CreateProjectFormDialog profileId={profileId} />}
        </div>

        <ScrollBar className="rounded-md bg-background-tertiary" />
      </ScrollArea>

      {isOwner && (
        <div className="absolute bottom-4 left-0 right-0 mx-auto w-min">
          <TotalVisits totalVisits={profileData.totalVisits} />
        </div>
      )}
    </div>
  )
}
