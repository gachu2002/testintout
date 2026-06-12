import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import { Box, Skeleton } from '@mui/material';

import { SectionStatusBadge } from '@/components/reference-status';
import {
  Badge,
  Desc,
  DetailGroup,
  Empty,
  FooterLink,
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
import { routes } from '@/config/routes';
import { domainHubSectionStatus } from '@/features/domain-hub/sectionStatus';
import type {
  DomainCertificateDetail,
  DomainCertificatePanel,
  DomainCertificateStatus,
} from '@/features/domain-hub/types';
import { formatDate, formatLabel } from '@/lib/formatters';
import type { ToneName } from '@/styles/tokens';

const railCopy = {
  description: '우측 레일은 인증서 상태와 갱신/발급 진행 정도만 간단히 보여줍니다.',
  emptyDetail: 'No selected domain certificate is available.',
  emptySummary: 'No certificate summary is available.',
  footerLabel: '승인/예외 보기',
  label: 'Certificate Status',
  selectedLabel: 'Selected domain',
  summaryLabel: 'Certificate summary',
  title: '현재 인증서 상태',
};

export function DomainCertificateRail({
  detail,
  isDetailLoading,
  isPanelLoading,
  panel,
}: {
  detail?: DomainCertificateDetail;
  isDetailLoading: boolean;
  isPanelLoading: boolean;
  panel?: DomainCertificatePanel;
}) {
  const items = panel?.items ?? [];

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
            <Desc>{railCopy.description}</Desc>
          )}
        </HeadCopy>
      </Head>

      {isPanelLoading ? (
        <RowSkeletons count={4} height={66} />
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
                  <RowTitle noWrap>{getCertificateStatusLabel(item.status)}</RowTitle>
                  <RowMeta>{buildSummaryMeta(item.status, item.count)}</RowMeta>
                </RowCopy>
                <Badge dot tone={getCertificateTone(item.status)}>
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
              <RowMeta>{buildDetailMeta(detail.status, detail.expiresAt)}</RowMeta>
            </RowCopy>
            <Badge dot tone={getCertificateTone(detail.status)}>
              {getCertificateStatusLabel(detail.status)}
            </Badge>
          </ListRow>
        ) : (
          <Empty>{railCopy.emptyDetail}</Empty>
        )}
      </DetailGroup>

      <FooterLink href={routes.permissions} hub="domain">
        {railCopy.footerLabel}
        <ChevronRightRoundedIcon sx={{ fontSize: 14 }} />
      </FooterLink>
    </Panel>
  );
}

function buildSummaryMeta(status: DomainCertificateStatus, count: number) {
  const label = count === 1 ? 'domain' : 'domains';

  if (status === 'none') return `${count.toLocaleString()} ${label} without a certificate`;
  if (status === 'pending') return `${count.toLocaleString()} ${label} waiting for issuance`;
  if (status === 'issued') return `${count.toLocaleString()} ${label} with issued certificates`;
  if (status === 'expired') return `${count.toLocaleString()} ${label} with expired certificates`;

  return `${count.toLocaleString()} ${label}`;
}

function buildDetailMeta(status: DomainCertificateStatus, expiresAt: string | null) {
  if (status === 'none') return 'SSL 미연결 · certificate request 전';
  if (status === 'pending') return 'certificate request pending';
  if (status === 'issued' && expiresAt) return `valid until ${formatDate(expiresAt)}`;
  if (status === 'issued') return 'certificate issued';
  if (status === 'expired' && expiresAt) return `expired ${formatDate(expiresAt)}`;
  if (status === 'expired') return 'certificate expired';

  return formatLabel(status);
}

function getCertificateStatusLabel(status: DomainCertificateStatus) {
  if (status === 'none') return 'None';
  if (status === 'pending') return 'Pending';
  if (status === 'issued') return 'Issued';
  if (status === 'expired') return 'Expired';

  return formatLabel(status);
}

function getCertificateTone(status: DomainCertificateStatus): ToneName {
  if (status === 'none') return 'draft';
  if (status === 'pending') return 'pending';
  if (status === 'issued') return 'healthy';
  if (status === 'expired') return 'incident';

  return 'info';
}
