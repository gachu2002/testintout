import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Badge, IconTile, Meter, Metric } from '@/components/workspace';
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
import { bucketHubSectionStatus } from '@/features/bucket-hub/sectionStatus';
import type { BucketFilterValue, BucketResource } from '@/features/bucket-hub/types';
import {
  clampPercent,
  formatPercent,
  getBucketIconBackground,
  getBucketStatusLabel,
  getBucketTone,
  getBucketTypeLabel,
  getInitials,
} from '@/features/bucket-hub/utils/format';

const panelCopy = {
  description:
    '워크스페이스에서 운영 중인 버킷 리소스를 한곳에 모았습니다. 버킷 종류, 소유자, 용량 사용량을 보고 세부 작업 전 상태를 확인합니다.',
  empty: '선택한 필터에 맞는 버킷이 없습니다.',
  label: 'Bucket Fleet',
  title: 'Buckets',
};

const TypePill = styled('span')(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: 10,
  fontWeight: 700,
}));

const UsageBlock = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1.75),
}));

const UsageHead = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  gap: theme.spacing(1),
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1),
}));

const BlockLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: 11,
  fontWeight: 800,
  letterSpacing: '.08em',
  marginBottom: theme.spacing(1),
  textTransform: 'uppercase',
}));

const UsageValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 18,
  fontWeight: 800,
  letterSpacing: '-.03em',
}));

const DetailBlock = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1.75),
}));

export function BucketCardsPanel({
  activeFilter,
  buckets,
  isLoading,
  loadedCount,
  total,
}: {
  activeFilter: BucketFilterValue;
  buckets: BucketResource[];
  isLoading: boolean;
  loadedCount: number;
  total?: number;
}) {
  return (
    <WorkspaceResourceCardsPanel
      description={panelCopy.description}
      emptyCopy={panelCopy.empty}
      hub="buckets"
      icon={<FolderRoundedIcon sx={{ fontSize: 14 }} />}
      isEmpty={buckets.length === 0}
      isLoading={isLoading}
      label={panelCopy.label}
      resultCopy={buildResultCopy(activeFilter, buckets.length, loadedCount, total)}
      status={bucketHubSectionStatus.cards}
      title={panelCopy.title}
    >
      {buckets.map((bucket) => (
        <BucketCard bucket={bucket} key={bucket.id} />
      ))}
    </WorkspaceResourceCardsPanel>
  );
}

function BucketCard({ bucket }: { bucket: BucketResource }) {
  const usagePercent = clampPercent(bucket.usage.usagePercent);

  return (
    <ResourceCardRoot hub="buckets">
      <ResourceCardTop>
        <Box minWidth={0}>
          <ResourceStatusRow>
            <Badge dot tone={getBucketTone(bucket.status)}>
              {getBucketStatusLabel(bucket.status)}
            </Badge>
            <TypePill>{getBucketTypeLabel(bucket.type)} Bucket</TypePill>
          </ResourceStatusRow>
          <ResourceNameRow>
            <IconTile tileBackground={getBucketIconBackground(bucket.type)} tileSize={42}>
              <FolderRoundedIcon sx={{ fontSize: 20 }} />
            </IconTile>
            <Box minWidth={0}>
              <ResourceName>{bucket.name}</ResourceName>
              <ResourceMeta>
                Owner {bucket.owner.displayName} · {bucket.capacity.label} quota
              </ResourceMeta>
            </Box>
          </ResourceNameRow>
        </Box>
        <ResourceMenuIcon />
      </ResourceCardTop>

      <ResourceMetricList>
        <Metric>
          <StorageRoundedIcon />
          {bucket.capacity.label} capacity
        </Metric>
        <Metric>
          <HubRoundedIcon />
          {bucket.usage.label} used
        </Metric>
        <Metric>
          <LinkRoundedIcon />
          {bucket.boundProjectCount.toLocaleString()} bound projects
        </Metric>
        <Metric>
          <GroupsRoundedIcon />
          {buildCollaboratorCopy(bucket.collaborators.length)}
        </Metric>
      </ResourceMetricList>

      <UsageBlock>
        <UsageHead>
          <BlockLabel sx={{ mb: 0 }}>Usage</BlockLabel>
          <UsageValue>{formatPercent(bucket.usage.usagePercent)}</UsageValue>
        </UsageHead>
        <Meter
          aria-label={`${bucket.name} usage`}
          fill="linear-gradient(90deg,#0f766e,#2dd4bf)"
          value={usagePercent}
          variant="determinate"
        />
        <Typography color="text.disabled" fontSize={10} lineHeight={1.4} mt={0.75}>
          {bucket.usage.label} of {bucket.capacity.label} accepted capacity label
        </Typography>
      </UsageBlock>

      <DetailBlock>
        <BlockLabel>Owner</BlockLabel>
        <ResourceInfoCard>
          <ResourceInfoBadge hub="buckets" tileSize={30}>
            {getInitials(bucket.owner.displayName)}
          </ResourceInfoBadge>
          <ResourceInfoText meta={bucket.owner.email} title={bucket.owner.displayName} />
        </ResourceInfoCard>
      </DetailBlock>

      <ResourceCardFooter>
        <Button disabled size="small" startIcon={<LinkRoundedIcon />} variant="outlined">
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
  activeFilter: BucketFilterValue,
  visibleCount: number,
  loadedCount: number,
  total?: number,
) {
  const totalCopy = typeof total === 'number' ? `${total.toLocaleString()} total` : 'total unknown';
  const loadedCopy = `${loadedCount.toLocaleString()} loaded`;

  if (activeFilter === 'all') return `${loadedCopy} · ${totalCopy}`;

  return `${visibleCount.toLocaleString()} visible · ${loadedCopy}`;
}

function buildCollaboratorCopy(count: number) {
  if (count === 0) return 'No collaborators';
  if (count === 1) return '1 collaborator';

  return `${count.toLocaleString()} collaborators`;
}
