import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';

import { WorkspaceGuideLinksPanel } from '@/components/workspace';
import { permissionHubSectionStatus } from '@/features/permission-hub/sectionStatus';
import type { PermissionGuideLinksPanel as PermissionGuideLinksPanelType } from '@/features/permission-hub/types';

export function PermissionGuideLinksPanel({
  isLoading,
  panel,
}: {
  isLoading: boolean;
  panel?: PermissionGuideLinksPanelType;
}) {
  return (
    <WorkspaceGuideLinksPanel
      emptyCopy="No permission guide links are available."
      hub="permissions"
      icon={<MenuBookRoundedIcon sx={{ fontSize: 14 }} />}
      isLoading={isLoading}
      panel={panel}
      status={permissionHubSectionStatus.guideLinks}
    />
  );
}
