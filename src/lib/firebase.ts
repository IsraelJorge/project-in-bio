import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'

import { ENV } from '@/env'
import 'server-only'

const decodedKey = Buffer.from(ENV.FIREBASE_PRIVATE_KEY_BASE64, 'base64')
  .toString('utf-8')
  .replace(/\\n/g, '\n')

export const firebaseCert = cert({
  projectId: ENV.FIREBASE_PROJECT_ID,
  clientEmail: ENV.FIREBASE_CLIENT_EMAIL,
  privateKey: decodedKey
})

if (!getApps().length) {
  initializeApp({
    credential: firebaseCert,
    storageBucket: ENV.FIREBASE_STORAGE_BUCKET
  })
}

export const db = getFirestore()

export const storage = getStorage().bucket()

export const getDownloadUrlFromPath = async (path?: string) => {
  if (!path) return ''

  const file = storage.file(path)

  const [url] = await file.getSignedUrl({
    action: 'read',
    expires: '03-01-2500'
  })

  return url
}
