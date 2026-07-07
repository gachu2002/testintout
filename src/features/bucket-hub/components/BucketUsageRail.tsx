import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
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
  WorkspaceUsageMeter,
} from '@/components/workspace';
import { bucketHubSectionStatus } from '@/features/bucket-hub/sectionStatus';
import type { BucketUsagePanel, BucketUsagePanelItem } from '@/features/bucket-hub/types';
import { formatBytes, formatPercent } from '@/features/bucket-hub/utils/format';
import type { ToneName } from '@/styles/tokens';

const railCopy = {
  description: '우측 레일은 주요 버킷의 사용량과 점유율을 간단히 보여줍니다.',
  empty: 'No bucket usage summary is available.',
  label: 'Bucket Usage',
  summaryLabel: 'Usage summary',
  title: '현재 주요 버킷 사용량',
};

export function BucketUsageRail({
  isLoading,
  panel,
}: {
  isLoading: boolean;
  panel?: BucketUsagePanel;
}) {
  const items = panel?.items ?? [];

  return (
    <Panel hub="buckets">
      <Kicker sx={{ mb: 1.75 }}>
        <StorageRoundedIcon sx={{ fontSize: 14 }} />
        {railCopy.label}
        <SectionStatusBadge status={bucketHubSectionStatus.usageRail} />
      </Kicker>
      <Head>
        <HeadCopy>
          {isLoading ? <Skeleton height={28} width={210} /> : <Title>{railCopy.title}</Title>}
          {isLoading ? <Skeleton height={42} width="100%" /> : <Desc>{railCopy.description}</Desc>}
        </HeadCopy>
      </Head>

      {isLoading ? (
        <RowSkeletons count={5} height={78} />
      ) : panel && items.length > 0 ? (
        <Box>
          <SummaryHeader>
            <SummaryLabel>{railCopy.summaryLabel}</SummaryLabel>
            <SummaryValue hub="buckets">
              {formatBytes(panel.summary.usedBytes)} / {formatBytes(panel.summary.quotaBytes)}
            </SummaryValue>
          </SummaryHeader>
          <RowList dense>
            {items.map((item) => (
              <UsageRow item={item} key={item.id} />
            ))}
          </RowList>
        </Box>
      ) : (
        <Empty>{railCopy.empty}</Empty>
      )}
    </Panel>
  );
}

function UsageRow({ item }: { item: BucketUsagePanelItem }) {
  return (
    <ListRow center compact>
      <RowCopy sx={{ flex: 1 }}>
        <RowTitle noWrap>{item.name}</RowTitle>
        <RowMeta>
          {formatBytes(item.usedBytes)} used · {formatBytes(item.quotaBytes)} quota
        </RowMeta>
        <WorkspaceUsageMeter
          fill="linear-gradient(90deg,#0f766e,#2dd4bf)"
          label={`${item.name} usage`}
          value={item.usagePercent}
        />
      </RowCopy>
      <Badge tone={getUsageTone(item.usagePercent)}>{formatPercent(item.usagePercent)}</Badge>
    </ListRow>
  );
}

function getUsageTone(usagePercent: number): ToneName {
  if (usagePercent >= 80) return 'warn';
  if (usagePercent >= 60) return 'review';
  if (usagePercent > 0) return 'info';

  return 'healthy';
}
