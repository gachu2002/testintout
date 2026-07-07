import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createDatabase,
  getDatabaseBindings,
  getDatabaseDetail,
  getDatabaseHealthPanel,
  getDatabaseHubDatabases,
  getDatabaseHubFilters,
  getDatabaseHubGuideLinksPanel,
  getDatabaseHubStats,
  getDatabaseHubTipsPanel,
  restartDatabase,
} from '@/features/database-hub/api/databaseHubApi';
import type { CreateDatabaseRequest } from '@/features/database-hub/types';

export const databaseHubQueryKeys = {
  all: ['database-hub'] as const,
  bindings: (databaseId: string) =>
    [...databaseHubQueryKeys.all, 'database-bindings', databaseId] as const,
  databases: (limit: number, cursor: string, sort: string, q: string) =>
    [...databaseHubQueryKeys.all, 'databases', limit, cursor, sort, q] as const,
  detail: (databaseId: string) =>
    [...databaseHubQueryKeys.all, 'database-detail', databaseId] as const,
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

export function useDatabaseBindingsQuery(databaseId: string) {
  return useQuery({
    enabled: Boolean(databaseId),
    queryFn: () => getDatabaseBindings(databaseId),
    queryKey: databaseHubQueryKeys.bindings(databaseId),
    retry: false,
  });
}

export function useDatabaseBindingsQueries(databaseIds: string[]) {
  return useQueries({
    queries: databaseIds.map((databaseId) => ({
      enabled: Boolean(databaseId),
      queryFn: () => getDatabaseBindings(databaseId),
      queryKey: databaseHubQueryKeys.bindings(databaseId),
      retry: false,
    })),
  });
}

export function useDatabaseDetailQuery(databaseId: string | null) {
  return useQuery({
    enabled: Boolean(databaseId),
    queryFn: () => getDatabaseDetail(databaseId ?? ''),
    queryKey: databaseHubQueryKeys.detail(databaseId ?? ''),
    retry: false,
  });
}

export function useCreateDatabaseMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateDatabaseRequest) => createDatabase(request),
    onSuccess: async () => {
      await invalidateDatabaseHubQueries(queryClient);
    },
  });
}

export function useRestartDatabaseMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restartDatabase,
    onSuccess: async (_job, databaseId) => {
      try {
        await queryClient.fetchQuery({
          queryFn: () => getDatabaseDetail(databaseId),
          queryKey: databaseHubQueryKeys.detail(databaseId),
          retry: false,
        });
      } catch {
        // The reference keeps the queued restart state and refreshes the fleet when polling is unavailable.
      }
      await invalidateDatabaseHubQueries(queryClient);
    },
  });
}

async function invalidateDatabaseHubQueries(queryClient: ReturnType<typeof useQueryClient>) {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: [...databaseHubQueryKeys.all, 'databases'] }),
    queryClient.invalidateQueries({ queryKey: databaseHubQueryKeys.filters() }),
    queryClient.invalidateQueries({ queryKey: databaseHubQueryKeys.healthPanel() }),
    queryClient.invalidateQueries({ queryKey: databaseHubQueryKeys.stats() }),
  ]);
}
