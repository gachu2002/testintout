import CableRoundedIcon from '@mui/icons-material/CableRounded';
import { Skeleton } from '@mui/material';

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
import { domainHubSectionStatus } from '@/features/domain-hub/sectionStatus';
import type {
  DomainConnectionDetail,
  DomainConnectionPanel,
  DomainResource,
} from '@/features/domain-hub/types';
import { formatLabel } from '@/lib/formatters';
import type { ToneName } from '@/styles/tokens';

const railCopy = {
  label: 'Connection Status',
  title: '현재 커넥션 상태',
};

const connectionStatusOrder: Record<string, number> = {
  ready: 0,
  connected: 1,
  none: 2,
};

export function DomainConnectionRail({
  detail,
  domains,
  isDetailLoading,
  isPanelLoading,
  panel,
}: {
  detail?: DomainConnectionDetail;
  domains: DomainResource[];
  isDetailLoading: boolean;
  isPanelLoading: boolean;
  panel?: DomainConnectionPanel;
}) {
  const isLoading = isPanelLoading || isDetailLoading;
  const rows = buildConnectionRows(domains, detail);

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
            <Desc>{buildConnectionPanelDescription(panel)}</Desc>
          )}
        </HeadCopy>
      </Head>

      {isLoading ? (
        <RowSkeletons count={3} height={66} />
      ) : rows.length > 0 ? (
        <RowList dense>
          {rows.map((row, index) => (
            <ListRow center compact key={`${row.title}-${row.pill.label}-${index}`}>
              <RowCopy>
                <RowTitle noWrap>{row.title}</RowTitle>
                <RowMeta>{row.meta}</RowMeta>
              </RowCopy>
              <Badge dot tone={row.pill.tone}>
                {row.pill.label}
              </Badge>
            </ListRow>
          ))}
        </RowList>
      ) : (
        <Empty>프로젝트와 연결된 도메인이 아직 없습니다.</Empty>
      )}
    </Panel>
  );
}

function buildConnectionPanelDescription(panel: DomainConnectionPanel | undefined) {
  const total = panel?.total ?? 0;
  const summary = (panel?.items ?? [])
    .filter((item) => item.count > 0)
    .map((item) => `${getConnectionStatusLabel(item.status)} ${item.count.toLocaleString()}`)
    .join(' · ');

  return total > 0
    ? `총 ${total.toLocaleString()}개 도메인 기준 ${summary || '상태 정보 없음'}`
    : '커넥션 상태를 확인할 수 있는 도메인이 없습니다.';
}

function buildConnectionRows(
  domains: DomainResource[],
  detail: DomainConnectionDetail | undefined,
) {
  const detailRow = detail ? buildConnectionRowFromDetail(detail) : null;
  const detailId = detail?.id ?? '';
  const domainRows = domains
    .filter((domain) => domain.connection.status !== 'none')
    .sort(
      (left, right) =>
        (connectionStatusOrder[left.connection.status] ?? 99) -
        (connectionStatusOrder[right.connection.status] ?? 99),
    )
    .filter((domain) => domain.id !== detailId)
    .map((domain) => ({
      meta: buildConnectionSummary(domain.connection.status, domain.boundProject),
      pill: {
        label: getConnectionStatusLabel(domain.connection.status),
        tone: getConnectionTone(domain.connection.status),
      },
      title: domain.name || '도메인 정보 없음',
    }));

  const rows = [detailRow, ...domainRows].filter((row): row is ConnectionRailRow => Boolean(row));

  if (rows.length > 0) {
    return rows.slice(0, 4);
  }

  return [
    {
      meta: '프로젝트와 연결된 도메인이 아직 없습니다.',
      pill: { label: 'Empty', tone: 'draft' as const },
      title: '표시할 커넥션 상태가 없습니다.',
    },
  ];
}

function buildConnectionRowFromDetail(detail: DomainConnectionDetail): ConnectionRailRow {
  return {
    meta: buildConnectionSummary(detail.status, detail.boundProject),
    pill: {
      label: getConnectionStatusLabel(detail.status),
      tone: getConnectionTone(detail.status),
    },
    title: detail.name || '도메인 정보 없음',
  };
}

function buildConnectionSummary(
  status: string,
  boundProject: DomainResource['boundProject'] | DomainConnectionDetail['boundProject'],
) {
  const projectLabel = boundProject?.name;
  if (status === 'connected') {
    return projectLabel ? `${projectLabel} 연결 완료` : '라우트 연결 완료';
  }
  if (status === 'ready') {
    return projectLabel ? `${projectLabel} 연결 준비 완료` : '라우트 연결 준비 완료';
  }
  if (status === 'none') return '바인딩 전';

  return formatLabel(status);
}

function getConnectionStatusLabel(status: string) {
  if (status === 'none') return 'None';
  if (status === 'ready') return 'Ready';
  if (status === 'connected') return 'Connected';

  return formatLabel(status);
}

function getConnectionTone(status: string): ToneName {
  if (status === 'none') return 'draft';
  if (status === 'ready') return 'review';
  if (status === 'connected') return 'healthy';

  return 'info';
}

type ConnectionRailRow = {
  meta: string;
  pill: {
    label: string;
    tone: ToneName;
  };
  title: string;
};
