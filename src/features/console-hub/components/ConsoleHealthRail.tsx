import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded';
import { Box, Skeleton, Stack } from '@mui/material';

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
import { consoleHubSectionStatus } from '@/features/console-hub/sectionStatus';
import type { ConsoleHealthPanel, ConsoleHealthPanelRow } from '@/features/console-hub/types';
import type { ToneName } from '@/styles/tokens';

const railCopy = {
  description:
    '이상 감지는 이벤트 흐름에서 확인하고, 우측 레일은 콘솔 런타임의 현재 상태 요약만 보여줍니다.',
  empty: 'No console health rows are available.',
  summaryLabel: 'Runtime summary',
};

export function ConsoleHealthRail({
  isLoading,
  panel,
}: {
  isLoading: boolean;
  panel?: ConsoleHealthPanel;
}) {
  const rows = panel?.rows ?? [];

  return (
    <Panel hub="consoles">
      <Kicker sx={{ mb: 1.75 }}>
        <HealthAndSafetyRoundedIcon sx={{ fontSize: 14 }} />
        {panel?.label ?? 'Running Health'}
        <SectionStatusBadge status={consoleHubSectionStatus.healthRail} />
      </Kicker>
      <Head>
        <HeadCopy>
          {isLoading ? <Skeleton height={28} width={230} /> : <Title>{panel?.title}</Title>}
          {isLoading ? <Skeleton height={54} width="100%" /> : <Desc>{railCopy.description}</Desc>}
        </HeadCopy>
      </Head>

      {isLoading ? (
        <RowSkeletons count={5} height={66} />
      ) : panel && rows.length > 0 ? (
        <Box>
          <SummaryHeader>
            <SummaryLabel>{railCopy.summaryLabel}</SummaryLabel>
            <SummaryValue hub="consoles">{panel.summary.total.toLocaleString()} total</SummaryValue>
          </SummaryHeader>
          <SummaryBadges summary={panel.summary} />
          <RowList dense>
            {rows.map((row) => (
              <HealthRow key={row.id} row={row} />
            ))}
          </RowList>
        </Box>
      ) : (
        <Empty>{railCopy.empty}</Empty>
      )}
    </Panel>
  );
}

function SummaryBadges({ summary }: { summary: ConsoleHealthPanel['summary'] }) {
  return (
    <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 1.5 }}>
      <Badge dot tone="healthy">
        Running {summary.running.toLocaleString()}
      </Badge>
      <Badge dot tone={summary.stopped > 0 ? 'warn' : 'draft'}>
        Stopped {summary.stopped.toLocaleString()}
      </Badge>
      <Badge dot tone={summary.error > 0 ? 'incident' : 'draft'}>
        Error {summary.error.toLocaleString()}
      </Badge>
    </Stack>
  );
}

function HealthRow({ row }: { row: ConsoleHealthPanelRow }) {
  return (
    <ListRow center compact>
      <RowCopy>
        <RowTitle noWrap>{row.title}</RowTitle>
        <RowMeta>{row.meta}</RowMeta>
      </RowCopy>
      <Badge dot tone={getPillTone(row.pill.tone)}>
        {row.pill.label}
      </Badge>
    </ListRow>
  );
}

function getPillTone(tone: string): ToneName {
  if (tone === 'healthy') return 'healthy';
  if (tone === 'warning' || tone === 'warn') return 'warn';
  if (tone === 'critical' || tone === 'error' || tone === 'incident') return 'incident';
  if (tone === 'stopped' || tone === 'muted') return 'muted';
  if (tone === 'unknown') return 'draft';

  return 'info';
}
