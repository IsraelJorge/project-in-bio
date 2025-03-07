'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { increaseProjectsVisits } from '@/actions/increase-projects-visits'
import { ProjectData } from '@/server/get-profile-projects'
import { formatUrl } from '@/utils/format-url'

export type ProjectCardProps = {
  project?: ProjectData
  isOwner?: boolean
}

export function ProjectCard({ project, isOwner = false }: ProjectCardProps) {
  const {
    description = 'Integração de GitHub e GitLab com o Discord',
    title = 'CodeLink',
    url = '',
    imagePath = '/project1.jpg',
    totalVisits = 0
  } = project ?? {}

  const params = useParams<{ profileId: string }>()

  const handleClick = async () => {
    if (!params?.profileId || !project?.id || isOwner) return
    await increaseProjectsVisits({
      profileId: params.profileId,
      projectId: project.id
    })
  }

  return (
    <Link href={formatUrl(url)} target="_blank" onClick={handleClick}>
      <div className="flex h-[132px] w-[430px] gap-5 rounded-[20px] border border-transparent bg-background-secondary p-3 hover:border-border-secondary">
        <div className="size-24 flex-shrink-0 overflow-hidden rounded-md">
          <Image
            src={imagePath}
            width={96}
            height={108}
            alt="Projeto"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          {isOwner && (
            <span className="text-xs font-bold uppercase text-accent-green">
              {totalVisits} clique{totalVisits > 1 ? 's' : ''}
            </span>
          )}

          <div className="flex flex-col">
            <span className="font-bold text-white">{title}</span>
            <span className="text-sm text-content-body">{description}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
