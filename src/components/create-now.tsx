'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'

import { Route } from '@/utils/routes'

import { Button } from './ui/button'
import { Input } from './ui/input'

export function CreateNow() {
  const [link, setLink] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value)
  }

  const handleLogin = () => {
    signIn('google', {
      redirectTo: `${Route.newProject}?link=${link}`
    })
  }

  return (
    <div className="mt-[10vh] flex w-full items-center gap-2">
      <span className="text-xl text-white">projectinbio.com/</span>
      <Input placeholder="Seu link" value={link} onChange={handleChange} />
      <Button onClick={handleLogin}>Criar agora</Button>
    </div>
  )
}
