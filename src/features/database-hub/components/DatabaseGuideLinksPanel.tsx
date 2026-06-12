import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';

import { WorkspaceGuideLinksPanel } from '@/components/workspace';
import { databaseHubSectionStatus } from '@/features/database-hub/sectionStatus';
import type { DatabaseGuideLinksPanel as DatabaseGuideLinksPanelType } from '@/features/database-hub/types';

export function DatabaseGuideLinksPanel({
  isLoading,
  panel,
}: {
  isLoading: boolean;
  panel?: DatabaseGuideLinksPanelType;
}) {
  return (
    <WorkspaceGuideLinksPanel
      emptyCopy="No database guide links are available."
      hub="database"
      icon={<MenuBookRoundedIcon sx={{ fontSize: 14 }} />}
      isLoading={isLoading}
      panel={panel}
      status={databaseHubSectionStatus.guideLinks}
    />
  );
}
