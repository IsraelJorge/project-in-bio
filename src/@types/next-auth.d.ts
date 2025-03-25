import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      createdAt: number
      isTrial: boolean
    } & DefaultSession['user']
  }

  interface User {
    createdAt: number
    isTrial: boolean
    isSubscribed?: boolean
  }
}
