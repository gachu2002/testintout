import type {
  PermissionGuideLinksPanel,
  PermissionHubFilters,
  PermissionHubStats,
  PermissionRealm,
  PermissionRealmCreateRequest,
  PermissionRequestItem,
  PermissionTipsPanel,
} from '@/features/permission-hub/types';
import { apiClient } from '@/lib/api/axios';
import type { ApiDataResponse, CursorParams, PaginatedResponse } from '@/lib/api/types';
import { unwrapApiData } from '@/lib/api/types';

export async function getPermissionRealms(
  { cursor, limit, q = '', sort = '' }: CursorParams = {
    cursor: '',
    limit: 100,
    sort: '-updatedAt',
  },
): Promise<PaginatedResponse<PermissionRealm>> {
  const response = await apiClient.get<PaginatedResponse<PermissionRealm>>(
    '/v2/permissions/realms',
    {
      params: { cursor, limit, q, sort },
    },
  );

  return response.data;
}

export async function createPermissionRealm(
  payload: PermissionRealmCreateRequest,
): Promise<PermissionRealm> {
  const response = await apiClient.post<ApiDataResponse<PermissionRealm>>(
    '/v2/permissions/realms',
    payload,
  );

  return unwrapApiData(response);
}

export async function getPermissionRequests(
  { cursor, limit, sort = '-createdAt' }: Pick<CursorParams, 'cursor' | 'limit' | 'sort'> = {
    cursor: '',
    limit: 8,
    sort: '-createdAt',
  },
): Promise<PaginatedResponse<PermissionRequestItem>> {
  const response = await apiClient.get<PaginatedResponse<PermissionRequestItem>>(
    '/v2/permissions/requests',
    {
      params: { cursor, limit, sort },
    },
  );

  return response.data;
}

export async function getPermissionHubStats(): Promise<PermissionHubStats> {
  const response = await apiClient.get<ApiDataResponse<PermissionHubStats>>(
    '/v2/permissions/realms/stats',
  );
  return unwrapApiData(response);
}

export async function getPermissionHubFilters(): Promise<PermissionHubFilters> {
  const response = await apiClient.get<ApiDataResponse<PermissionHubFilters>>(
    '/v2/permissions/realms/filters',
  );
  return unwrapApiData(response);
}

export async function getPermissionHubTipsPanel(): Promise<PermissionTipsPanel> {
  const response = await apiClient.get<ApiDataResponse<PermissionTipsPanel>>('/v2/panels/tips', {
    params: { surface: 'permissions' },
  });

  return unwrapApiData(response);
}

export async function getPermissionHubGuideLinksPanel(): Promise<PermissionGuideLinksPanel> {
  const response = await apiClient.get<ApiDataResponse<PermissionGuideLinksPanel>>(
    '/v2/panels/guide-links',
    {
      params: { surface: 'permissions' },
    },
  );

  return unwrapApiData(response);
}
