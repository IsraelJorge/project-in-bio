import { Metadata } from 'next'

import { trackServerEvent } from '@/lib/mixpanel'
import { getSEOTags } from '@/lib/seo'
import { Home } from '@/pages/home'

export const metadata: Metadata = getSEOTags({
  appName: 'ProjectInBio',
  appDescription:
    'ProjectInBio - Seus projetos e redes sociais em um único link',
  keywords: ['ProjectInBio', 'projetos', 'redes sociais', 'link'],
  appDomain: 'https://micro-saas-course-projectinbio-bice.vercel.app/',
  canonicalUrlRelative: '/'
})

export default function HomePage() {
  trackServerEvent('page_view', {
    page: 'home'
  })

  return <Home />
}
