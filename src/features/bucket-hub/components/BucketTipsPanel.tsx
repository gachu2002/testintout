import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded';

import { WorkspaceTipsPanel } from '@/components/workspace';
import { bucketHubSectionStatus } from '@/features/bucket-hub/sectionStatus';
import type { BucketTipsPanel as BucketTipsPanelType } from '@/features/bucket-hub/types';

export function BucketTipsPanel({
  isLoading,
  panel,
}: {
  isLoading: boolean;
  panel?: BucketTipsPanelType;
}) {
  return (
    <WorkspaceTipsPanel
      emptyCopy="No bucket tips are available."
      hub="buckets"
      icon={<TipsAndUpdatesRoundedIcon sx={{ fontSize: 14 }} />}
      isLoading={isLoading}
      panel={panel}
      status={bucketHubSectionStatus.tips}
      titleSkeletonWidth={180}
    />
  );
}
