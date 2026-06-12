import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';

import { WorkspaceGuideLinksPanel } from '@/components/workspace';
import { domainHubSectionStatus } from '@/features/domain-hub/sectionStatus';
import type { DomainGuideLinksPanel as DomainGuideLinksPanelType } from '@/features/domain-hub/types';

export function DomainGuideLinksPanel({
  isLoading,
  panel,
}: {
  isLoading: boolean;
  panel?: DomainGuideLinksPanelType;
}) {
  return (
    <WorkspaceGuideLinksPanel
      emptyCopy="No domain guide links are available."
      hub="domain"
      icon={<MenuBookRoundedIcon sx={{ fontSize: 14 }} />}
      isLoading={isLoading}
      panel={panel}
      status={domainHubSectionStatus.guideLinks}
    />
  );
}
