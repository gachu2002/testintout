import { useQuery } from '@tanstack/react-query';

import {
  getCurrentUser,
  getHeaderNotifications,
  getServiceMenu,
} from '@/features/app-shell/api/appShellApi';

export const appShellQueryKeys = {
  all: ['app-shell'] as const,
  currentUser: () => [...appShellQueryKeys.all, 'current-user'] as const,
  notifications: (limit: number, cursor: string) =>
    [...appShellQueryKeys.all, 'notifications', limit, cursor] as const,
  serviceMenu: () => [...appShellQueryKeys.all, 'service-menu'] as const,
};

export function useCurrentUserQuery() {
  return useQuery({
    queryFn: getCurrentUser,
    queryKey: appShellQueryKeys.currentUser(),
  });
}

export function useServiceMenuQuery({ enabled = true }: { enabled?: boolean } = {}) {
  return useQuery({
    enabled,
    queryFn: getServiceMenu,
    queryKey: appShellQueryKeys.serviceMenu(),
  });
}

export function useHeaderNotificationsQuery({
  cursor = '',
  enabled = true,
  limit = 6,
}: {
  cursor?: string;
  enabled?: boolean;
  limit?: number;
} = {}) {
  return useQuery({
    enabled,
    queryFn: () => getHeaderNotifications({ cursor, limit }),
    queryKey: appShellQueryKeys.notifications(limit, cursor),
  });
}
