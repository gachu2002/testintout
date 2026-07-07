import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { ReactNode } from 'react';

import {
  Badge,
  buildResourceResultCopy,
  IconTile,
  Metric,
  WorkspaceUsageMeter,
} from '@/components/workspace';
import {
  ResourceCardFooter,
  ResourceCardRoot,
  ResourceCardTop,
  ResourceInfoBadge,
  ResourceInfoBlock,
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
import { databaseHubSectionStatus } from '@/features/database-hub/sectionStatus';
import type { DatabaseResource } from '@/features/database-hub/types';
import { formatLabel, getInitials } from '@/lib/formatters';
import type { ToneName } from '@/styles/tokens';

const panelCopy = {
  description:
    '워크스페이스에서 운영 중인 데이터베이스 리소스를 한곳에 모았습니다. 엔진, 연결 수, 상태와 용량을 보고 필요 시 후속 액션 계약을 연결합니다.',
  empty: '선택한 필터에 맞는 데이터베이스 리소스가 없습니다.',
  label: 'Database Fleet',
  title: 'Databases',
};

const EnginePill = styled('span')(({ theme }) => ({
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
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.75),
}));

const BlockLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: 11,
  fontWeight: 800,
  letterSpacing: '.08em',
  textTransform: 'uppercase',
}));

const UsageValue = styled(Typography)(({ theme }) => ({
  color: theme.workspace.hubThemes.database.brand,
  fontSize: 11,
  fontWeight: 800,
}));

export function DatabaseCardsPanel({
  activeEngine,
  databases,
  isLoading,
  loadedCount,
  total,
}: {
  activeEngine: string;
  databases: DatabaseResource[];
  isLoading: boolean;
  loadedCount: number;
  total?: number;
}) {
  return (
    <WorkspaceResourceCardsPanel
      description={panelCopy.description}
      emptyCopy={panelCopy.empty}
      hub="database"
      icon={<StorageRoundedIcon sx={{ fontSize: 14 }} />}
      isEmpty={databases.length === 0}
      isLoading={isLoading}
      label={panelCopy.label}
      resultCopy={buildResourceResultCopy({
        filterLabel: formatLabel(activeEngine).toLowerCase(),
        isDefault: activeEngine === 'all',
        loadedCount,
        total,
        visibleCount: databases.length,
      })}
      status={databaseHubSectionStatus.cards}
      title={panelCopy.title}
    >
      {databases.map((database) => (
        <DatabaseCard database={database} key={database.id} />
      ))}
    </WorkspaceResourceCardsPanel>
  );
}

