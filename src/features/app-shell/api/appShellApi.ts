import type {
  CurrentUser,
  Notification,
  ServiceMenuGroup,
  ServiceMenuResponseData,
} from '@/features/app-shell/types';
import { apiClient } from '@/lib/api/axios';
import type { ApiDataResponse, CursorParams, PaginatedResponse } from '@/lib/api/types';
import { unwrapApiData } from '@/lib/api/types';

export async function getCurrentUser(): Promise<CurrentUser> {
  const response = await apiClient.get<ApiDataResponse<CurrentUser>>('/v2/me');
  return unwrapApiData(response);
}

export async function getServiceMenu(): Promise<ServiceMenuGroup[]> {
  const response = await apiClient.get<ApiDataResponse<ServiceMenuResponseData>>(
    '/v2/launchpad/service-menu',
  );
  return unwrapApiData(response).items;
}

export async function getHeaderNotifications(
  { cursor, limit }: CursorParams = { cursor: '', limit: 6 },
): Promise<PaginatedResponse<Notification>> {
  const response = await apiClient.get<PaginatedResponse<Notification>>('/v2/me/notifications', {
    params: { cursor, limit },
  });

  return response.data;
}
