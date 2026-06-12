import { useQuery } from '@tanstack/react-query';

import {
  getDatabaseHealthPanel,
  getDatabaseHubDatabases,
  getDatabaseHubFilters,
  getDatabaseHubGuideLinksPanel,
  getDatabaseHubStats,
  getDatabaseHubTipsPanel,
} from '@/features/database-hub/api/databaseHubApi';

export const databaseHubQueryKeys = {
  all: ['database-hub'] as const,
  databases: (limit: number, cursor: string, sort: string, q: string) =>
    [...databaseHubQueryKeys.all, 'databases', limit, cursor, sort, q] as const,
  filters: () => [...databaseHubQueryKeys.all, 'filters'] as const,
  guideLinks: () => [...databaseHubQueryKeys.all, 'guide-links', 'databases'] as const,
  healthPanel: () => [...databaseHubQueryKeys.all, 'health-panel'] as const,
  stats: () => [...databaseHubQueryKeys.all, 'stats'] as const,
  tips: () => [...databaseHubQueryKeys.all, 'tips', 'databases'] as const,
};

export function useDatabaseHubDatabasesQuery(limit = 12, cursor = '', sort = '', q = '') {
  return useQuery({
    queryFn: () => getDatabaseHubDatabases({ cursor, limit, q, sort }),
    queryKey: databaseHubQueryKeys.databases(limit, cursor, sort, q),
  });
}

export function useDatabaseHubFiltersQuery() {
  return useQuery({
    queryFn: getDatabaseHubFilters,
    queryKey: databaseHubQueryKeys.filters(),
  });
}

export function useDatabaseHubStatsQuery() {
  return useQuery({
    queryFn: getDatabaseHubStats,
    queryKey: databaseHubQueryKeys.stats(),
  });
}

export function useDatabaseHubTipsQuery() {
  return useQuery({
    queryFn: getDatabaseHubTipsPanel,
    queryKey: databaseHubQueryKeys.tips(),
  });
}

export function useDatabaseHubGuideLinksQuery() {
  return useQuery({
    queryFn: getDatabaseHubGuideLinksPanel,
    queryKey: databaseHubQueryKeys.guideLinks(),
  });
}

export function useDatabaseHealthPanelQuery() {
  return useQuery({
    queryFn: getDatabaseHealthPanel,
    queryKey: databaseHubQueryKeys.healthPanel(),
  });
}
