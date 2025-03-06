'use client'

import { useParams, useRouter } from 'next/navigation'
import { startTransition, useRef, useState } from 'react'

import { createCustomLinks, Link } from '@/actions/create-custom-links'
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
import { Label } from '@/components/ui/label'

const initialFormData = [
  {
    title: '',
    url: ''
  },
  {
    title: '',
    url: ''
  },
  {
    title: '',
    url: ''
  }
]

type AddCustomLinkFormDialogProps = {
  customLinks?: Link[]
}

export function AddCustomLinkFormDialog({
  customLinks
}: AddCustomLinkFormDialogProps) {
  const params = useParams<{ profileId: string }>()
  const router = useRouter()

  const [formData, setFormData] = useState(
    customLinks?.length
      ? customLinks.map(link => ({
          title: link.title,
          url: link.url
        }))
      : initialFormData
  )
  const [isLoading, setIsLoading] = useState(false)

  const buttonCloseRef = useRef<HTMLButtonElement>(null)

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setFormData(prev =>
      prev.map((data, index) => {
        const [field] = name.split('-')
        if (name.includes(String(index))) {
          return {
            ...data,
            [field]: value
          }
        }
        return data
      })
    )
  }

  const handleAddNewCustomLink = async () => {
    if (!params?.profileId) return
    setIsLoading(true)

    await createCustomLinks({
      profileId: params.profileId,
      links: formData
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
        className="w-full max-w-[668px] gap-[42px]"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Adicionar link personalizado
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          {formData.map((data, index) => (
            <div className="flex items-end gap-3" key={index}>
              <div className="flex-1 space-y-[6px]">
                <Label htmlFor="titleLink">Título do link</Label>
                <Input
                  autoFocus={index === 0}
                  value={data.title}
                  placeholder="Digite ao título "
                  id="titleLink"
                  name={`title-${index}`}
                  onChange={handleFormChange}
                />
              </div>

              <div className="flex-2 space-y-[6px]">
                <Label htmlFor="url">URL</Label>
                <Input
                  value={data.url}
                  placeholder="Inserir URL"
                  id="url"
                  name={`url-${index}`}
                  onChange={handleFormChange}
                />
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <DialogTrigger ref={buttonCloseRef} asChild>
            <Button variant="ghost">Voltar</Button>
          </DialogTrigger>

          <Button onClick={handleAddNewCustomLink} disabled={isLoading}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
