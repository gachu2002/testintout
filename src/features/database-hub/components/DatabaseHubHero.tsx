import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DataUsageRoundedIcon from '@mui/icons-material/DataUsageRounded';
import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import WebRoundedIcon from '@mui/icons-material/WebRounded';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { StatGrid, StatTile } from '@/components/workspace';
import { WorkspaceHubHero } from '@/components/workspace/HubHero';
import { workspaceHubHeroActionButtonSx } from '@/components/workspace/HubHeroStyles';
import { routes } from '@/config/routes';
import { databaseHubSectionStatus } from '@/features/database-hub/sectionStatus';
import type { DatabaseHubFilters, DatabaseHubStats } from '@/features/database-hub/types';

const heroCopy = {
  description:
    '데이터베이스 리소스 모음입니다. 실제 접속과 운영 콘솔은 Consoles Hub에서 열고, 여기서는 리소스 상태와 연결 프로젝트를 빠르게 찾습니다.',
  eyebrow: 'Storage · Data Plane',
  primaryAction: '새 데이터베이스 생성',
  secondaryAction: 'Consoles Hub 보기',
  title: 'Database Hub',
};

export function DatabaseHubHero({
  filters,
  isLoading,
  stats,
}: {
  filters?: DatabaseHubFilters;
  isLoading: boolean;
  stats?: DatabaseHubStats;
}) {
  const statsConfig = buildStatsConfig(filters);

  return (
    <WorkspaceHubHero
      actions={
        <>
          <Button
            disabled
            startIcon={<AddCircleRoundedIcon />}
            sx={workspaceHubHeroActionButtonSx}
            variant="contained"
          >
            {heroCopy.primaryAction}
          </Button>
          <Button
            component={RouterLink}
            startIcon={<WebRoundedIcon />}
            sx={workspaceHubHeroActionButtonSx}
            to={routes.consoles}
            variant="outlined"
          >
            {heroCopy.secondaryAction}
          </Button>
        </>
      }
      description={heroCopy.description}
      eyebrow={heroCopy.eyebrow}
      eyebrowIcon={<HubRoundedIcon sx={{ fontSize: 15 }} />}
      hub="database"
      status={databaseHubSectionStatus.hero}
      title={heroCopy.title}
    >
      <StatGrid>
        {statsConfig.map((item) => (
          <StatTile
            color={item.color}
            icon={item.icon}
            isLoading={isLoading}
            key={item.label}
            label={item.label}
            note={item.note}
            value={stats ? item.getValue(stats) : '0'}
          />
        ))}
      </StatGrid>
    </WorkspaceHubHero>
  );
}

function buildStatsConfig(filters: DatabaseHubFilters | undefined) {
  return [
    {
      color: 'linear-gradient(135deg,#2563eb,#3b82f6)',
      getValue: (stats: DatabaseHubStats) => stats.totalDatabases.toLocaleString(),
      icon: <StorageRoundedIcon sx={{ fontSize: 20 }} />,
      label: '등록 리소스',
      note: buildEngineNote(filters),
    },
    {
      color: 'linear-gradient(135deg,#3b82f6,#38bdf8)',
      getValue: (stats: DatabaseHubStats) => stats.bindingCount.toLocaleString(),
      icon: <LinkRoundedIcon sx={{ fontSize: 20 }} />,
      label: 'Bound Projects',
      note: 'binding count 기준',
    },
    {
      color: 'linear-gradient(135deg,#1d4ed8,#60a5fa)',
      getValue: (stats: DatabaseHubStats) => stats.runningCount.toLocaleString(),
      icon: <HealthAndSafetyRoundedIcon sx={{ fontSize: 20 }} />,
      label: 'Running 리소스',
      note: 'runtime status 기준',
    },
    {
      color: 'linear-gradient(135deg,#0ea5e9,#67e8f9)',
      getValue: (stats: DatabaseHubStats) => formatByteValue(stats.totalQuotaBytes),
      icon: <DataUsageRoundedIcon sx={{ fontSize: 20 }} />,
      label: 'Quota',
      note: 'accepted stats aggregate',
    },
  ] as const;
}

function buildEngineNote(filters: DatabaseHubFilters | undefined) {
  if (!filters?.engines.length) return 'engine 집계 로딩';

  return filters.engines
    .map((engine) => `${engine.value} ${engine.count.toLocaleString()}`)
    .join(' · ');
}

function formatByteValue(bytes: number) {
  if (bytes <= 0) return '0B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'] as const;
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1)}${units[unitIndex]}`;
}
