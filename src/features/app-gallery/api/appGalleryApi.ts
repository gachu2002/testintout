import type {
  AppGalleryApp,
  AppGalleryAppDetail,
  AppGalleryCategories,
  AppGalleryFeaturedApp,
  AppGalleryHero,
  AppGalleryRelatedAi,
} from '@/features/app-gallery/types';
import { apiClient } from '@/lib/api/axios';
import type { ApiDataResponse, PaginatedResponse } from '@/lib/api/types';

type AppGalleryCursorParams = {
  cursor: string;
  limit: number;
};

export async function getAppGalleryHero(): Promise<AppGalleryHero> {
  const response = await apiClient.get<ApiDataResponse<AppGalleryHero>>('/v2/app-gallery/hero');
  return response.data.data;
}

export async function getAppGalleryCategories(): Promise<AppGalleryCategories> {
  const response = await apiClient.get<ApiDataResponse<AppGalleryCategories>>(
    '/v2/app-gallery/categories',
  );
  return response.data.data;
}

export async function getAppGalleryFeatured(): Promise<AppGalleryFeaturedApp[]> {
  const response = await apiClient.get<ApiDataResponse<{ items: AppGalleryFeaturedApp[] }>>(
    '/v2/app-gallery/featured',
  );
  return response.data.data.items;
}

export async function getAppGalleryApps(
  { cursor, limit }: AppGalleryCursorParams = { cursor: '', limit: 6 },
): Promise<PaginatedResponse<AppGalleryApp>> {
  const response = await apiClient.get<PaginatedResponse<AppGalleryApp>>('/v2/app-gallery/apps', {
    params: { cursor, limit },
  });
  return response.data;
}

export async function getAppGalleryAppDetail(slug: string): Promise<AppGalleryAppDetail> {
  const response = await apiClient.get<ApiDataResponse<AppGalleryAppDetail>>(
    `/v2/app-gallery/apps/${encodeURIComponent(slug)}`,
  );
  return response.data.data;
}

export async function getAppGalleryRelatedAi(): Promise<AppGalleryRelatedAi[]> {
  const response = await apiClient.get<ApiDataResponse<{ items: AppGalleryRelatedAi[] }>>(
    '/v2/app-gallery/related-ai',
  );
  return response.data.data.items;
}
