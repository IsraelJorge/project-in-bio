import { FirestoreAdapter } from '@auth/firebase-adapter'
import { Timestamp } from 'firebase-admin/firestore'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

import { TRIAL_DURATION } from '@/utils/config'

import { db, firebaseCert } from './firebase'

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: FirestoreAdapter({
    credential: firebaseCert
  }),
  providers: [Google],
  events: {
    createUser: async ({ user }) => {
      if (!user?.id) return

      await db.collection('users').doc(user.id).update({
        createdAt: Timestamp.now().toMillis()
      })
    }
  },
  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          isTrial: user.createdAt >= Date.now() - TRIAL_DURATION
        }
      }
    }
  }
})
