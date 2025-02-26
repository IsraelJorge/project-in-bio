import { Hero } from '@/components/hero'
import { FAQ } from '@/components/landing-page/faq'
import { Header } from '@/components/landing-page/header'
import { Pricing } from '@/components/landing-page/pricing'
import { VideoExplanation } from '@/components/landing-page/video-explanation'

export function Home() {
  return (
    <div className="mx-auto max-w-7xl">
      <Header />
      <Hero />

      <VideoExplanation />
      <Pricing />
      <FAQ />
    </div>
  )
}
