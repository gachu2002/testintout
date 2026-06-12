import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';

import { WorkspaceGuideLinksPanel } from '@/components/workspace';
import { consoleHubSectionStatus } from '@/features/console-hub/sectionStatus';
import type { ConsoleGuideLinksPanel as ConsoleGuideLinksPanelType } from '@/features/console-hub/types';

export function ConsoleGuideLinksPanel({
  isLoading,
  panel,
}: {
  isLoading: boolean;
  panel?: ConsoleGuideLinksPanelType;
}) {
  return (
    <WorkspaceGuideLinksPanel
      emptyCopy="No console guide links are available."
      hub="consoles"
      icon={<MenuBookRoundedIcon sx={{ fontSize: 14 }} />}
      isLoading={isLoading}
      panel={panel}
      status={consoleHubSectionStatus.guideLinks}
    />
  );
}
