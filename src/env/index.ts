import { z } from 'zod'

const EnvSchema = z.object({
  FIREBASE_PROJECT_ID: z.string(),
  FIREBASE_CLIENT_EMAIL: z.string(),
  FIREBASE_PRIVATE_KEY_BASE64: z.string(),
  FIREBASE_STORAGE_BUCKET: z.string(),
  AUTH_SECRET: z.string(),
  AUTH_GOOGLE_ID: z.string(),
  AUTH_GOOGLE_SECRET: z.string()
})

export const ENV = EnvSchema.parse(process.env)
