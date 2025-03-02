import { Profile } from '@/pages/profile'

export type PageProps = {
  params: Promise<{
    profileId: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { profileId } = await params

  return <Profile profileId={profileId} />
}
