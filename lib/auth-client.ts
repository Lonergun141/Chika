// lib/auth-client.ts
'use client';

import { useSession as useNextAuthSession, signOut as nextAuthSignOut } from 'next-auth/react';
export const useSession = useNextAuthSession;

export async function clientSignOut() {
  await nextAuthSignOut({ callbackUrl: '/' });
}