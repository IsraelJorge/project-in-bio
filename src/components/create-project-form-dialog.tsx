'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { startTransition, useRef, useState } from 'react'

import { createProject } from '@/actions/create-project'
import { compressImage } from '@/utils/compress-files'

import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import { Icon } from './ui/icon'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

type CreateProjectFormDialogProps = {
  profileId: string
}

const initialFormData = {
  title: '',
  url: '',
  description: '',
  image: ''
}

export function CreateProjectFormDialog({
  profileId
}: CreateProjectFormDialogProps) {
  const router = useRouter()

  const [formData, setFormData] = useState(initialFormData)
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
      setFormData(prev => ({ ...prev, image: fileUrl }))
    }
  }

  const handleCreateProject = async () => {
    setIsLoading(true)

    const file = inputRef.current?.files?.[0] ?? null
    if (!file) return

    const fileCompressed = await compressImage(file)

    if (!fileCompressed) {
      setIsLoading(false)
      return
    }

    const form = new FormData()

    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value)
    })
    form.append('image', fileCompressed)
    form.append('profileId', profileId)

    await createProject(form)

    startTransition(() => {
      setIsLoading(false)
      setFormData(initialFormData)
      buttonCloseRef.current?.click()
      router.refresh()
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex h-[132px] w-[340px] items-center justify-center gap-2 rounded-[20px] border-border-secondary bg-background-secondary hover:border hover:border-dashed">
          <Icon name="plus" className="size-10 text-accent-green" />
          <span>Novo projeto</span>
        </button>
      </DialogTrigger>
      <DialogContent
        aria-describedby="modal-description"
        className="w-full max-w-[556px] gap-[42px]"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Adicionar projetos
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-[42px]">
          <div className="flex flex-col items-center gap-3 text-xs">
            <div className="h-[100px] w-[100px] overflow-hidden rounded-xl bg-background-tertiary">
              {formData.image ? (
                <Image
                  width={100}
                  height={100}
                  src={formData.image}
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
              <span>Adicionar imagem</span>
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
          <div className="space-y-[12px]">
            <div className="space-y-[6px]">
              <Label htmlFor="titleLink">Título do link</Label>
              <Input
                placeholder="Digite o nome do conteúdo"
                id="titleLink"
                name="title"
                onChange={handleFormChange}
              />
            </div>

            <div className="space-y-[6px]">
              <Label htmlFor="link">Link</Label>
              <Input
                placeholder="Cole a URL do conteúdo"
                id="link"
                name="url"
                onChange={handleFormChange}
              />
            </div>

            <div className="space-y-[6px]">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                rows={4}
                placeholder="Dê uma breve descrição do seu projeto"
                id="description"
                name="description"
                onChange={handleFormChange}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogTrigger ref={buttonCloseRef} asChild>
            <Button variant="ghost">Voltar</Button>
          </DialogTrigger>

          <Button onClick={handleCreateProject} disabled={isLoading}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
