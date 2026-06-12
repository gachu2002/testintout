import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';

import { WorkspaceGuideLinksPanel } from '@/components/workspace';
import { agentHubSectionStatus } from '@/features/agent-hub/sectionStatus';
import type { AgentGuideLinksPanel as AgentGuideLinksPanelType } from '@/features/agent-hub/types';

export function AgentGuideLinksPanel({
  isLoading,
  panel,
}: {
  isLoading: boolean;
  panel?: AgentGuideLinksPanelType;
}) {
  return (
    <WorkspaceGuideLinksPanel
      emptyCopy="No agent guide links are available."
      hub="agents"
      icon={<MenuBookRoundedIcon sx={{ fontSize: 14 }} />}
      isLoading={isLoading}
      panel={panel}
      status={agentHubSectionStatus.guideLinks}
    />
  );
}
