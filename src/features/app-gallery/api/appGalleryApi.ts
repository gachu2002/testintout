import type {
  AppGalleryApp,
  AppGalleryAppDetail,
  AppGalleryAppsParams,
  AppGalleryCategories,
  AppGalleryFeaturedApp,
  AppGalleryHero,
  AppGalleryInstallRequest,
  AppGalleryInstallResult,
  AppGalleryRelatedAi,
} from '@/features/app-gallery/types';
import { apiClient } from '@/lib/api/axios';
import type { ApiDataResponse, PaginatedResponse } from '@/lib/api/types';
import { unwrapApiData } from '@/lib/api/types';

export async function getAppGalleryHero(): Promise<AppGalleryHero> {
  const response = await apiClient.get<ApiDataResponse<AppGalleryHero>>('/v2/app-gallery/hero');
  return unwrapApiData(response);
}

export async function getAppGalleryCategories(): Promise<AppGalleryCategories> {
  const response = await apiClient.get<ApiDataResponse<AppGalleryCategories>>(
    '/v2/app-gallery/categories',
  );
  return unwrapApiData(response);
}

export async function getAppGalleryFeatured(): Promise<AppGalleryFeaturedApp[]> {
  const response = await apiClient.get<ApiDataResponse<{ items: AppGalleryFeaturedApp[] }>>(
    '/v2/app-gallery/featured',
  );
  return unwrapApiData(response).items;
}

export async function getAppGalleryApps({
  category,
  cursor = '',
  limit = 6,
  q = '',
}: AppGalleryAppsParams = {}): Promise<PaginatedResponse<AppGalleryApp>> {
  const response = await apiClient.get<PaginatedResponse<AppGalleryApp>>('/v2/app-gallery/apps', {
    params: {
      cursor,
      ...(category ? { 'filter[category]': category } : {}),
      limit,
      q,
    },
  });
  return response.data;
}

export async function getAppGalleryAppDetail(slug: string): Promise<AppGalleryAppDetail> {
  const response = await apiClient.get<ApiDataResponse<AppGalleryAppDetail>>(
    `/v2/app-gallery/apps/${encodeURIComponent(slug)}`,
  );
  return unwrapApiData(response);
}

export async function getAppGalleryRelatedAi(): Promise<AppGalleryRelatedAi[]> {
  const response = await apiClient.get<ApiDataResponse<{ items: AppGalleryRelatedAi[] }>>(
    '/v2/app-gallery/related-ai',
  );
  return unwrapApiData(response).items;
}

export async function installAppGalleryApp({
  projectId,
  slug,
}: AppGalleryInstallRequest): Promise<AppGalleryInstallResult> {
  const response = await apiClient.post<ApiDataResponse<AppGalleryInstallResult>>(
    `/v2/app-gallery/apps/${encodeURIComponent(slug)}/install`,
    { projectId },
  );

  return unwrapApiData(response);
}
