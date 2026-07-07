import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
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
  DomainCertificateDetail,
  DomainCertificatePanel,
  DomainResource,
} from '@/features/domain-hub/types';
import { formatDate, formatLabel } from '@/lib/formatters';
import type { ToneName } from '@/styles/tokens';

const railCopy = {
  label: 'Certificate Status',
  title: '현재 인증서 상태',
};

const certificateStatusOrder: Record<string, number> = {
  expired: 0,
  pending: 1,
  issued: 2,
  none: 3,
};

export function DomainCertificateRail({
  detail,
  domains,
  isDetailLoading,
  isPanelLoading,
  panel,
}: {
  detail?: DomainCertificateDetail;
  domains: DomainResource[];
  isDetailLoading: boolean;
  isPanelLoading: boolean;
  panel?: DomainCertificatePanel;
}) {
  const isLoading = isPanelLoading || isDetailLoading;
  const rows = buildCertificateRows(domains, detail);

  return (
    <Panel hub="domain">
      <Kicker sx={{ mb: 1.75 }}>
        <VerifiedUserRoundedIcon sx={{ fontSize: 14 }} />
        {railCopy.label}
        <SectionStatusBadge status={domainHubSectionStatus.certificateRail} />
      </Kicker>
      <Head>
        <HeadCopy>
          {isPanelLoading ? <Skeleton height={28} width={210} /> : <Title>{railCopy.title}</Title>}
          {isPanelLoading ? (
            <Skeleton height={42} width="100%" />
          ) : (
            <Desc>{buildCertificatePanelDescription(panel)}</Desc>
          )}
        </HeadCopy>
      </Head>

      {isLoading ? (
        <RowSkeletons count={4} height={66} />
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
        <Empty>인증서가 등록된 도메인이 아직 없습니다.</Empty>
      )}
    </Panel>
  );
}

function buildCertificatePanelDescription(panel: DomainCertificatePanel | undefined) {
  const total = panel?.total ?? 0;
  const summary = (panel?.items ?? [])
    .filter((item) => item.count > 0)
    .map((item) => `${getCertificateStatusLabel(item.status)} ${item.count.toLocaleString()}`)
    .join(' · ');

  return total > 0
    ? `총 ${total.toLocaleString()}개 도메인 기준 ${summary || '상태 정보 없음'}`
    : '인증서 상태를 확인할 수 있는 도메인이 없습니다.';
}

function buildCertificateRows(
  domains: DomainResource[],
  detail: DomainCertificateDetail | undefined,
) {
  const detailRow = detail ? buildCertificateRowFromDetail(detail) : null;
  const detailId = detail?.id ?? '';
  const domainRows = domains
    .filter((domain) => domain.certificate.status !== 'none')
    .sort(
      (left, right) =>
        (certificateStatusOrder[left.certificate.status] ?? 99) -
        (certificateStatusOrder[right.certificate.status] ?? 99),
    )
    .filter((domain) => domain.id !== detailId)
    .map((domain) => ({
      meta: buildCertificateSummary(domain.certificate.status, domain.certificate.expiresAt),
      pill: {
        label: getCertificateStatusLabel(domain.certificate.status),
        tone: getCertificateTone(domain.certificate.status),
      },
      title: domain.name || '도메인 정보 없음',
    }));

  const rows = [detailRow, ...domainRows].filter((row): row is CertificateRailRow => Boolean(row));

  if (rows.length > 0) {
    return rows.slice(0, 4);
  }

  return [
    {
      meta: '인증서가 등록된 도메인이 아직 없습니다.',
      pill: { label: 'Empty', tone: 'draft' as const },
      title: '표시할 인증서 상태가 없습니다.',
    },
  ];
}

function buildCertificateRowFromDetail(detail: DomainCertificateDetail): CertificateRailRow {
  return {
    meta: buildCertificateSummary(detail.status, detail.expiresAt),
    pill: {
      label: getCertificateStatusLabel(detail.status),
      tone: getCertificateTone(detail.status),
    },
    title: detail.name || '도메인 정보 없음',
  };
}

function buildCertificateSummary(status: string, expiresAt: string | null) {
  if (status === 'issued' && expiresAt) return `인증서 유효 ${formatDate(expiresAt)}`;
  if (status === 'expired') return '인증서 만료';
  if (status === 'pending') return '인증서 발급 대기';
  if (status === 'none') return '인증서 미등록';

  return formatLabel(status);
}

function getCertificateStatusLabel(status: string) {
  if (status === 'none') return 'None';
  if (status === 'pending') return 'Pending';
  if (status === 'issued') return 'Valid';
  if (status === 'expired') return 'Expired';

  return formatLabel(status);
}

function getCertificateTone(status: string): ToneName {
  if (status === 'none') return 'draft';
  if (status === 'pending') return 'pending';
  if (status === 'issued') return 'healthy';
  if (status === 'expired') return 'warn';

  return 'info';
}

type CertificateRailRow = {
  meta: string;
  pill: {
    label: string;
    tone: ToneName;
  };
  title: string;
};
