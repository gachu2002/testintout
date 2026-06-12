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
import type { ApiDataResponse, PaginatedResponse } from '@/lib/api/types';

type CursorParams = {
  cursor: string;
  limit: number;
  q: string;
  sort: string;
};

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
  return response.data.data;
}

export async function getAgentHubFilters(): Promise<AgentHubFilters> {
  const response = await apiClient.get<ApiDataResponse<AgentHubFilters>>('/v2/agents/filters');
  return response.data.data;
}

export async function getAgentHubTipsPanel(): Promise<AgentTipsPanel> {
  const response = await apiClient.get<ApiDataResponse<AgentTipsPanel>>('/v2/panels/tips', {
    params: { surface: 'agents' },
  });

  return response.data.data;
}

export async function getAgentHubGuideLinksPanel(): Promise<AgentGuideLinksPanel> {
  const response = await apiClient.get<ApiDataResponse<AgentGuideLinksPanel>>(
    '/v2/panels/guide-links',
    {
      params: { surface: 'agents' },
    },
  );

  return response.data.data;
}

export async function getAgentHubModelsPanel(): Promise<AgentModelPanel> {
  const response = await apiClient.get<ApiDataResponse<AgentModelPanel>>(
    '/v2/agents/panels/models',
  );

  return response.data.data;
}

export async function getAgentRuntimeStatusPanel(): Promise<AgentRuntimeStatusPanel> {
  const response = await apiClient.get<ApiDataResponse<AgentRuntimeStatusPanel>>(
    '/v2/agents/panels/runtime-status',
  );

  return response.data.data;
}
