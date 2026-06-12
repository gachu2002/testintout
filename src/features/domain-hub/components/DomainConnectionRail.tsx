import CableRoundedIcon from '@mui/icons-material/CableRounded';
import { Box, Skeleton } from '@mui/material';

import { SectionStatusBadge } from '@/components/reference-status';
import {
  Badge,
  Desc,
  DetailGroup,
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
import { domainHubSectionStatus } from '@/features/domain-hub/sectionStatus';
import type {
  DomainConnectionDetail,
  DomainConnectionPanel,
  DomainConnectionStatus,
} from '@/features/domain-hub/types';
import { formatLabel } from '@/lib/formatters';
import type { ToneName } from '@/styles/tokens';

const railCopy = {
  description: '실제 ingress, ELB, CDN 연결 여부만 빠르게 읽을 수 있도록 분리했습니다.',
  emptyDetail: 'No selected domain connection is available.',
  emptySummary: 'No connection summary is available.',
  label: 'Connection Status',
  selectedLabel: 'Selected domain',
  summaryLabel: 'Connection summary',
  title: '현재 커넥션 상태',
};

export function DomainConnectionRail({
  detail,
  isDetailLoading,
  isPanelLoading,
  panel,
}: {
  detail?: DomainConnectionDetail;
  isDetailLoading: boolean;
  isPanelLoading: boolean;
  panel?: DomainConnectionPanel;
}) {
  const items = panel?.items ?? [];

  return (
    <Panel hub="domain">
      <Kicker sx={{ mb: 1.75 }}>
        <CableRoundedIcon sx={{ fontSize: 14 }} />
        {railCopy.label}
        <SectionStatusBadge status={domainHubSectionStatus.connectionRail} />
      </Kicker>
      <Head>
        <HeadCopy>
          {isPanelLoading ? <Skeleton height={28} width={210} /> : <Title>{railCopy.title}</Title>}
          {isPanelLoading ? (
            <Skeleton height={42} width="100%" />
          ) : (
            <Desc>{railCopy.description}</Desc>
          )}
        </HeadCopy>
      </Head>

      {isPanelLoading ? (
        <RowSkeletons count={3} height={66} />
      ) : panel && items.length > 0 ? (
        <Box>
          <SummaryHeader>
            <SummaryLabel>{railCopy.summaryLabel}</SummaryLabel>
            <SummaryValue hub="domain">{panel.total.toLocaleString()} total</SummaryValue>
          </SummaryHeader>
          <RowList dense>
            {items.map((item) => (
              <ListRow center compact key={item.status}>
                <RowCopy>
                  <RowTitle noWrap>{getConnectionStatusLabel(item.status)}</RowTitle>
                  <RowMeta>{buildSummaryMeta(item.status, item.count)}</RowMeta>
                </RowCopy>
                <Badge dot tone={getConnectionTone(item.status)}>
                  {item.count.toLocaleString()}
                </Badge>
              </ListRow>
            ))}
          </RowList>
        </Box>
      ) : (
        <Empty>{railCopy.emptySummary}</Empty>
      )}

      <DetailGroup>
        <SummaryHeader>
          <SummaryLabel>{railCopy.selectedLabel}</SummaryLabel>
        </SummaryHeader>
        {isDetailLoading ? (
          <Skeleton height={72} sx={{ borderRadius: '16px' }} variant="rounded" />
        ) : detail ? (
          <ListRow center compact>
            <RowCopy>
              <RowTitle noWrap>{detail.name}</RowTitle>
              <RowMeta>{buildDetailMeta(detail)}</RowMeta>
            </RowCopy>
            <Badge dot tone={getConnectionTone(detail.status)}>
              {getConnectionStatusLabel(detail.status)}
            </Badge>
          </ListRow>
        ) : (
          <Empty>{railCopy.emptyDetail}</Empty>
        )}
      </DetailGroup>
    </Panel>
  );
}

function buildSummaryMeta(status: DomainConnectionStatus, count: number) {
  const label = count === 1 ? 'domain' : 'domains';

  if (status === 'none') return `${count.toLocaleString()} ${label} without a connection`;
  if (status === 'ready') return `${count.toLocaleString()} ${label} ready to connect`;
  if (status === 'connected') return `${count.toLocaleString()} ${label} connected`;

  return `${count.toLocaleString()} ${label}`;
}

function buildDetailMeta(detail: DomainConnectionDetail) {
  if (detail.boundProject === null) return 'No bound project';
  if (detail.status === 'none') return 'No connection configured';
  if (detail.status === 'ready') return 'Connection ready';
  if (detail.status === 'connected') return 'Connection active';

  return formatLabel(detail.status);
}

function getConnectionStatusLabel(status: DomainConnectionStatus) {
  if (status === 'none') return 'None';
  if (status === 'ready') return 'Ready';
  if (status === 'connected') return 'Connected';

  return formatLabel(status);
}

function getConnectionTone(status: DomainConnectionStatus): ToneName {
  if (status === 'none') return 'draft';
  if (status === 'ready') return 'review';
  if (status === 'connected') return 'healthy';

  return 'info';
}
