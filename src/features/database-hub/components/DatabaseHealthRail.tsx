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
import { databaseHubSectionStatus } from '@/features/database-hub/sectionStatus';
import type { DatabaseHealthPanel, DatabaseHealthPanelItem } from '@/features/database-hub/types';
import { formatLabel } from '@/lib/formatters';
import type { ToneName } from '@/styles/tokens';

const railCopy = {
  description:
    '세부 이상 감지는 런타임/인프라 이벤트 기준으로 확인합니다. 우측 레일은 데이터 리소스의 헬스 요약만 보여줍니다.',
  empty: 'No database health rows are available.',
  label: 'Running Health',
  summaryLabel: 'Health summary',
  title: '현재 Running 리소스 Healthy',
};

export function DatabaseHealthRail({
  isLoading,
  panel,
}: {
  isLoading: boolean;
  panel?: DatabaseHealthPanel;
}) {
  const items = panel?.items ?? [];

  return (
    <Panel hub="database">
      <Kicker sx={{ mb: 1.75 }}>
        <HealthAndSafetyRoundedIcon sx={{ fontSize: 14 }} />
        {railCopy.label}
        <SectionStatusBadge status={databaseHubSectionStatus.healthRail} />
      </Kicker>
      <Head>
        <HeadCopy>
          {isLoading ? <Skeleton height={28} width={230} /> : <Title>{railCopy.title}</Title>}
          {isLoading ? <Skeleton height={54} width="100%" /> : <Desc>{railCopy.description}</Desc>}
        </HeadCopy>
      </Head>

      {isLoading ? (
        <RowSkeletons count={5} height={66} />
      ) : panel && items.length > 0 ? (
        <Box>
          <SummaryHeader>
            <SummaryLabel>{railCopy.summaryLabel}</SummaryLabel>
            <SummaryValue hub="database">{panel.summary.total.toLocaleString()} total</SummaryValue>
          </SummaryHeader>
          <SummaryBadges summary={panel.summary} />
          <RowList dense>
            {items.map((item) => (
              <HealthRow item={item} key={item.id} />
            ))}
          </RowList>
        </Box>
      ) : (
        <Empty>{railCopy.empty}</Empty>
      )}
    </Panel>
  );
}

function SummaryBadges({ summary }: { summary: DatabaseHealthPanel['summary'] }) {
  return (
    <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 1.5 }}>
      <Badge dot tone="healthy">
        Healthy {summary.healthy.toLocaleString()}
      </Badge>
      <Badge dot tone={summary.degraded > 0 ? 'warn' : 'draft'}>
        Degraded {summary.degraded.toLocaleString()}
      </Badge>
      <Badge dot tone="draft">
        Unknown {summary.unknown.toLocaleString()}
      </Badge>
    </Stack>
  );
}

function HealthRow({ item }: { item: DatabaseHealthPanelItem }) {
  return (
    <ListRow center compact>
      <RowCopy>
        <RowTitle noWrap>{item.name}</RowTitle>
        <RowMeta>{buildHealthMeta(item)}</RowMeta>
      </RowCopy>
      <Badge dot tone={getHealthTone(item.health.severity)}>
        {item.health.label}
      </Badge>
    </ListRow>
  );
}

function buildHealthMeta(item: DatabaseHealthPanelItem) {
  const bindingLabel = item.bindingCount === 1 ? 'binding' : 'bindings';
  return `${formatLabel(item.engine)} · ${formatLabel(item.status)} · ${item.bindingCount.toLocaleString()} ${bindingLabel}`;
}

function getHealthTone(severity: string): ToneName {
  if (severity === 'healthy') return 'healthy';
  if (severity === 'degraded' || severity === 'warning') return 'warn';
  if (severity === 'critical' || severity === 'incident') return 'incident';
  if (severity === 'unknown') return 'draft';

  return 'info';
}
