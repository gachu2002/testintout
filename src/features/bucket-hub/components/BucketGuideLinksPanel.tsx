import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';

import { WorkspaceGuideLinksPanel } from '@/components/workspace';
import { bucketHubSectionStatus } from '@/features/bucket-hub/sectionStatus';
import type { BucketGuideLinksPanel as BucketGuideLinksPanelType } from '@/features/bucket-hub/types';

export function BucketGuideLinksPanel({
  isLoading,
  panel,
}: {
  isLoading: boolean;
  panel?: BucketGuideLinksPanelType;
}) {
  return (
    <WorkspaceGuideLinksPanel
      emptyCopy="No bucket guide links are available."
      hub="buckets"
      icon={<MenuBookRoundedIcon sx={{ fontSize: 14 }} />}
      isLoading={isLoading}
      panel={panel}
      status={bucketHubSectionStatus.guideLinks}
    />
  );
}
