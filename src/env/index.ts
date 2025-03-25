import { z } from 'zod'

const ServerEnvSchema = z.object({
  FIREBASE_PROJECT_ID: z.string(),
  FIREBASE_CLIENT_EMAIL: z.string(),
  FIREBASE_PRIVATE_KEY_BASE64: z.string(),
  FIREBASE_STORAGE_BUCKET: z.string(),
  AUTH_SECRET: z.string(),
  AUTH_GOOGLE_ID: z.string(),
  AUTH_GOOGLE_SECRET: z.string(),
  STRIPE_PRICE_ID: z.string(),
  STRIPE_SUBSCRIPTION_ID: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
  NEXT_PUBLIC_STRIPE_PUBLIC_KEY: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  GA_ID: z.string(),
  MIXPANEL_TOKEN: z.string()
})

type EnvType = z.infer<typeof ServerEnvSchema>

const ClientEnvSchema = z.object({
  NEXT_PUBLIC_STRIPE_PUBLIC_KEY: z
    .string()
    .default(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)
})

const isServer = typeof window === 'undefined'

export const ENV = (
  isServer
    ? ServerEnvSchema.parse(process.env)
    : ClientEnvSchema.parse(process.env)
) as EnvType
