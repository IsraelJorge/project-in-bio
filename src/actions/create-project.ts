'use server'

import { Timestamp } from 'firebase-admin/firestore'

import { randomUUID } from 'node:crypto'

import { auth } from '@/lib/auth'
import { db, storage } from '@/lib/firebase'

type ProjectData = {
  profileId: string
  title: string
  url: string
  description: string
  image: File
}

export const createProject = async (formData: FormData) => {
  const session = await auth()

  if (!session?.user?.id) return

  const data = Object.fromEntries(formData.entries()) as ProjectData

  const generatedId = randomUUID()

  const storageRef = storage.file(
    `projects-images/${data.profileId}/${generatedId}`
  )

  const arrayBuffer = await data.image.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  await storageRef.save(buffer)

  const imagePath = storageRef.name

  try {
    await db
      .collection('profiles')
      .doc(data.profileId)
      .collection('projects')
      .doc(generatedId)
      .set({
        id: generatedId,
        userId: session.user.id,
        title: data.title,
        url: data.url,
        description: data.description,
        imagePath: imagePath,
        createdAt: Timestamp.now().toMillis()
      })

    return true
  } catch {
    return false
  }
}
