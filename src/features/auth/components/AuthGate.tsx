import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';

import { useAuthBootstrap } from '@/features/auth/hooks/useAuthBootstrap';

export function AuthGate({ children }: PropsWithChildren) {
  const { accountSetting, isAuthenticated, loading } = useAuthBootstrap();

  useEffect(() => {
    if (accountSetting?.language) {
      document.documentElement.lang = accountSetting.language;
    }
  }, [accountSetting?.language]);

  if (loading || !isAuthenticated) {
    return null;
  }

  return children;
}
