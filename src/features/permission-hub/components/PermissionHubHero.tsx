import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import ApprovalRoundedIcon from '@mui/icons-material/ApprovalRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { StatGrid, StatTile } from '@/components/workspace';
import { WorkspaceHubHero } from '@/components/workspace/HubHero';
import { workspaceHubHeroActionButtonSx } from '@/components/workspace/HubHeroStyles';
import { routes } from '@/config/routes';
import { permissionHubSectionStatus } from '@/features/permission-hub/sectionStatus';
import type { PermissionHubFilters, PermissionHubStats } from '@/features/permission-hub/types';

const heroCopy = {
  description:
    'Permission Realm 모음입니다. 각 카드에서 Realm 안에 포함된 Role, 프로젝트 바인딩, 요청 Inbox를 한 화면에서 확인합니다.',
  eyebrow: 'Accessibility · IAM & Approvals',
  primaryAction: '새 Permission 생성',
  secondaryAction: '프로젝트 목록',
  title: 'Permission Hub',
};

export function PermissionHubHero({
  filters,
  isLoading,
  stats,
}: {
  filters?: PermissionHubFilters;
  isLoading: boolean;
  stats?: PermissionHubStats;
}) {
  const statsConfig = buildStatsConfig(filters, stats);

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
            startIcon={<FolderRoundedIcon />}
            sx={workspaceHubHeroActionButtonSx}
            to={routes.projects}
            variant="outlined"
          >
            {heroCopy.secondaryAction}
          </Button>
        </>
      }
      description={heroCopy.description}
      eyebrow={heroCopy.eyebrow}
      eyebrowIcon={<HubRoundedIcon sx={{ fontSize: 15 }} />}
      hub="permissions"
      maxDescriptionWidth={780}
      status={permissionHubSectionStatus.hero}
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
            value={stats ? item.getValue(stats).toLocaleString() : '0'}
          />
        ))}
      </StatGrid>
    </WorkspaceHubHero>
  );
}

function buildStatsConfig(
  filters: PermissionHubFilters | undefined,
  stats: PermissionHubStats | undefined,
) {
  return [
    {
      color: 'linear-gradient(135deg,#be185d,#fb7185)',
      getValue: (stats: PermissionHubStats) => stats.totalRealms,
      icon: <AdminPanelSettingsRoundedIcon sx={{ fontSize: 20 }} />,
      label: '등록 Realm',
      note: buildKindNote(filters),
    },
    {
      color: 'linear-gradient(135deg,#9d174d,#fb7185)',
      getValue: (stats: PermissionHubStats) => stats.totalMembers,
      icon: <GroupsRoundedIcon sx={{ fontSize: 20 }} />,
      label: '배정 인원',
      note: '중복 포함 총 사용자수',
    },
    {
      color: 'linear-gradient(135deg,#db2777,#f472b6)',
      getValue: (stats: PermissionHubStats) => stats.boundProjectCount,
      icon: <Inventory2RoundedIcon sx={{ fontSize: 20 }} />,
      label: '연결된 프로젝트',
      note: '프로젝트 바인딩 기준',
    },
    {
      color: 'linear-gradient(135deg,#e11d48,#fb7185)',
      getValue: (stats: PermissionHubStats) => stats.pendingRequests,
      icon: <ApprovalRoundedIcon sx={{ fontSize: 20 }} />,
      label: '요청 대기',
      note: `manageable realms ${stats?.manageableRealms ?? 0}`,
    },
  ] as const;
}

function buildKindNote(filters: PermissionHubFilters | undefined) {
  if (!filters) return 'realm kind 집계';

  const counts = new Map(filters.kinds.map((kind) => [kind.value, kind.count]));
  return `scoped ${(counts.get('scoped') ?? 0).toLocaleString()}`;
}
