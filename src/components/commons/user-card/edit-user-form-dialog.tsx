'use client'

import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { startTransition, useRef, useState } from 'react'

import { saveProfile } from '@/actions/save-profile'
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
import { Textarea } from '@/components/ui/textarea'
import { compressImage } from '@/utils/compress-files'

type EditUserFormDialogProps = {
  name?: string
  description?: string
  imagePath?: string
}

export function EditUserFormDialog({
  name,
  description,
  imagePath
}: EditUserFormDialogProps) {
  const router = useRouter()
  const params = useParams<{ profileId: string }>()

  const [formData, setFormData] = useState({
    name: name ?? '',
    description: description ?? '',
    imagePath: imagePath ?? ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const buttonCloseRef = useRef<HTMLButtonElement>(null)

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const triggerInput = () => {
    inputRef.current?.click()
  }

  const handleImageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const fileUrl = URL.createObjectURL(file)
      setFormData(prev => ({ ...prev, imagePath: fileUrl }))
    }
  }

  const handleSaveProfile = async () => {
    if (!params?.profileId) return
    setIsLoading(true)

    const file = inputRef.current?.files?.[0] ?? null

    const form = new FormData()

    if (file) {
      const fileCompressed = await compressImage(file)
      form.append('image', fileCompressed ?? '')
    }

    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value)
    })

    form.append('profileId', params.profileId)

    await saveProfile(form)

    startTransition(() => {
      setIsLoading(false)
      buttonCloseRef.current?.click()
      router.refresh()
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Icon className="cursor-pointer" name="user-pen" />
      </DialogTrigger>
      <DialogContent
        aria-describedby="modal-description"
        className="w-full max-w-[556px] gap-[42px]"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Editar perfil
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-[42px]">
          <div className="flex flex-col items-center gap-3 text-xs">
            <div className="h-[100px] w-[100px] overflow-hidden rounded-xl bg-background-tertiary">
              {formData.imagePath ? (
                <Image
                  width={100}
                  height={100}
                  src={formData.imagePath}
                  className="h-full w-full object-cover object-center"
                  alt="Imagem do projeto"
                />
              ) : (
                <button onClick={triggerInput} className="h-full w-full">
                  100x100
                </button>
              )}
            </div>
            <button
              className="flex items-center gap-2 font-semibold text-white"
              onClick={triggerInput}
            >
              <Icon name="arrow-up-from-line" className="size-4" />
              <span>Adicionar foto</span>
            </button>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              className="hidden"
              onChange={handleImageInput}
              ref={inputRef}
            />
          </div>
          <div className="flex-1 space-y-[12px]">
            <div className="space-y-[6px]">
              <Label htmlFor="your-name">Seu nome</Label>
              <Input
                autoFocus
                placeholder="Digite seu nome"
                id="your-name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
              />
            </div>

            <div className="space-y-[6px]">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                rows={4}
                placeholder="Fale um pouco sobre você"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogTrigger ref={buttonCloseRef} asChild>
            <Button variant="ghost">Voltar</Button>
          </DialogTrigger>

          <Button onClick={handleSaveProfile} disabled={isLoading}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
