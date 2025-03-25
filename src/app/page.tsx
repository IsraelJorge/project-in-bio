import { trackServerEvent } from '@/lib/mixpanel'
import { Home } from '@/pages/home'

export default function HomePage() {
  trackServerEvent('page_view', {
    page: 'home'
  })

  return <Home />
}
