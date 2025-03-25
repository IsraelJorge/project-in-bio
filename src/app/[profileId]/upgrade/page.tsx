import { Metadata } from 'next'

import { Upgrade } from '@/pages/upgrade'

export const metadata: Metadata = {
  title: 'ProjectInBio - Upgrade',
  description: 'ProjectInBio - A plataforma de gestão de projetos em biologia.'
}

export default async function UpgradePage() {
  return <Upgrade />
}
