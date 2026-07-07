import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Badge, buildResourceResultCopy, IconTile, Metric } from '@/components/workspace';
import {
  ResourceCardFooter,
  ResourceCardRoot,
  ResourceCardTop,
  ResourceInfoBadge,
  ResourceInfoCard,
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
import { domainHubSectionStatus } from '@/features/domain-hub/sectionStatus';
import type { DomainResource, DomainStatusFilter } from '@/features/domain-hub/types';
import { formatDate, formatLabel } from '@/lib/formatters';
import type { ToneName } from '@/styles/tokens';

const panelCopy = {
  empty: '조회 가능한 도메인이 없습니다. 권한 또는 바인딩 상태를 확인해 주세요.',
  label: 'DNS Fleet',
  title: 'Domains',
};

const KindPill = styled('span')(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: 10,
  fontWeight: 700,
}));

const BoundProjectBlock = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1.75),
}));

const FooterNote = styled(Typography)(({ theme }) => ({
  alignItems: 'center',
  color: theme.palette.text.disabled,
  display: 'inline-flex',
  fontSize: 11,
  fontWeight: 800,
  gap: theme.spacing(0.5),
  marginRight: 'auto',
}));

const BlockLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: 11,
  fontWeight: 800,
  letterSpacing: '.08em',
  marginBottom: theme.spacing(1),
  textTransform: 'uppercase',
}));

export function DomainCardsPanel({
  activeStatus,
  domains,
  isLoading,
  loadedCount,
  total,
}: {
  activeStatus: DomainStatusFilter;
  domains: DomainResource[];
  isLoading: boolean;
  loadedCount: number;
  total?: number;
}) {
  return (
    <WorkspaceResourceCardsPanel
      description={buildResourceDescription(total ?? loadedCount)}
      emptyCopy={panelCopy.empty}
      hub="domain"
      icon={<ApartmentRoundedIcon sx={{ fontSize: 14 }} />}
      isEmpty={domains.length === 0}
      isLoading={isLoading}
      label={panelCopy.label}
      resultCopy={buildResourceResultCopy({
        filterLabel: getStatusLabel(activeStatus).toLowerCase(),
        isDefault: activeStatus === 'all',
        loadedCount,
        total,
        visibleCount: domains.length,
      })}
      skeletonHeight={260}
      status={domainHubSectionStatus.cards}
      title={panelCopy.title}
    >
      {domains.map((domain) => (
        <DomainCard domain={domain} key={domain.id} />
      ))}
    </WorkspaceResourceCardsPanel>
  );
}

function DomainCard({ domain }: { domain: DomainResource }) {
  const iconBackground = getDomainIconBackground(domain.status);
  const description = domain.description.trim() || buildResourceMeta(domain);
  const boundProject = domain.boundProject;

  return (
    <ResourceCardRoot cardMinHeight={260} hub="domain">
      <ResourceCardTop>
        <Box minWidth={0}>
          <ResourceStatusRow>
            <Badge dot tone={getDomainTone(domain.status)}>
              {getStatusLabel(domain.status)}
            </Badge>
            <KindPill>{`${getKindLabel(domain.kind)} DNS · ${getConnectionStatusLabel(
              domain.connection.status,
            )} Route`}</KindPill>
          </ResourceStatusRow>
          <ResourceNameRow>
            <IconTile tileBackground={iconBackground} tileSize={42}>
              <ApartmentRoundedIcon sx={{ fontSize: 20 }} />
            </IconTile>
            <Box minWidth={0}>
              <ResourceName>{domain.name}</ResourceName>
              <ResourceMeta>{description}</ResourceMeta>
            </Box>
          </ResourceNameRow>
        </Box>
        <ResourceMenuIcon />
      </ResourceCardTop>

      <ResourceMetricList>
        <Metric>
          <ShieldRoundedIcon />
          {getCertificateCopy(domain.certificate.status, domain.certificate.expiresAt)}
        </Metric>
        <Metric>
          <LinkRoundedIcon />
          {getConnectionCopy(domain.connection.status)}
        </Metric>
      </ResourceMetricList>

      {boundProject ? (
        <BoundProjectBlock>
          <BlockLabel>Bound Project</BlockLabel>
          <ResourceInfoCard>
            <ResourceInfoBadge hub="domain" tileSize={30}>
              {getProjectInitials(boundProject.name)}
            </ResourceInfoBadge>
            <ResourceInfoText meta={boundProject.type ?? 'project'} title={boundProject.name} />
          </ResourceInfoCard>
        </BoundProjectBlock>
      ) : null}

      <ResourceCardFooter>
        <FooterNote>
          <ScheduleRoundedIcon sx={{ fontSize: 14 }} />
          {domain.capabilities.canEdit === false ? 'read-only' : 'api/v2/domains'}
        </FooterNote>
      </ResourceCardFooter>
    </ResourceCardRoot>
  );
}

function buildResourceDescription(total: number) {
  if (total <= 0) {
    return '조회 가능한 도메인이 없습니다. 권한 또는 바인딩 상태를 확인해 주세요.';
  }

  return `${total.toLocaleString()}개의 도메인 리소스를 실제 API 응답으로 렌더링합니다. 카드에서는 인증서 상태와 바인딩된 프로젝트를 바로 확인할 수 있습니다.`;
}

function buildResourceMeta(domain: DomainResource) {
  return [
    getCertificateCopy(domain.certificate.status, domain.certificate.expiresAt),
    getConnectionCopy(domain.connection.status),
  ]
    .filter(Boolean)
    .join(' · ');
}

function getCertificateCopy(status: string, expiresAt: string | null) {
  if (status === 'pending') return '인증서 발급 대기';
  if (status === 'issued' && expiresAt) return `인증서 유효 ${formatDate(expiresAt)}`;
  if (status === 'issued') return '인증서 유효';
  if (status === 'expired') return '인증서 만료';
  if (status === 'none') return '인증서 미등록';

  return `${formatLabel(status)} 인증서`;
}

function getConnectionCopy(status: string) {
  if (status === 'none') return '바인딩 전';
  if (status === 'ready') return '라우트 연결 준비 완료';
  if (status === 'connected') return '라우트 연결 완료';

  return `${formatLabel(status)} route`;
}

function getConnectionStatusLabel(status: string) {
  if (status === 'none') return 'None';
  if (status === 'ready') return 'Ready';
  if (status === 'connected') return 'Connected';

  return formatLabel(status);
}

function getKindLabel(kind: string) {
  if (kind === 'custom') return 'Custom';
  if (kind === 'managed') return 'Managed';
  if (kind === 'internal') return 'Internal';

  return formatLabel(kind || 'custom');
}

function getDomainIconBackground(status: string) {
  if (status === 'connected') return 'linear-gradient(135deg,#0f766e,#14b8a6)';
  if (status === 'pending') return 'linear-gradient(135deg,#f59e0b,#fbbf24)';
  if (status === 'review') return 'linear-gradient(135deg,#2563eb,#60a5fa)';

  return 'linear-gradient(135deg,#4f46e5,#60a5fa)';
}

function getDomainTone(status: string): ToneName {
  if (status === 'connected') return 'healthy';
  if (status === 'pending') return 'warn';
  if (status === 'review') return 'review';

  return 'info';
}

function getProjectInitials(name: string | undefined) {
  if (!name) return 'NA';

  return name
    .split(/[-_\s.]+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function getStatusLabel(status: string) {
  if (status === 'certificate') return '인증서';
  if (status === 'review') return 'Review';
  if (status === 'pending') return 'Pending';
  if (status === 'connected') return 'Connected';

  return formatLabel(status);
}
