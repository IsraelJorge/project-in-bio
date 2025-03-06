'use client'

import { IconName } from 'lucide-react/dynamic'
import { useParams, useRouter } from 'next/navigation'
import { startTransition, useRef, useState } from 'react'

import { createSocialLinks } from '@/actions/create-social-links'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'

const initialFormData = {
  github: '',
  instagram: '',
  linkedin: '',
  twitter: ''
}

type EditSocialLinksFormDialogProps = {
  socialMediasLinks?: {
    github: string
    instagram: string
    linkedin: string
    twitter: string
  }
}

export function EditSocialLinksFormDialog({
  socialMediasLinks
}: EditSocialLinksFormDialogProps) {
  const params = useParams<{ profileId: string }>()
  const router = useRouter()

  const [formData, setFormData] = useState({
    ...initialFormData,
    ...socialMediasLinks
  })

  const [isLoading, setIsLoading] = useState(false)

  const buttonCloseRef = useRef<HTMLButtonElement>(null)

  const socialMedias: IconName[] = [
    'github',
    'instagram',
    'linkedin',
    'twitter'
  ]

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddSocialLinks = async () => {
    if (!params?.profileId) return
    setIsLoading(true)

    await createSocialLinks({
      profileId: params.profileId,
      ...formData
    })

    startTransition(() => {
      setIsLoading(false)
      buttonCloseRef.current?.click()
      router.refresh()
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="icon">
          <Icon name="plus" />
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby="modal-description"
        className="w-full max-w-[556px] gap-[42px]"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Adicionar redes sociais
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {socialMedias.map((socialMedia, index) => (
            <div
              className="flex w-full items-center gap-2"
              key={index + socialMedia}
            >
              <Icon name={socialMedia} />
              <Input
                name={socialMedia}
                autoFocus={index === 0}
                value={formData[socialMedia as keyof typeof formData]}
                placeholder={`Link ${socialMedia}`}
                onChange={handleFormChange}
              />
            </div>
          ))}
        </div>

        <DialogFooter>
          <DialogTrigger ref={buttonCloseRef} asChild>
            <Button variant="ghost">Voltar</Button>
          </DialogTrigger>

          <Button onClick={handleAddSocialLinks} disabled={isLoading}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
