import type {
  PermissionGuideLinksPanel,
  PermissionHubFilters,
  PermissionHubStats,
  PermissionRealm,
  PermissionTipsPanel,
} from '@/features/permission-hub/types';
import { apiClient } from '@/lib/api/axios';
import type { ApiDataResponse, PaginatedResponse } from '@/lib/api/types';

type RealmQueryParams = {
  cursor: string;
  limit: number;
  q: string;
  sort: string;
};

export async function getPermissionRealms(
  { cursor, limit, q, sort }: RealmQueryParams = { cursor: '', limit: 6, q: '', sort: '' },
): Promise<PaginatedResponse<PermissionRealm>> {
  const response = await apiClient.get<PaginatedResponse<PermissionRealm>>(
    '/v2/permissions/realms',
    {
      params: { cursor, limit, q, sort },
    },
  );

  return response.data;
}

export async function getPermissionHubStats(): Promise<PermissionHubStats> {
  const response = await apiClient.get<ApiDataResponse<PermissionHubStats>>(
    '/v2/permissions/realms/stats',
  );
  return response.data.data;
}

export async function getPermissionHubFilters(): Promise<PermissionHubFilters> {
  const response = await apiClient.get<ApiDataResponse<PermissionHubFilters>>(
    '/v2/permissions/realms/filters',
  );
  return response.data.data;
}

export async function getPermissionHubTipsPanel(): Promise<PermissionTipsPanel> {
  const response = await apiClient.get<ApiDataResponse<PermissionTipsPanel>>('/v2/panels/tips', {
    params: { surface: 'permissions' },
  });

  return response.data.data;
}

export async function getPermissionHubGuideLinksPanel(): Promise<PermissionGuideLinksPanel> {
  const response = await apiClient.get<ApiDataResponse<PermissionGuideLinksPanel>>(
    '/v2/panels/guide-links',
    {
      params: { surface: 'permissions' },
    },
  );

  return response.data.data;
}
