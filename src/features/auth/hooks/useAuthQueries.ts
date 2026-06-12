import { useQuery } from '@tanstack/react-query';

import { getAccountSetting, getSession } from '@/features/auth/api/authApi';

export const authKeys = {
  accountSetting: () => [...authKeys.all, 'account-setting'] as const,
  all: ['auth'] as const,
  session: () => [...authKeys.all, 'session'] as const,
};

export function useSession() {
  return useQuery({
    queryFn: getSession,
    queryKey: authKeys.session(),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useAccountSetting(enabled: boolean) {
  return useQuery({
    enabled,
    queryFn: getAccountSetting,
    queryKey: authKeys.accountSetting(),
    retry: false,
    select: (setting) => ({
      ...setting,
      language: normalizeLocale(setting.language || window.navigator.language),
    }),
    staleTime: 5 * 60 * 1000,
  });
}

function normalizeLocale(locale: string) {
  const normalizedLocale = locale.trim().replace('_', '-');

  if (!normalizedLocale) {
    return 'en-US';
  }

  const [language, region] = normalizedLocale.split('-');

  if (!language) {
    return 'en-US';
  }

  return region ? `${language.toLowerCase()}-${region.toUpperCase()}` : language.toLowerCase();
}
