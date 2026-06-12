import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded';

import { WorkspaceTipsPanel } from '@/components/workspace';
import { consoleHubSectionStatus } from '@/features/console-hub/sectionStatus';
import type { ConsoleTipsPanel as ConsoleTipsPanelType } from '@/features/console-hub/types';

export function ConsoleTipsPanel({
  isLoading,
  panel,
}: {
  isLoading: boolean;
  panel?: ConsoleTipsPanelType;
}) {
  return (
    <WorkspaceTipsPanel
      emptyCopy="No console tips are available."
      hub="consoles"
      icon={<TipsAndUpdatesRoundedIcon sx={{ fontSize: 14 }} />}
      isLoading={isLoading}
      panel={panel}
      status={consoleHubSectionStatus.tips}
    />
  );
}
