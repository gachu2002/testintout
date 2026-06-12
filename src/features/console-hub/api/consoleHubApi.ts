import type {
  ConsoleGuideLinksPanel,
  ConsoleHealthPanel,
  ConsoleHubFilters,
  ConsoleHubStats,
  ConsoleResource,
  ConsoleTipsPanel,
} from '@/features/console-hub/types';
import { apiClient } from '@/lib/api/axios';
import type { ApiDataResponse, PaginatedResponse } from '@/lib/api/types';

type CursorParams = {
  cursor: string;
  limit: number;
  q: string;
  sort: string;
};

export async function getConsoleHubConsoles({
  cursor,
  limit,
  q,
  sort,
}: CursorParams): Promise<PaginatedResponse<ConsoleResource>> {
  const response = await apiClient.get<PaginatedResponse<ConsoleResource>>('/v2/consoles', {
    params: { cursor, limit, q, sort },
  });

  return response.data;
}

export async function getConsoleHubStats(): Promise<ConsoleHubStats> {
  const response = await apiClient.get<ApiDataResponse<ConsoleHubStats>>('/v2/consoles/stats');
  return response.data.data;
}

export async function getConsoleHubFilters(): Promise<ConsoleHubFilters> {
  const response = await apiClient.get<ApiDataResponse<ConsoleHubFilters>>('/v2/consoles/filters');
  return response.data.data;
}

export async function getConsoleHubTipsPanel(): Promise<ConsoleTipsPanel> {
  const response = await apiClient.get<ApiDataResponse<ConsoleTipsPanel>>(
    '/v2/consoles/panels/tips',
  );

  return response.data.data;
}

export async function getConsoleHubGuideLinksPanel(): Promise<ConsoleGuideLinksPanel> {
  const response = await apiClient.get<ApiDataResponse<ConsoleGuideLinksPanel>>(
    '/v2/consoles/panels/guide-links',
  );

  return response.data.data;
}

export async function getConsoleHealthPanel(): Promise<ConsoleHealthPanel> {
  const response = await apiClient.get<ApiDataResponse<ConsoleHealthPanel>>(
    '/v2/consoles/panels/health',
  );

  return response.data.data;
}
