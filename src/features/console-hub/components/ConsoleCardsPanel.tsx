import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import StopCircleRoundedIcon from '@mui/icons-material/StopCircleRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded';
import WebRoundedIcon from '@mui/icons-material/WebRounded';
import { Box, Button, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { ReactNode } from 'react';

import { Badge, buildResourceResultCopy, IconTile, Metric } from '@/components/workspace';
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
import { consoleHubSectionStatus } from '@/features/console-hub/sectionStatus';
import type { ConsoleBinding, ConsoleResource } from '@/features/console-hub/types';
import { formatLabel, getInitials } from '@/lib/formatters';
import type { ToneName } from '@/styles/tokens';

const panelCopy = {
  description:
    '워크스페이스에서 운영 중인 데이터 콘솔을 한곳에 모았습니다. 콘솔 종류, 바인딩된 DB/타깃, 현재 런타임 상태를 보고 후속 제어 계약을 연결합니다.',
  empty: '선택한 필터에 맞는 콘솔이 없습니다.',
  label: 'Console Fleet',
  title: 'Consoles',
};

const TypePill = styled('span')(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: 10,
  fontWeight: 700,
}));

const BlockLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: 11,
  fontWeight: 800,
  letterSpacing: '.08em',
  textTransform: 'uppercase',
}));

const ConsoleIconImage = styled('img')({
  display: 'block',
  height: 26,
  maxWidth: 30,
  objectFit: 'contain',
  width: 26,
});

export function ConsoleCardsPanel({
  activeType,
  consoles,
  isLoading,
  loadedCount,
  total,
}: {
  activeType: string;
  consoles: ConsoleResource[];
  isLoading: boolean;
  loadedCount: number;
  total?: number;
}) {
  return (
    <WorkspaceResourceCardsPanel
      description={panelCopy.description}
      emptyCopy={panelCopy.empty}
      hub="consoles"
      icon={<WebRoundedIcon sx={{ fontSize: 14 }} />}
      isEmpty={consoles.length === 0}
      isLoading={isLoading}
      label={panelCopy.label}
      resultCopy={buildResourceResultCopy({
        filterLabel: formatLabel(activeType).toLowerCase(),
        isDefault: activeType === 'all',
        loadedCount,
        total,
        visibleCount: consoles.length,
      })}
      skeletonHeight={318}
      status={consoleHubSectionStatus.cards}
      title={panelCopy.title}
    >
      {consoles.map((consoleItem) => (
        <ConsoleCard consoleItem={consoleItem} key={consoleItem.id} />
      ))}
    </WorkspaceResourceCardsPanel>
  );
}

