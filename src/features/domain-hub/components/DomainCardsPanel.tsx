import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Badge, IconTile, Metric } from '@/components/workspace';
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
  description:
    'Review workspace DNS resources, certificate progress, and route connection state before opening or binding a domain.',
  empty: 'No domains match the selected view.',
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
      description={panelCopy.description}
      emptyCopy={panelCopy.empty}
      hub="domain"
      icon={<ApartmentRoundedIcon sx={{ fontSize: 14 }} />}
      isEmpty={domains.length === 0}
      isLoading={isLoading}
      label={panelCopy.label}
      resultCopy={buildResultCopy(activeStatus, domains.length, loadedCount, total)}
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
  const description = domain.description.trim() || 'No description provided';

  return (
    <ResourceCardRoot cardMinHeight={260} hub="domain">
      <ResourceCardTop>
        <Box minWidth={0}>
          <ResourceStatusRow>
            <Badge dot tone={getDomainTone(domain.status)}>
              {getStatusLabel(domain.status)}
            </Badge>
            <KindPill>{formatLabel(domain.kind)} DNS</KindPill>
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

      <BoundProjectBlock>
        <BlockLabel>Bound Project</BlockLabel>
        <ResourceInfoCard>
          <ResourceInfoBadge hub="domain" tileSize={30}>
            {getProjectInitials(domain.boundProject?.name)}
          </ResourceInfoBadge>
          <ResourceInfoText
            meta={domain.boundProject?.type ?? 'Bind a project when the domain is ready.'}
            title={domain.boundProject?.name ?? 'No project bound'}
          />
        </ResourceInfoCard>
      </BoundProjectBlock>

      <ResourceCardFooter>
        <Button disabled size="small" startIcon={<HubRoundedIcon />} variant="outlined">
          Bind project
        </Button>
        <Button disabled size="small" startIcon={<OpenInNewRoundedIcon />} variant="contained">
          Open
        </Button>
      </ResourceCardFooter>
    </ResourceCardRoot>
  );
}

function buildResultCopy(
  activeStatus: DomainStatusFilter,
  visibleCount: number,
  loadedCount: number,
  total?: number,
) {
  const totalCopy = typeof total === 'number' ? `${total.toLocaleString()} total` : 'total unknown';
  const loadedCopy = `${loadedCount.toLocaleString()} loaded`;

  if (activeStatus === 'all') return `${loadedCopy} · ${totalCopy}`;

  return `${visibleCount.toLocaleString()} ${getStatusLabel(activeStatus).toLowerCase()} · ${loadedCopy}`;
}

function getCertificateCopy(status: string, expiresAt: string | null) {
  if (status === 'pending') return 'Certificate pending';
  if (status === 'issued' && expiresAt) return `Valid until ${formatDate(expiresAt)}`;
  if (status === 'issued') return 'Certificate issued';
  if (status === 'expired') return 'Certificate expired';
  if (status === 'none') return 'No certificate';

  return `${formatLabel(status)} certificate`;
}

function getConnectionCopy(status: string) {
  if (status === 'none') return 'No route connected';
  if (status === 'ready') return 'Route ready';
  if (status === 'connected') return 'Route connected';

  return `${formatLabel(status)} route`;
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
  if (status === 'review') return 'In Review';

  return formatLabel(status);
}
