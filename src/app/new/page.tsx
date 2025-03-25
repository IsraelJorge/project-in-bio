import { Metadata } from 'next'

import { trackServerEvent } from '@/lib/mixpanel'
import { NewProject } from '@/pages/new-project'

export const metadata: Metadata = {
  title: 'ProjectInBio - Criar',
  description: 'ProjectInBio - Criar'
}

export default function NewPage() {
  trackServerEvent('page_view', {
    page: 'new-project'
  })

  return <NewProject />
}
