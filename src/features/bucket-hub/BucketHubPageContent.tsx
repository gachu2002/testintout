import { Stack } from '@mui/material';
import { useState } from 'react';

import { CardGrid, MainGrid } from '@/components/workspace';
import { QueryErrorAlerts } from '@/components/workspace/QueryErrorAlerts';
import { BucketCardsPanel } from '@/features/bucket-hub/components/BucketCardsPanel';
import { BucketGuideLinksPanel } from '@/features/bucket-hub/components/BucketGuideLinksPanel';
import { BucketHubFilterBar } from '@/features/bucket-hub/components/BucketHubFilterBar';
import { BucketHubHero } from '@/features/bucket-hub/components/BucketHubHero';
import { BucketTipsPanel } from '@/features/bucket-hub/components/BucketTipsPanel';
import { BucketUsageRail } from '@/features/bucket-hub/components/BucketUsageRail';
import {
  useBucketHubBucketsQuery,
  useBucketHubFiltersQuery,
  useBucketHubGuideLinksQuery,
  useBucketHubStatsQuery,
  useBucketHubTipsQuery,
  useBucketUsagePanelQuery,
} from '@/features/bucket-hub/hooks/useBucketHubQueries';
import type { BucketFilterValue, BucketResource } from '@/features/bucket-hub/types';

export function BucketHubPageContent() {
  const [activeFilter, setActiveFilter] = useState<BucketFilterValue>('all');
  const bucketsQuery = useBucketHubBucketsQuery(20, '', '', '');
  const filtersQuery = useBucketHubFiltersQuery();
  const statsQuery = useBucketHubStatsQuery();
  const tipsQuery = useBucketHubTipsQuery();
  const guideLinksQuery = useBucketHubGuideLinksQuery();
  const usagePanelQuery = useBucketUsagePanelQuery();
  const buckets = bucketsQuery.data?.items ?? [];
  const visibleBuckets = buckets.filter((bucket) => matchesBucketFilter(bucket, activeFilter));

  return (
    <Stack spacing={2.5}>
      <BucketHubHero
        filters={filtersQuery.data}
        isLoading={statsQuery.isLoading || filtersQuery.isLoading}
        stats={statsQuery.data}
      />
      <BucketHubFilterBar
        activeFilter={activeFilter}
        filters={filtersQuery.data}
        isLoading={filtersQuery.isLoading}
        onFilterChange={setActiveFilter}
      />
      <MainGrid>
        <Stack spacing={2.5}>
          <BucketCardsPanel
            activeFilter={activeFilter}
            buckets={visibleBuckets}
            isLoading={bucketsQuery.isLoading}
            loadedCount={buckets.length}
            total={bucketsQuery.data?.page.total}
          />
          <CardGrid collapseAt="md">
            <BucketTipsPanel isLoading={tipsQuery.isLoading} panel={tipsQuery.data} />
            <BucketGuideLinksPanel
              isLoading={guideLinksQuery.isLoading}
              panel={guideLinksQuery.data}
            />
          </CardGrid>
        </Stack>
        <Stack spacing={2.5}>
          <BucketUsageRail isLoading={usagePanelQuery.isLoading} panel={usagePanelQuery.data} />
        </Stack>
      </MainGrid>
      <QueryErrorAlerts
        alerts={[
          {
            isError: statsQuery.isError,
            message:
              'Bucket statistics could not be loaded. The page will show available data only.',
          },
          {
            isError: filtersQuery.isError,
            message:
              'Bucket filters could not be loaded. The page will show the default view only.',
          },
          {
            isError: bucketsQuery.isError,
            message: 'Buckets could not be loaded. Try refreshing the page in a moment.',
          },
          {
            isError: tipsQuery.isError,
            message:
              'Bucket operation tips could not be loaded. Try refreshing the page in a moment.',
          },
          {
            isError: guideLinksQuery.isError,
            message: 'Bucket guide links could not be loaded. Try refreshing the page in a moment.',
          },
          {
            isError: usagePanelQuery.isError,
            message: 'Bucket usage rail could not be loaded. Try refreshing the page in a moment.',
          },
        ]}
      />
    </Stack>
  );
}

function matchesBucketFilter(bucket: BucketResource, activeFilter: BucketFilterValue) {
  if (activeFilter === 'all') return true;
  if (activeFilter.startsWith('type:')) return bucket.type === activeFilter.slice('type:'.length);
  if (activeFilter.startsWith('status:'))
    return bucket.status === activeFilter.slice('status:'.length);

  return true;
}
