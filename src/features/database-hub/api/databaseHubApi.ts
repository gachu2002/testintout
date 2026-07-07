import type {
  DatabaseGuideLinksPanel,
  DatabaseHealthPanel,
  DatabaseHubFilters,
  DatabaseHubStats,
  DatabaseResource,
  DatabaseTipsPanel,
} from '@/features/database-hub/types';
import { apiClient } from '@/lib/api/axios';
import type { ApiDataResponse, CursorParams, PaginatedResponse } from '@/lib/api/types';
import { unwrapApiData } from '@/lib/api/types';

export async function getDatabaseHubDatabases({
  cursor,
  limit,
  q,
  sort,
}: CursorParams): Promise<PaginatedResponse<DatabaseResource>> {
  const response = await apiClient.get<PaginatedResponse<DatabaseResource>>('/v2/databases', {
    params: { cursor, limit, q, sort },
  });

  return response.data;
}

export async function getDatabaseHubStats(): Promise<DatabaseHubStats> {
  const response = await apiClient.get<ApiDataResponse<DatabaseHubStats>>('/v2/databases/stats');
  return unwrapApiData(response);
}

export async function getDatabaseHubFilters(): Promise<DatabaseHubFilters> {
  const response =
    await apiClient.get<ApiDataResponse<DatabaseHubFilters>>('/v2/databases/filters');
  return unwrapApiData(response);
}

export async function getDatabaseHubTipsPanel(): Promise<DatabaseTipsPanel> {
  const response = await apiClient.get<ApiDataResponse<DatabaseTipsPanel>>('/v2/panels/tips', {
    params: { surface: 'databases' },
  });

  return unwrapApiData(response);
}

export async function getDatabaseHubGuideLinksPanel(): Promise<DatabaseGuideLinksPanel> {
  const response = await apiClient.get<ApiDataResponse<DatabaseGuideLinksPanel>>(
    '/v2/panels/guide-links',
    {
      params: { surface: 'databases' },
    },
  );

  return unwrapApiData(response);
}

export async function getDatabaseHealthPanel(): Promise<DatabaseHealthPanel> {
  const response = await apiClient.get<ApiDataResponse<DatabaseHealthPanel>>(
    '/v2/databases/panels/health',
  );

  return unwrapApiData(response);
}
