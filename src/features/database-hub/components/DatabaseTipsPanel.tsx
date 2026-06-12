import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded';

import { WorkspaceTipsPanel } from '@/components/workspace';
import { databaseHubSectionStatus } from '@/features/database-hub/sectionStatus';
import type { DatabaseTipsPanel as DatabaseTipsPanelType } from '@/features/database-hub/types';

export function DatabaseTipsPanel({
  isLoading,
  panel,
}: {
  isLoading: boolean;
  panel?: DatabaseTipsPanelType;
}) {
  return (
    <WorkspaceTipsPanel
      emptyCopy="No database tips are available."
      hub="database"
      icon={<TipsAndUpdatesRoundedIcon sx={{ fontSize: 14 }} />}
      isLoading={isLoading}
      panel={panel}
      status={databaseHubSectionStatus.tips}
    />
  );
}
