import { useQueryClient } from '@tanstack/react-query';

import { authKeys, useAccountSetting, useSession } from '@/features/auth/hooks/useAuthQueries';
import { hasSessionData, redirectToLogin } from '@/features/auth/utils';
import { baseURL } from '@/lib/api/axios';

export function useAuth() {
  const queryClient = useQueryClient();
  const sessionQuery = useSession();
  const isAuthenticated = hasSessionData(sessionQuery.data);
  const accountSettingQuery = useAccountSetting(isAuthenticated);

  const signOut = () => {
    queryClient.removeQueries({ queryKey: authKeys.all });
    window.location.href = `${baseURL}/auth/logout`;
  };

  const hasRole = (role: string) => sessionQuery.data?.roles?.includes(role) ?? false;

  return {
    accountSetting: accountSettingQuery.data,
    hasRole,
    isAuthenticated,
    isLoading: sessionQuery.isLoading || accountSettingQuery.isLoading,
    redirectToLogin,
    session: sessionQuery.data ?? null,
    signOut,
  };
}
