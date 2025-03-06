'use server'

import { Timestamp } from 'firebase-admin/firestore'

import { randomUUID } from 'node:crypto'

import { auth } from '@/lib/auth'
import { db, storage } from '@/lib/firebase'

type ProfileFormData = {
  profileId: string
  name: string
  description: string
  image: File
}

export const saveProfile = async (formData: FormData) => {
  const session = await auth()

  if (!session?.user?.id) return

  const data = Object.fromEntries(formData.entries()) as ProfileFormData

  try {
    const hasFile = Boolean(data.image) && data.image instanceof File

    let imagePath = null

    if (hasFile) {
      const currentProfile = await db
        .collection('profiles')
        .doc(data.profileId)
        .get()

      const currentImagePath = currentProfile.data()?.imagePath

      if (currentImagePath) {
        const currentStorageRef = storage.file(currentImagePath)
        const [exists] = await currentStorageRef.exists()

        if (exists) {
          await currentStorageRef.delete()
        }
      }

      const storageRef = storage.file(
        `profiles-images/${data.profileId}/${randomUUID()}`
      )

      const arrayBuffer = await data.image.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      await storageRef.save(buffer)

      imagePath = storageRef.name
    }

    await db
      .collection('profiles')
      .doc(data.profileId)
      .update({
        name: data.name,
        description: data.description,
        ...(hasFile && { imagePath }),
        updatedAt: Timestamp.now().toMillis()
      })

    return true
  } catch {
    return false
  }
}
