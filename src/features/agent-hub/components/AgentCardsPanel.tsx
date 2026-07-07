import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import ApprovalRoundedIcon from '@mui/icons-material/ApprovalRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import SchemaRoundedIcon from '@mui/icons-material/SchemaRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import { Box, Button } from '@mui/material';

import { Badge, buildResourceResultCopy, IconTile, Metric } from '@/components/workspace';
import {
  ResourceCardFooter,
  ResourceCardRoot,
  ResourceCardTop,
  ResourceInfoBadge,
  ResourceInfoBlock,
  ResourceInfoCard,
  ResourceKindLabel,
  ResourceMeta,
  ResourceMetricList,
  ResourceName,
  ResourceNameRow,
  ResourceStatusRow,
} from '@/components/workspace/ResourceCardPrimitives';
import {
  ResourceInfoText,
  ResourceMenuIcon,
  WorkspaceResourceCardsPanel,
} from '@/components/workspace/ResourceCards';
import { agentHubSectionStatus } from '@/features/agent-hub/sectionStatus';
import type { AgentFilterState, AgentResource } from '@/features/agent-hub/types';
import { formatLabel } from '@/lib/formatters';
import type { ToneName } from '@/styles/tokens';

const panelCopy = {
  description:
    '자동화 실행 주체를 workflow, runtime provider, model, approval 기준으로 비교합니다. 상세/실행 액션은 계약이 들어오면 연결합니다.',
  empty: '선택한 필터에 맞는 agent가 없습니다.',
  label: 'Agent Fleet',
  title: 'Agents',
};

export function AgentCardsPanel({
  agents,
  filterState,
  isLoading,
  loadedCount,
  total,
}: {
  agents: AgentResource[];
  filterState: AgentFilterState;
  isLoading: boolean;
  loadedCount: number;
  total?: number;
}) {
  return (
    <WorkspaceResourceCardsPanel
      description={panelCopy.description}
      emptyCopy={panelCopy.empty}
      hub="agents"
      icon={<SmartToyRoundedIcon sx={{ fontSize: 14 }} />}
      isEmpty={agents.length === 0}
      isLoading={isLoading}
      label={panelCopy.label}
      resultCopy={buildResourceResultCopy({
        isDefault: filterState.type === 'all' && filterState.status === 'all',
        loadedCount,
        total,
        visibleCount: agents.length,
      })}
      skeletonCount={2}
      status={agentHubSectionStatus.cards}
      title={panelCopy.title}
    >
      {agents.map((agent) => (
        <AgentCard agent={agent} key={agent.id} />
      ))}
    </WorkspaceResourceCardsPanel>
  );
}

function AgentCard({ agent }: { agent: AgentResource }) {
  const summary = agent.summary || `${agent.typeLabel} agent`;
  const runtimeLabel = `${formatLabel(agent.runtime.provider)} · ${agent.runtime.statusLabel}`;
  const approvalLabel = agent.approval.required ? 'Approval required' : 'No approval';
  const stepLabel = `${agent.workflow.stepCount.toLocaleString()} workflow steps`;

  return (
    <ResourceCardRoot hub="agents">
      <ResourceCardTop>
        <Box minWidth={0}>
          <ResourceStatusRow>
            <Badge dot tone={getStatusTone(agent.status)}>
              {agent.statusLabel}
            </Badge>
            <ResourceKindLabel>{agent.typeLabel}</ResourceKindLabel>
          </ResourceStatusRow>
          <ResourceNameRow>
            <IconTile hub="agents" tileSize={42}>
              <AccountTreeRoundedIcon sx={{ fontSize: 20 }} />
            </IconTile>
            <Box minWidth={0}>
              <ResourceName>{agent.name}</ResourceName>
              <ResourceMeta>{summary}</ResourceMeta>
            </Box>
          </ResourceNameRow>
        </Box>
        <ResourceMenuIcon />
      </ResourceCardTop>

      <ResourceMetricList>
        <Metric>
          <SchemaRoundedIcon />
          {stepLabel}
        </Metric>
        <Metric>
          <SmartToyRoundedIcon />
          {agent.model.primary}
        </Metric>
        <Metric>
          <ApprovalRoundedIcon />
          {approvalLabel}
        </Metric>
      </ResourceMetricList>

      <ResourceInfoBlock>
        <ResourceInfoCard>
          <ResourceInfoBadge hub="agents" tileSize={30}>
            {getInitials(agent.owner.name)}
          </ResourceInfoBadge>
          <ResourceInfoText meta="Owner" title={agent.owner.name} />
        </ResourceInfoCard>
        <ResourceInfoCard>
          <ResourceInfoBadge hub="agents" tileSize={30}>
            RT
          </ResourceInfoBadge>
          <ResourceInfoText meta={agent.runtime.url || agent.openUrl} title={runtimeLabel} />
        </ResourceInfoCard>
        <ResourceInfoCard>
          <ResourceInfoBadge hub="agents" tileSize={30}>
            <KeyRoundedIcon sx={{ fontSize: 15 }} />
          </ResourceInfoBadge>
          <ResourceInfoText
            meta={`${agent.toolCount.toLocaleString()} linked tools`}
            title={`${formatLabel(agent.auth.mode)} auth`}
          />
        </ResourceInfoCard>
      </ResourceInfoBlock>

      <ResourceCardFooter>
        <Button disabled size="small" variant="outlined">
          Detail
        </Button>
        <Button disabled size="small" startIcon={<OpenInNewRoundedIcon />} variant="contained">
          Open
        </Button>
      </ResourceCardFooter>
    </ResourceCardRoot>
  );
}

function getStatusTone(status: string): ToneName {
  if (status === 'running') return 'healthy';
  if (status === 'review') return 'review';
  if (status === 'paused' || status === 'stopped') return 'muted';
  if (status === 'error' || status === 'failed') return 'incident';

  return 'info';
}

function getInitials(name: string) {
  const initials = name
    .split(/[/(\s._-]+/)
    .map((part) => part.at(0))
    .filter((part): part is string => Boolean(part))
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return initials || 'AG';
}
