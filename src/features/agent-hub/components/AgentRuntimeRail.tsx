import MonitorHeartRoundedIcon from '@mui/icons-material/MonitorHeartRounded';
import { Box, Skeleton } from '@mui/material';

import { SectionStatusBadge } from '@/components/reference-status';
import {
  Badge,
  Desc,
  Empty,
  Head,
  HeadCopy,
  Kicker,
  ListRow,
  Panel,
  RowCopy,
  RowList,
  RowMeta,
  RowSkeletons,
  RowTitle,
  SummaryHeader,
  SummaryLabel,
  SummaryValue,
  Title,
} from '@/components/workspace';
import { agentHubSectionStatus } from '@/features/agent-hub/sectionStatus';
import type { AgentRuntimePanelRow, AgentRuntimeStatusPanel } from '@/features/agent-hub/types';
import type { ToneName } from '@/styles/tokens';

export function AgentRuntimeRail({
  isLoading,
  panel,
}: {
  isLoading: boolean;
  panel?: AgentRuntimeStatusPanel;
}) {
  const rows = panel?.rows ?? [];

  return (
    <Panel hub="agents">
      <Kicker sx={{ mb: 1.75 }}>
        <MonitorHeartRoundedIcon sx={{ fontSize: 14 }} />
        {panel?.label ?? 'Runtime Status'}
        <SectionStatusBadge status={agentHubSectionStatus.runtimeRail} />
      </Kicker>
      <Head>
        <HeadCopy>
          {isLoading ? <Skeleton height={28} width={230} /> : <Title>{panel?.title}</Title>}
          {isLoading ? (
            <Skeleton height={54} width="100%" />
          ) : panel?.description ? (
            <Desc>{panel.description}</Desc>
          ) : null}
        </HeadCopy>
      </Head>

      {isLoading ? (
        <RowSkeletons count={4} height={66} />
      ) : rows.length > 0 ? (
        <Box>
          <SummaryHeader>
            <SummaryLabel>Runtime rows</SummaryLabel>
            <SummaryValue hub="agents">{rows.length.toLocaleString()} agents</SummaryValue>
          </SummaryHeader>
          <RowList dense>
            {rows.map((row) => (
              <RuntimeRow key={row.id} row={row} />
            ))}
          </RowList>
        </Box>
      ) : (
        <Empty>No agent runtime rows are available.</Empty>
      )}
    </Panel>
  );
}

function RuntimeRow({ row }: { row: AgentRuntimePanelRow }) {
  return (
    <ListRow center compact>
      <RowCopy>
        <RowTitle noWrap>{row.title}</RowTitle>
        <RowMeta>{row.meta}</RowMeta>
      </RowCopy>
      <Badge dot tone={getTone(row.pill.tone)}>
        {row.pill.label}
      </Badge>
    </ListRow>
  );
}

function getTone(tone: string): ToneName {
  if (tone === 'healthy' || tone === 'running') return 'healthy';
  if (tone === 'review') return 'review';
  if (tone === 'warning') return 'warn';
  if (tone === 'error' || tone === 'incident') return 'incident';
  if (tone === 'muted' || tone === 'stopped') return 'muted';

  return 'info';
}
