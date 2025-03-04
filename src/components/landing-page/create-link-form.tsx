'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { createLink } from '@/actions/create-link'
import { verifyLink } from '@/actions/verify-link'
import { sanitizeLink } from '@/utils/sanitize-link'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

export function CreateLinkForm() {
  const [link, setLink] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const handleChangeLink = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = sanitizeLink(event.target.value)
    setLink(value)
    setError('')
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!link) return setError('Link é obrigatório :(')

    const hasLink = await verifyLink(link)

    if (hasLink) return setError('Link já está em uso :(')

    const isLinkCreated = await createLink(link)

    if (!isLinkCreated) return setError('Erro ao criar link :(')

    router.push(`/${link}`)
  }

  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex w-full items-center gap-2"
      >
        <span>projectinbio.com/</span>
        <Input name="link" value={link} onChange={handleChangeLink} />
        <Button type="submit" className="w-[126px]">
          Criar
        </Button>
      </form>
      {error && (
        <div>
          <span className="text-accent-pink">{error}</span>
        </div>
      )}
    </>
  )
}
