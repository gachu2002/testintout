import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded';

import { WorkspaceTipsPanel } from '@/components/workspace';
import { permissionHubSectionStatus } from '@/features/permission-hub/sectionStatus';
import type { PermissionTipsPanel as PermissionTipsPanelType } from '@/features/permission-hub/types';

export function PermissionTipsPanel({
  isLoading,
  panel,
}: {
  isLoading: boolean;
  panel?: PermissionTipsPanelType;
}) {
  return (
    <WorkspaceTipsPanel
      emptyCopy="No permission tips are available."
      hub="permissions"
      icon={<TipsAndUpdatesRoundedIcon sx={{ fontSize: 14 }} />}
      isLoading={isLoading}
      panel={panel}
      status={permissionHubSectionStatus.tips}
      titleSkeletonWidth={180}
    />
  );
}
