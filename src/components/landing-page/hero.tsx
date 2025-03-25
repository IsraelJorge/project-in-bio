import { ProfileData } from '@/server/get-profile-data'

import { ProjectCard } from '../commons/project-card'
import { TotalVisits } from '../commons/total-visits'
import { UserCard } from '../commons/user-card/user-card'
import { CreateNow } from '../create-now'

export function Hero() {
  return (
    <div className="flex h-screen">
      <div className="mt-[35vh] flex w-full flex-col gap-2">
        <h1 className="text-5xl font-bold leading-[64px] text-white">
          Seus projetos e redes sociais em um único link
        </h1>
        <h2 className="text-xl leading-6">
          Crie sua própria página de projetos e compartilhe eles com o mundo.
          <br />
          Acompanhe o engajamento com Analytics de cliques
        </h2>
        <CreateNow />
      </div>

      <div className="flex w-full items-center justify-center bg-[radial-gradient(circle_at_50%_50%,#4B2DBB,transparent_55%)]">
        <div className="relative">
          <UserCard
            profileData={
              {
                name: 'Israel Jorge',
                description: 'Desenvolvedor Fullstack 🚀',
                customLinks: [
                  {
                    title: 'Site',
                    url: 'https://'
                  }
                ],
                socialMedias: {
                  github: 'IsraelJorge',
                  linkedin: 'in/israel-jorge-54b5aa174/',
                  twitter: '#',
                  instagram: 'israeljorge_'
                }
              } as ProfileData
            }
          />
          <div className="absolute -bottom-[10%] -right-[45%]">
            <TotalVisits totalVisits={21242} />
          </div>

          <div className="absolute -left-[45%] top-[30%] -z-10">
            <ProjectCard isOwner />
          </div>
          <div className="absolute -left-[55%] -top-[5%] -z-10">
            <ProjectCard isOwner />
          </div>
        </div>
      </div>
    </div>
  )
}
