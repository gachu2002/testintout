import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import WebRoundedIcon from '@mui/icons-material/WebRounded';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { StatGrid, StatTile } from '@/components/workspace';
import { WorkspaceHubHero } from '@/components/workspace/HubHero';
import { workspaceHubHeroActionButtonSx } from '@/components/workspace/HubHeroStyles';
import { routes } from '@/config/routes';
import { databaseHubSectionStatus } from '@/features/database-hub/sectionStatus';
import type { DatabaseHealthPanel, DatabaseHubStats } from '@/features/database-hub/types';

const heroCopy = {
  description:
    '데이터베이스 리소스 모음입니다. 실제 접속과 운영 콘솔은 Consoles Hub에서 열고, 여기서는 리소스 상태와 연결 프로젝트를 빠르게 찾습니다.',
  eyebrow: 'Storage · Data Plane',
  primaryAction: '새 데이터베이스 생성',
  secondaryAction: 'Consoles Hub 보기',
  title: 'Database Hub',
};

export function DatabaseHubHero({
  healthPanel,
  isLoading,
  onCreateClick,
  stats,
}: {
  healthPanel?: DatabaseHealthPanel;
  isLoading: boolean;
  onCreateClick: () => void;
  stats?: DatabaseHubStats;
}) {
  const statsConfig = buildStatsConfig(healthPanel);

  return (
    <WorkspaceHubHero
      actions={
        <>
          <Button
            onClick={onCreateClick}
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
        {statsConfig.map((item) => {
          const note =
            typeof item.note === 'function' ? (stats ? item.note(stats) : '') : item.note;

          return (
            <StatTile
              color={item.color}
              icon={item.icon}
              isLoading={isLoading}
              key={item.label}
              label={item.label}
              note={note}
              value={stats ? item.getValue(stats) : '0'}
            />
          );
        })}
      </StatGrid>
    </WorkspaceHubHero>
  );
}

function buildStatsConfig(healthPanel: DatabaseHealthPanel | undefined) {
  const healthSummary = healthPanel?.summary;

  return [
    {
      color: 'linear-gradient(135deg,#2563eb,#3b82f6)',
      getValue: (stats: DatabaseHubStats) => stats.totalDatabases.toLocaleString(),
      icon: <StorageRoundedIcon sx={{ fontSize: 20 }} />,
      label: '등록 리소스',
      note: (stats: DatabaseHubStats) =>
        `Running ${stats.runningCount.toLocaleString()} · Issues ${stats.issueCount.toLocaleString()}`,
    },
    {
      color: 'linear-gradient(135deg,#3b82f6,#38bdf8)',
      getValue: (stats: DatabaseHubStats) => stats.bindingCount.toLocaleString(),
      icon: <LinkRoundedIcon sx={{ fontSize: 20 }} />,
      label: '연결 바인딩',
      note: 'project / console bindings',
    },
    {
      color: 'linear-gradient(135deg,#1d4ed8,#60a5fa)',
      getValue: () => (healthSummary?.healthy ?? 0).toLocaleString(),
      icon: <HealthAndSafetyRoundedIcon sx={{ fontSize: 20 }} />,
      label: 'Healthy 리소스',
      note: `Degraded ${(healthSummary?.degraded ?? 0).toLocaleString()} · Unknown ${(
        healthSummary?.unknown ?? 0
      ).toLocaleString()}`,
    },
    {
      color: 'linear-gradient(135deg,#0ea5e9,#67e8f9)',
      getValue: (stats: DatabaseHubStats) => getWeeklyResourceViews(stats).toLocaleString(),
      icon: <VisibilityRoundedIcon sx={{ fontSize: 20 }} />,
      label: '주간 리소스 열람',
      note: '최근 7일 조회 기준',
    },
  ] as const;
}

function getWeeklyResourceViews(stats: DatabaseHubStats) {
  return stats.weeklyResourceViews ?? stats.weeklyViews ?? stats.weeklyViewCount ?? 0;
}
