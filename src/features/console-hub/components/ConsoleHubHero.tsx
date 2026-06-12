import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import StopCircleRoundedIcon from '@mui/icons-material/StopCircleRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import WebRoundedIcon from '@mui/icons-material/WebRounded';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { StatGrid, StatTile } from '@/components/workspace';
import { WorkspaceHubHero } from '@/components/workspace/HubHero';
import { workspaceHubHeroActionButtonSx } from '@/components/workspace/HubHeroStyles';
import { routes } from '@/config/routes';
import { consoleHubSectionStatus } from '@/features/console-hub/sectionStatus';
import type { ConsoleHubFilters, ConsoleHubStats } from '@/features/console-hub/types';

const heroCopy = {
  description:
    '데이터베이스 콘솔 모음입니다. 실제 DB 리소스는 Database Hub에서 관리하고 여기서는 접속, 조회, 운영에 쓰는 콘솔을 빠르게 찾습니다.',
  eyebrow: 'Development · Database Consoles',
  primaryAction: '새 콘솔 생성',
  secondaryAction: 'Database Hub 보기',
  title: 'Consoles Hub',
};

export function ConsoleHubHero({
  filters,
  isLoading,
  stats,
}: {
  filters?: ConsoleHubFilters;
  isLoading: boolean;
  stats?: ConsoleHubStats;
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
            startIcon={<StorageRoundedIcon />}
            sx={workspaceHubHeroActionButtonSx}
            to={routes.databases}
            variant="outlined"
          >
            {heroCopy.secondaryAction}
          </Button>
        </>
      }
      description={heroCopy.description}
      eyebrow={heroCopy.eyebrow}
      eyebrowIcon={<HubRoundedIcon sx={{ fontSize: 15 }} />}
      hub="consoles"
      status={consoleHubSectionStatus.hero}
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

function buildStatsConfig(filters: ConsoleHubFilters | undefined) {
  return [
    {
      color: 'linear-gradient(135deg,#15803d,#22c55e)',
      getValue: (stats: ConsoleHubStats) => stats.totalConsoles.toLocaleString(),
      icon: <WebRoundedIcon sx={{ fontSize: 20 }} />,
      label: '등록 콘솔',
      note: buildTypeNote(filters),
    },
    {
      color: 'linear-gradient(135deg,#166534,#4ade80)',
      getValue: (stats: ConsoleHubStats) => stats.bindingCount.toLocaleString(),
      icon: <LinkRoundedIcon sx={{ fontSize: 20 }} />,
      label: 'Bound DB',
      note: 'accepted stats aggregate',
    },
    {
      color: 'linear-gradient(135deg,#16a34a,#86efac)',
      getValue: (stats: ConsoleHubStats) => stats.runningCount.toLocaleString(),
      icon: <HealthAndSafetyRoundedIcon sx={{ fontSize: 20 }} />,
      label: 'Running 콘솔',
      note: 'runtime status 기준',
    },
    {
      color: 'linear-gradient(135deg,#22c55e,#bbf7d0)',
      getValue: (stats: ConsoleHubStats) => stats.stoppedCount.toLocaleString(),
      icon: <StopCircleRoundedIcon sx={{ fontSize: 20 }} />,
      label: 'Stopped 콘솔',
      note: 'stopped status 기준',
    },
  ] as const;
}

function buildTypeNote(filters: ConsoleHubFilters | undefined) {
  if (!filters?.types.length) return 'console type 집계 로딩';

  return filters.types.map((type) => `${type.label} ${type.count.toLocaleString()}`).join(' · ');
}