function ConsoleCard({ consoleItem }: { consoleItem: ConsoleResource }) {
  const typeMeta = getTypeMeta(consoleItem.type, consoleItem.typeLabel);
  const bindings = consoleItem.bindings.slice(0, 3);

  return (
    <ResourceCardRoot cardMinHeight={318} hub="consoles">
      <ResourceCardTop>
        <Box minWidth={0}>
          <ResourceStatusRow>
            <Badge dot tone={getStatusTone(consoleItem.status, consoleItem.health.severity)}>
              {consoleItem.statusLabel || formatLabel(consoleItem.status)}
            </Badge>
            <TypePill>{consoleItem.typeLabel}</TypePill>
          </ResourceStatusRow>
          <ResourceNameRow>
            <IconTile tileBackground={typeMeta.color} tileSize={42}>
              {consoleItem.icon ? (
                <ConsoleIconImage alt="" aria-hidden="true" src={consoleItem.icon} />
              ) : (
                typeMeta.icon
              )}
            </IconTile>
            <Box minWidth={0}>
              <ResourceName>{consoleItem.name}</ResourceName>
              <ResourceMeta>
                {consoleItem.summary || `${consoleItem.typeLabel} console`}
              </ResourceMeta>
            </Box>
          </ResourceNameRow>
        </Box>
        <ResourceMenuIcon />
      </ResourceCardTop>

      <ResourceMetricList>
        <Metric>
          <WebRoundedIcon />
          {typeMeta.shortLabel}
        </Metric>
        <Metric>
          <LinkRoundedIcon />
          {consoleItem.bindingCount.toLocaleString()} bound DB
        </Metric>
        <Metric>
          <HealthAndSafetyRoundedIcon />
          {consoleItem.health.label}
        </Metric>
      </ResourceMetricList>

      <ResourceInfoBlock>
        <ResourceInfoCard>
          <ResourceInfoBadge hub="consoles" tileSize={30}>
            {getInitials(consoleItem.owner.displayName, 'OW')}
          </ResourceInfoBadge>
          <ResourceInfoText meta={consoleItem.owner.email} title={consoleItem.owner.displayName} />
        </ResourceInfoCard>
        {bindings.length > 0 ? (
          <BindingRows bindings={bindings} typeColor={typeMeta.color} />
        ) : null}
      </ResourceInfoBlock>

      <ResourceCardFooter>
        <Button disabled size="small" startIcon={<PlayCircleRoundedIcon />} variant="outlined">
          Start
        </Button>
        <Button disabled size="small" startIcon={<StopCircleRoundedIcon />} variant="outlined">
          Stop
        </Button>
        <Button disabled size="small" startIcon={<OpenInNewRoundedIcon />} variant="contained">
          Open
        </Button>
      </ResourceCardFooter>
    </ResourceCardRoot>
  );
}

function BindingRows({ bindings, typeColor }: { bindings: ConsoleBinding[]; typeColor: string }) {
  return (
    <Stack spacing={1}>
      <BlockLabel>Bound DB</BlockLabel>
      {bindings.map((binding) => (
        <ResourceInfoCard key={binding.id}>
          <ResourceInfoBadge tileBackground={typeColor} tileSize={30}>
            {getEngineAbbr(binding.engine)}
          </ResourceInfoBadge>
          <ResourceInfoText meta={formatLabel(binding.engine)} title={binding.name} />
        </ResourceInfoCard>
      ))}
    </Stack>
  );
}

function getTypeMeta(
  type: string,
  typeLabel: string,
): {
  color: string;
  icon: ReactNode;
  shortLabel: string;
} {
  if (type === 'attu') {
    return {
      color: 'linear-gradient(135deg,#0f766e,#5eead4)',
      icon: <HubRoundedIcon sx={{ fontSize: 20 }} />,
      shortLabel: typeLabel,
    };
  }

  if (type === 'mongogui') {
    return {
      color: 'linear-gradient(135deg,#16a34a,#4ade80)',
      icon: <AccountTreeRoundedIcon sx={{ fontSize: 20 }} />,
      shortLabel: typeLabel,
    };
  }

  if (type === 'pgadmin') {
    return {
      color: 'linear-gradient(135deg,#2563eb,#60a5fa)',
      icon: <StorageRoundedIcon sx={{ fontSize: 20 }} />,
      shortLabel: typeLabel,
    };
  }

  if (type === 'phpmyadmin') {
    return {
      color: 'linear-gradient(135deg,#0891b2,#22d3ee)',
      icon: <TableChartRoundedIcon sx={{ fontSize: 20 }} />,
      shortLabel: typeLabel,
    };
  }

  if (type === 'redisinsight') {
    return {
      color: 'linear-gradient(135deg,#f97316,#fb923c)',
      icon: <MemoryRoundedIcon sx={{ fontSize: 20 }} />,
      shortLabel: typeLabel,
    };
  }

  return {
    color: 'linear-gradient(135deg,#0f766e,#22d3ee)',
    icon: <DnsRoundedIcon sx={{ fontSize: 20 }} />,
    shortLabel: typeLabel || formatLabel(type),
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

function getEngineAbbr(engine: string) {
  const normalized = engine.trim().toUpperCase();
  if (normalized.length <= 2) return normalized || 'DB';

  return normalized.slice(0, 2);
}
