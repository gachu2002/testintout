import { useQuery } from '@tanstack/react-query';

import {
  getConsoleHealthPanel,
  getConsoleHubConsoles,
  getConsoleHubFilters,
  getConsoleHubGuideLinksPanel,
  getConsoleHubStats,
  getConsoleHubTipsPanel,
} from '@/features/console-hub/api/consoleHubApi';

export const consoleHubQueryKeys = {
  all: ['console-hub'] as const,
  consoles: (limit: number, cursor: string, sort: string, q: string) =>
    [...consoleHubQueryKeys.all, 'consoles', limit, cursor, sort, q] as const,
  filters: () => [...consoleHubQueryKeys.all, 'filters'] as const,
  guideLinks: () => [...consoleHubQueryKeys.all, 'guide-links'] as const,
  healthPanel: () => [...consoleHubQueryKeys.all, 'health-panel'] as const,
  stats: () => [...consoleHubQueryKeys.all, 'stats'] as const,
  tips: () => [...consoleHubQueryKeys.all, 'tips'] as const,
};

export function useConsoleHubConsolesQuery(limit = 12, cursor = '', sort = '', q = '') {
  return useQuery({
    queryFn: () => getConsoleHubConsoles({ cursor, limit, q, sort }),
    queryKey: consoleHubQueryKeys.consoles(limit, cursor, sort, q),
  });
}

export function useConsoleHubFiltersQuery() {
  return useQuery({
    queryFn: getConsoleHubFilters,
    queryKey: consoleHubQueryKeys.filters(),
  });
}

export function useConsoleHubStatsQuery() {
  return useQuery({
    queryFn: getConsoleHubStats,
    queryKey: consoleHubQueryKeys.stats(),
  });
}

export function useConsoleHubTipsQuery() {
  return useQuery({
    queryFn: getConsoleHubTipsPanel,
    queryKey: consoleHubQueryKeys.tips(),
  });
}

export function useConsoleHubGuideLinksQuery() {
  return useQuery({
    queryFn: getConsoleHubGuideLinksPanel,
    queryKey: consoleHubQueryKeys.guideLinks(),
  });
}

export function useConsoleHealthPanelQuery() {
  return useQuery({
    queryFn: getConsoleHealthPanel,
    queryKey: consoleHubQueryKeys.healthPanel(),
  });
}
