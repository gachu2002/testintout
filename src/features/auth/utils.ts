import type { Session } from '@/features/auth/types';
import { baseURL } from '@/lib/api/axios';

export function hasSessionData(session: Session | null | undefined) {
  return Boolean(session && Object.keys(session).length > 0);
}

export function redirectToLogin() {
  const redirect = encodeURIComponent(window.location.href);
  window.location.replace(`${baseURL}/auth/login?redirect=${redirect}`);
}