function DatabaseCard({ database }: { database: DatabaseResource }) {
  const engineMeta = getEngineMeta(database.engine);
  const endpoint = database.endpoint
    ? `${database.endpoint.host}:${database.endpoint.port}`
    : 'No endpoint exposed';

  return (
    <ResourceCardRoot hub="database">
      <ResourceCardTop>
        <Box minWidth={0}>
          <ResourceStatusRow>
            <Badge dot tone={getStatusTone(database.status, database.health.severity)}>
              {getStatusLabel(database.status)}
            </Badge>
            <EnginePill>{engineMeta.label}</EnginePill>
          </ResourceStatusRow>
          <ResourceNameRow>
            <IconTile tileBackground={engineMeta.color} tileSize={42}>
              {engineMeta.icon}
            </IconTile>
            <Box minWidth={0}>
              <ResourceName>{database.name}</ResourceName>
              <ResourceMeta>{database.summary || `${engineMeta.label} database`}</ResourceMeta>
            </Box>
          </ResourceNameRow>
        </Box>
        <ResourceMenuIcon />
      </ResourceCardTop>

      <ResourceMetricList>
        <Metric>
          <StorageRoundedIcon />
          {database.version
            ? `${engineMeta.shortLabel} ${database.version}`
            : engineMeta.shortLabel}
        </Metric>
        <Metric>
          <LinkRoundedIcon />
          {database.bindingCount.toLocaleString()} bound
        </Metric>
        <Metric>
          <HealthAndSafetyRoundedIcon />
          {database.health.label}
        </Metric>
      </ResourceMetricList>

      <UsageBlock>
        <UsageHead>
          <BlockLabel>Storage Usage</BlockLabel>
          <UsageValue>{database.usage.storageLabel}</UsageValue>
        </UsageHead>
        <WorkspaceUsageMeter
          fill={engineMeta.color}
          label={`${database.name} storage usage`}
          value={database.usage.usagePercent}
        />
      </UsageBlock>

      <ResourceInfoBlock>
        <ResourceInfoCard>
          <ResourceInfoBadge hub="database" tileSize={30}>
            {getInitials(database.owner.displayName, 'OW')}
          </ResourceInfoBadge>
          <ResourceInfoText meta={database.owner.email} title={database.owner.displayName} />
        </ResourceInfoCard>
        <ResourceInfoCard>
          <ResourceInfoBadge tileBackground={engineMeta.color} tileSize={30}>
            EP
          </ResourceInfoBadge>
          <ResourceInfoText meta={endpoint} title="Endpoint" />
        </ResourceInfoCard>
      </ResourceInfoBlock>

      <ResourceCardFooter>
        <Button disabled size="small" startIcon={<OpenInNewRoundedIcon />} variant="outlined">
          Detail
        </Button>
        <Button disabled size="small" startIcon={<RestartAltRoundedIcon />} variant="contained">
          Restart
        </Button>
      </ResourceCardFooter>
    </ResourceCardRoot>
  );
}

function getEngineMeta(engine: string): {
  color: string;
  icon: ReactNode;
  label: string;
  shortLabel: string;
} {
  if (engine === 'milvus') {
    return {
      color: 'linear-gradient(135deg,#0f766e,#5eead4)',
      icon: <HubRoundedIcon sx={{ fontSize: 20 }} />,
      label: 'Vector DB · Milvus',
      shortLabel: 'Milvus',
    };
  }

  if (engine === 'mongo') {
    return {
      color: 'linear-gradient(135deg,#16a34a,#4ade80)',
      icon: <AccountTreeRoundedIcon sx={{ fontSize: 20 }} />,
      label: 'Document DB · MongoDB',
      shortLabel: 'MongoDB',
    };
  }

  if (engine === 'mysql') {
    return {
      color: 'linear-gradient(135deg,#0891b2,#22d3ee)',
      icon: <TableChartRoundedIcon sx={{ fontSize: 20 }} />,
      label: 'Relational DB · MariaDB',
      shortLabel: 'MariaDB',
    };
  }

  if (engine === 'postgres') {
    return {
      color: 'linear-gradient(135deg,#2563eb,#60a5fa)',
      icon: <StorageRoundedIcon sx={{ fontSize: 20 }} />,
      label: 'Relational DB · PostgreSQL',
      shortLabel: 'PostgreSQL',
    };
  }

  if (engine === 'redis') {
    return {
      color: 'linear-gradient(135deg,#f97316,#fb923c)',
      icon: <MemoryRoundedIcon sx={{ fontSize: 20 }} />,
      label: 'Cache DB · Redis',
      shortLabel: 'Redis',
    };
  }

  return {
    color: 'linear-gradient(135deg,#2563eb,#06b6d4)',
    icon: <DnsRoundedIcon sx={{ fontSize: 20 }} />,
    label: formatLabel(engine),
    shortLabel: formatLabel(engine),
  };
}

function getStatusTone(status: string, severity: string): ToneName {
  if (severity === 'healthy' || status === 'running') return 'healthy';
  if (severity === 'degraded' || severity === 'warning') return 'warn';
  if (severity === 'critical' || severity === 'incident') return 'incident';
  if (status === 'stopped') return 'muted';
  if (severity === 'unknown' || status === 'unknown') return 'draft';

  return 'info';
}

function getStatusLabel(status: string) {
  if (status === 'running') return 'Running';
  if (status === 'unknown') return 'Unknown';

  return formatLabel(status);
}
