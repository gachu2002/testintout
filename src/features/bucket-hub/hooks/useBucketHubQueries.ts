import { useQuery } from '@tanstack/react-query';

import {
  getBucketHubBuckets,
  getBucketHubFilters,
  getBucketHubGuideLinksPanel,
  getBucketHubStats,
  getBucketHubTipsPanel,
  getBucketUsagePanel,
} from '@/features/bucket-hub/api/bucketHubApi';

export const bucketHubQueryKeys = {
  all: ['bucket-hub'] as const,
  buckets: (limit: number, cursor: string, sort: string, q: string) =>
    [...bucketHubQueryKeys.all, 'buckets', limit, cursor, sort, q] as const,
  filters: () => [...bucketHubQueryKeys.all, 'filters'] as const,
  guideLinks: () => [...bucketHubQueryKeys.all, 'guide-links', 'buckets'] as const,
  stats: () => [...bucketHubQueryKeys.all, 'stats'] as const,
  tips: () => [...bucketHubQueryKeys.all, 'tips', 'buckets'] as const,
  usagePanel: () => [...bucketHubQueryKeys.all, 'usage-panel'] as const,
};

export function useBucketHubBucketsQuery(limit = 20, cursor = '', sort = '', q = '') {
  return useQuery({
    queryFn: () => getBucketHubBuckets({ cursor, limit, q, sort }),
    queryKey: bucketHubQueryKeys.buckets(limit, cursor, sort, q),
  });
}

export function useBucketHubFiltersQuery() {
  return useQuery({
    queryFn: getBucketHubFilters,
    queryKey: bucketHubQueryKeys.filters(),
  });
}

export function useBucketHubStatsQuery() {
  return useQuery({
    queryFn: getBucketHubStats,
    queryKey: bucketHubQueryKeys.stats(),
  });
}

export function useBucketHubTipsQuery() {
  return useQuery({
    queryFn: getBucketHubTipsPanel,
    queryKey: bucketHubQueryKeys.tips(),
  });
}

export function useBucketHubGuideLinksQuery() {
  return useQuery({
    queryFn: getBucketHubGuideLinksPanel,
    queryKey: bucketHubQueryKeys.guideLinks(),
  });
}

export function useBucketUsagePanelQuery() {
  return useQuery({
    queryFn: getBucketUsagePanel,
    queryKey: bucketHubQueryKeys.usagePanel(),
  });
}
