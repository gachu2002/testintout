import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded';
import { Box, Skeleton, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

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
  Title,
} from '@/components/workspace';
import { databaseHubSectionStatus } from '@/features/database-hub/sectionStatus';
import type { DatabaseHealthPanel, DatabaseHealthPanelItem } from '@/features/database-hub/types';
import type { ToneName } from '@/styles/tokens';

const railCopy = {
  description:
    '세부 이상 감지는 K8s/infra 이벤트 기준으로 확인합니다. 우측 레일은 지금 실행 중인 데이터 리소스의 헬시 상태만 보여줍니다.',
  empty: 'No database health rows are available.',
  label: 'Running Health',
  snapshotLabel: 'live snapshot',
  summaryCaption: '현재 모니터링 중인 리소스',
  title: '현재 Running 리소스 Healthy',
};

const overviewStats = [
  { key: 'healthy', label: 'Healthy' },
  { key: 'degraded', label: 'Needs Action' },
  { key: 'unknown', label: 'Unknown' },
] as const;

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
          <HealthOverview summary={panel.summary} />
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

function HealthOverview({ summary }: { summary: DatabaseHealthPanel['summary'] }) {
  return (
    <OverviewCard>
      <OverviewTop>
        <Box>
          <OverviewValue>{summary.total.toLocaleString()}</OverviewValue>
          <OverviewCaption>{railCopy.summaryCaption}</OverviewCaption>
        </Box>
        <Badge tone="info">{railCopy.snapshotLabel}</Badge>
      </OverviewTop>
      <OverviewGrid>
        {overviewStats.map((item) => (
          <OverviewStat key={item.key}>
            <OverviewStatLabel>{item.label}</OverviewStatLabel>
            <OverviewStatNumber>{summary[item.key].toLocaleString()}</OverviewStatNumber>
          </OverviewStat>
        ))}
      </OverviewGrid>
    </OverviewCard>
  );
}

function HealthRow({ item }: { item: DatabaseHealthPanelItem }) {
  return (
    <ListRow center compact>
      <RowCopy>
        <RowTitle noWrap>{item.name}</RowTitle>
        <RowMeta>{item.health.message}</RowMeta>
      </RowCopy>
      <Badge dot tone={getHealthTone(item.health.severity)}>
        {item.health.label}
      </Badge>
    </ListRow>
  );
}

function getHealthTone(severity: string): ToneName {
  if (severity === 'healthy') return 'healthy';
  if (severity === 'degraded' || severity === 'warning') return 'warn';
  if (severity === 'critical' || severity === 'incident') return 'incident';
  if (severity === 'unknown') return 'draft';

  return 'info';
}

const OverviewCard = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.default, 0.88),
  border: `1px solid ${alpha(theme.workspace.colors.borderStrong, 0.68)}`,
  borderRadius: 16,
  display: 'grid',
  gap: theme.spacing(1.25),
  marginBottom: theme.spacing(1.25),
  padding: theme.spacing(1.75),
}));

const OverviewTop = styled(Box)(({ theme }) => ({
  alignItems: 'flex-start',
  display: 'flex',
  gap: theme.spacing(1),
  justifyContent: 'space-between',
}));

const OverviewValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 26,
  fontWeight: theme.workspace.typography.weights.extraBold,
  letterSpacing: '-0.06em',
  lineHeight: 1,
}));

const OverviewCaption = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: 11,
  fontWeight: theme.workspace.typography.weights.bold,
  lineHeight: 1.5,
  marginTop: theme.spacing(0.5),
}));

const OverviewGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1),
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
}));

const OverviewStat = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.96),
  border: `1px solid ${alpha(theme.workspace.colors.borderStrong, 0.58)}`,
  borderRadius: 12,
  padding: theme.spacing(1.25),
}));

const OverviewStatLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: 10,
  fontWeight: theme.workspace.typography.weights.extraBold,
  letterSpacing: '0.06em',
  lineHeight: 1.3,
  textTransform: 'uppercase',
}));

const OverviewStatNumber = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 15,
  fontWeight: theme.workspace.typography.weights.extraBold,
  letterSpacing: '-0.03em',
  lineHeight: 1.2,
  marginTop: theme.spacing(0.75),
}));
