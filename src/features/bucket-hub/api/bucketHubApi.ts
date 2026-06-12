import type {
  BucketGuideLinksPanel,
  BucketHubFilters,
  BucketHubStats,
  BucketResource,
  BucketTipsPanel,
  BucketUsagePanel,
} from '@/features/bucket-hub/types';
import { apiClient } from '@/lib/api/axios';
import type { ApiDataResponse, PaginatedResponse } from '@/lib/api/types';

type CursorParams = {
  cursor: string;
  limit: number;
  q: string;
  sort: string;
};

export async function getBucketHubBuckets({
  cursor,
  limit,
  q,
  sort,
}: CursorParams): Promise<PaginatedResponse<BucketResource>> {
  const response = await apiClient.get<PaginatedResponse<BucketResource>>('/v2/buckets', {
    params: { cursor, limit, q, sort },
  });

  return response.data;
}

export async function getBucketHubStats(): Promise<BucketHubStats> {
  const response = await apiClient.get<ApiDataResponse<BucketHubStats>>('/v2/buckets/stats');
  return response.data.data;
}

export async function getBucketHubFilters(): Promise<BucketHubFilters> {
  const response = await apiClient.get<ApiDataResponse<BucketHubFilters>>('/v2/buckets/filters');
  return response.data.data;
}

export async function getBucketHubTipsPanel(): Promise<BucketTipsPanel> {
  const response = await apiClient.get<ApiDataResponse<BucketTipsPanel>>('/v2/panels/tips', {
    params: { surface: 'buckets' },
  });

  return response.data.data;
}

export async function getBucketHubGuideLinksPanel(): Promise<BucketGuideLinksPanel> {
  const response = await apiClient.get<ApiDataResponse<BucketGuideLinksPanel>>(
    '/v2/panels/guide-links',
    {
      params: { surface: 'buckets' },
    },
  );

  return response.data.data;
}

export async function getBucketUsagePanel(): Promise<BucketUsagePanel> {
  const response = await apiClient.get<ApiDataResponse<BucketUsagePanel>>(
    '/v2/buckets/panels/usage',
  );

  return response.data.data;
}
