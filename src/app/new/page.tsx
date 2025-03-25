import { trackServerEvent } from '@/lib/mixpanel'
import { NewProject } from '@/pages/new-project'

export default function NewPage() {
  trackServerEvent('page_view', {
    page: 'new-project'
  })

  return <NewProject />
}
