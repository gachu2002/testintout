import type {
  AgentGuideLinksPanel,
  AgentHubFilters,
  AgentHubStats,
  AgentModelPanel,
  AgentResource,
  AgentRuntimeStatusPanel,
  AgentTipsPanel,
} from '@/features/agent-hub/types';
import { apiClient } from '@/lib/api/axios';
import type { ApiDataResponse, CursorParams, PaginatedResponse } from '@/lib/api/types';
import { unwrapApiData } from '@/lib/api/types';

export async function getAgentHubAgents({
  cursor,
  limit,
  q,
  sort,
}: CursorParams): Promise<PaginatedResponse<AgentResource>> {
  const response = await apiClient.get<PaginatedResponse<AgentResource>>('/v2/agents', {
    params: { cursor, limit, q, sort },
  });

  return response.data;
}

export async function getAgentHubStats(): Promise<AgentHubStats> {
  const response = await apiClient.get<ApiDataResponse<AgentHubStats>>('/v2/agents/stats');
  return unwrapApiData(response);
}

export async function getAgentHubFilters(): Promise<AgentHubFilters> {
  const response = await apiClient.get<ApiDataResponse<AgentHubFilters>>('/v2/agents/filters');
  return unwrapApiData(response);
}

export async function getAgentHubTipsPanel(): Promise<AgentTipsPanel> {
  const response = await apiClient.get<ApiDataResponse<AgentTipsPanel>>('/v2/panels/tips', {
    params: { surface: 'agents' },
  });

  return unwrapApiData(response);
}

export async function getAgentHubGuideLinksPanel(): Promise<AgentGuideLinksPanel> {
  const response = await apiClient.get<ApiDataResponse<AgentGuideLinksPanel>>(
    '/v2/panels/guide-links',
    {
      params: { surface: 'agents' },
    },
  );

  return unwrapApiData(response);
}

export async function getAgentHubModelsPanel(): Promise<AgentModelPanel> {
  const response = await apiClient.get<ApiDataResponse<AgentModelPanel>>(
    '/v2/agents/panels/models',
  );

  return unwrapApiData(response);
}

export async function getAgentRuntimeStatusPanel(): Promise<AgentRuntimeStatusPanel> {
  const response = await apiClient.get<ApiDataResponse<AgentRuntimeStatusPanel>>(
    '/v2/agents/panels/runtime-status',
  );

  return unwrapApiData(response);
}
