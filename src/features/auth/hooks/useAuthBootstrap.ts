import { useEffect } from 'react';

import { useAccountSetting, useSession } from '@/features/auth/hooks/useAuthQueries';
import { hasSessionData, redirectToLogin } from '@/features/auth/utils';

export function useAuthBootstrap() {
  const sessionQuery = useSession();
  const hasSession = hasSessionData(sessionQuery.data);
  const accountSettingQuery = useAccountSetting(hasSession);

  useEffect(() => {
    if (sessionQuery.isError) {
      redirectToLogin();
      return;
    }

    if (sessionQuery.isSuccess && !hasSession) {
      redirectToLogin();
    }
  }, [hasSession, sessionQuery.isError, sessionQuery.isSuccess]);

  return {
    accountSetting: accountSettingQuery.data,
    isAuthenticated: hasSession,
    loading: sessionQuery.isPending || (hasSession && accountSettingQuery.isPending),
    session: sessionQuery.data ?? null,
  };
}
