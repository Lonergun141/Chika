import { auth } from '@/lib/auth.server'

export async function getServerSession() {
  return await auth()
}

export async function requireAuth() {
  const session = await auth()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }
  return session
}

export async function requireAdmin() {
  const session = await requireAuth()
  if (session.user.role !== 'ADMIN') {
    throw new Error('Admin access required')
  }
  return session
}