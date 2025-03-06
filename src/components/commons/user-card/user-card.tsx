import Image from 'next/image'
import Link from 'next/link'

import { getDownloadUrlFromPath } from '@/lib/firebase'
import { ProfileData } from '@/server/get-profile-data'
import { formatUrl } from '@/utils/format-url'

import { Button } from '../../ui/button'
import { Icon, IconName } from '../../ui/icon'

import { AddCustomLinkFormDialog } from './add-custom-link-form-dialog'
import { EditSocialLinksFormDialog } from './edit-social-links-form-dialog'
import { EditUserFormDialog } from './edit-user-form-dialog'

type UserCardProps = {
  profileData?: ProfileData
  isOwner?: boolean
}

export async function UserCard({ profileData, isOwner }: UserCardProps) {
  const icons: Record<string, IconName> = {
    github: 'github',
    linkedin: 'linkedin',
    twitter: 'twitter',
    instagram: 'instagram'
  }

  const socialMedias = Object.entries(profileData?.socialMedias ?? {}).flatMap(
    ([key, value]) => {
      if (!value) return []
      return {
        socialMedia: key,
        link: `https://www.${key}.com/${value}`
      }
    }
  )

  return (
    <div className="flex w-[328px] flex-col items-center gap-5 rounded-3xl border border-white border-opacity-10 bg-[#121212] p-5 text-white">
      <div className="size-32">
        <Image
          src={
            profileData?.imagePath
              ? await getDownloadUrlFromPath(profileData.imagePath)
              : '/me.jpg'
          }
          alt={
            profileData?.name
              ? `Foto de perfil de ${profileData.name}`
              : 'Foto de perfil'
          }
          width={96}
          height={104}
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center gap-2">
          <h3 className="min-w-0 overflow-hidden text-2xl font-bold">
            {profileData?.name ?? 'Israel Dev'}
          </h3>
          {isOwner && (
            <EditUserFormDialog
              name={profileData?.name}
              description={profileData?.description}
              imagePath={await getDownloadUrlFromPath(profileData?.imagePath)}
            />
          )}
        </div>
        <p className="opacity-40">
          {profileData?.description ?? '"Eu faço produtos para a Internet"'}
        </p>

        <hr className="mx-auto mt-3 w-[95%] border border-divider-primary" />
      </div>
      <div className="flex w-full flex-col gap-2">
        <span className="text-xs font-medium uppercase">Links</span>

        <div className="flex gap-3">
          {socialMedias.map((socialMedia, index) => {
            return (
              <Button variant="icon" asChild key={index}>
                <Link href={socialMedia.link} target="_blank">
                  <Icon name={icons[socialMedia.socialMedia]} />
                </Link>
              </Button>
            )
          })}
          {isOwner && (
            <EditSocialLinksFormDialog
              socialMediasLinks={profileData?.socialMedias}
            />
          )}
        </div>

        <hr className="mx-auto my-3 w-[95%] border border-divider-primary" />

        <div className="flex min-h-[110px] w-full flex-col gap-3">
          <div className="flex w-full flex-col items-center gap-3">
            {profileData?.customLinks?.map((customLink, index) => {
              if (!customLink.url || !customLink.title) return null
              const url = formatUrl(customLink.url)
              return (
                <Button key={index} className="w-full" asChild>
                  <Link href={url} target="_blank">
                    {customLink.title}
                  </Link>
                </Button>
              )
            })}

            {isOwner && (
              <AddCustomLinkFormDialog customLinks={profileData?.customLinks} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
