import Mixpanel from 'mixpanel'

import { ENV } from '@/env'

const mixpanelEvent = Mixpanel.init(ENV.MIXPANEL_TOKEN)

export function trackServerEvent(
  eventName: string,
  properties: Record<string, unknown>
) {
  if (process.env.NODE_ENV === 'development') return
  mixpanelEvent.track(eventName, properties)
}
