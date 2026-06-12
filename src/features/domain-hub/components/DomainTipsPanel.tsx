import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded';

import { WorkspaceTipsPanel } from '@/components/workspace';
import { domainHubSectionStatus } from '@/features/domain-hub/sectionStatus';
import type { DomainTipsPanel as DomainTipsPanelType } from '@/features/domain-hub/types';

export function DomainTipsPanel({
  isLoading,
  panel,
}: {
  isLoading: boolean;
  panel?: DomainTipsPanelType;
}) {
  return (
    <WorkspaceTipsPanel
      emptyCopy="No DNS tips are available."
      hub="domain"
      icon={<TipsAndUpdatesRoundedIcon sx={{ fontSize: 14 }} />}
      isLoading={isLoading}
      panel={panel}
      status={domainHubSectionStatus.tips}
      titleSkeletonWidth={180}
    />
  );
}
