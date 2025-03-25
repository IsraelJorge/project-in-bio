import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { Red_Hat_Display } from 'next/font/google'

import '@/styles/globals.css'
import { ENV } from '@/env'

const redHatDisplay = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-red-hat-display'
})

export const metadata: Metadata = {
  title: 'Project in Bio',
  description:
    'Crie uma página de links personalizada para compartilhar suas redes sociais, portfólio e muito mais.',
  icons: '/favicon.ico'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${redHatDisplay.variable} h-screen bg-background-primary text-content-body antialiased`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId={ENV.GA_ID} />
    </html>
  )
}
