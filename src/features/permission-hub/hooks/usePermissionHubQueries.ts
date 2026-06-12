import { useQuery } from '@tanstack/react-query';

import {
  getPermissionHubFilters,
  getPermissionHubGuideLinksPanel,
  getPermissionHubStats,
  getPermissionHubTipsPanel,
  getPermissionRealms,
} from '@/features/permission-hub/api/permissionHubApi';

export const permissionHubQueryKeys = {
  all: ['permission-hub'] as const,
  filters: () => [...permissionHubQueryKeys.all, 'filters'] as const,
  guideLinks: () => [...permissionHubQueryKeys.all, 'guide-links', 'permissions'] as const,
  realms: (limit: number, cursor: string, q: string, sort: string) =>
    [...permissionHubQueryKeys.all, 'realms', limit, cursor, q, sort] as const,
  stats: () => [...permissionHubQueryKeys.all, 'stats'] as const,
  tips: () => [...permissionHubQueryKeys.all, 'tips', 'permissions'] as const,
};

export function usePermissionRealmsQuery(limit = 6, cursor = '', q = '', sort = '') {
  return useQuery({
    queryFn: () => getPermissionRealms({ cursor, limit, q, sort }),
    queryKey: permissionHubQueryKeys.realms(limit, cursor, q, sort),
  });
}

export function usePermissionHubStatsQuery() {
  return useQuery({
    queryFn: getPermissionHubStats,
    queryKey: permissionHubQueryKeys.stats(),
  });
}

export function usePermissionHubFiltersQuery() {
  return useQuery({
    queryFn: getPermissionHubFilters,
    queryKey: permissionHubQueryKeys.filters(),
  });
}

export function usePermissionHubTipsQuery() {
  return useQuery({
    queryFn: getPermissionHubTipsPanel,
    queryKey: permissionHubQueryKeys.tips(),
  });
}

export function usePermissionHubGuideLinksQuery() {
  return useQuery({
    queryFn: getPermissionHubGuideLinksPanel,
    queryKey: permissionHubQueryKeys.guideLinks(),
  });
}
