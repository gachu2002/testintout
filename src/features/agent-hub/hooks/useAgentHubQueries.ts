import { useQuery } from '@tanstack/react-query';

import {
  getAgentHubAgents,
  getAgentHubFilters,
  getAgentHubGuideLinksPanel,
  getAgentHubModelsPanel,
  getAgentHubStats,
  getAgentHubTipsPanel,
  getAgentRuntimeStatusPanel,
} from '@/features/agent-hub/api/agentHubApi';

export const agentHubQueryKeys = {
  agents: (limit: number, cursor: string, sort: string, q: string) =>
    [...agentHubQueryKeys.all, 'agents', limit, cursor, sort, q] as const,
  all: ['agent-hub'] as const,
  filters: () => [...agentHubQueryKeys.all, 'filters'] as const,
  guideLinks: () => [...agentHubQueryKeys.all, 'guide-links', 'agents'] as const,
  models: () => [...agentHubQueryKeys.all, 'models'] as const,
  runtimeStatus: () => [...agentHubQueryKeys.all, 'runtime-status'] as const,
  stats: () => [...agentHubQueryKeys.all, 'stats'] as const,
  tips: () => [...agentHubQueryKeys.all, 'tips', 'agents'] as const,
};

export function useAgentHubAgentsQuery(limit = 20, cursor = '', sort = '', q = '') {
  return useQuery({
    queryFn: () => getAgentHubAgents({ cursor, limit, q, sort }),
    queryKey: agentHubQueryKeys.agents(limit, cursor, sort, q),
  });
}

export function useAgentHubFiltersQuery() {
  return useQuery({
    queryFn: getAgentHubFilters,
    queryKey: agentHubQueryKeys.filters(),
  });
}

export function useAgentHubStatsQuery() {
  return useQuery({
    queryFn: getAgentHubStats,
    queryKey: agentHubQueryKeys.stats(),
  });
}

export function useAgentHubTipsQuery() {
  return useQuery({
    queryFn: getAgentHubTipsPanel,
    queryKey: agentHubQueryKeys.tips(),
  });
}

export function useAgentHubGuideLinksQuery() {
  return useQuery({
    queryFn: getAgentHubGuideLinksPanel,
    queryKey: agentHubQueryKeys.guideLinks(),
  });
}

export function useAgentHubModelsQuery() {
  return useQuery({
    queryFn: getAgentHubModelsPanel,
    queryKey: agentHubQueryKeys.models(),
  });
}

export function useAgentRuntimeStatusQuery() {
  return useQuery({
    queryFn: getAgentRuntimeStatusPanel,
    queryKey: agentHubQueryKeys.runtimeStatus(),
  });
}
