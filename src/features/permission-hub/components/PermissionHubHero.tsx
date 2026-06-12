import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import ApprovalRoundedIcon from '@mui/icons-material/ApprovalRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
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
    '워크스페이스 Permission Realm 모음입니다. 각 Realm의 Role과 배정 인원, 프로젝트 연결 상태를 확인하고 요청 목록으로 이어지는 운영 흐름을 준비합니다.',
  eyebrow: 'Accessibility · IAM & Approvals',
  primaryAction: '새 권한 요청',
  secondaryAction: '프로젝트 허브 보기',
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
  const statsConfig = buildStatsConfig(filters);

  return (
    <WorkspaceHubHero
      actions={
        <>
          <Button
            disabled
            startIcon={<PersonAddAlt1RoundedIcon />}
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

function buildStatsConfig(filters: PermissionHubFilters | undefined) {
  return [
    {
      color: 'linear-gradient(135deg,#be185d,#fb7185)',
      getValue: (stats: PermissionHubStats) => stats.totalRealms,
      icon: <AdminPanelSettingsRoundedIcon sx={{ fontSize: 20 }} />,
      label: '등록 Realm',
      note: buildKindNote(filters),
    },
    {
      color: 'linear-gradient(135deg,#0f766e,#14b8a6)',
      getValue: (stats: PermissionHubStats) => stats.totalMembers,
      icon: <GroupsRoundedIcon sx={{ fontSize: 20 }} />,
      label: '배정 인원',
      note: '중복 포함',
    },
    {
      color: 'linear-gradient(135deg,#2563eb,#60a5fa)',
      getValue: (stats: PermissionHubStats) => stats.boundProjectCount,
      icon: <Inventory2RoundedIcon sx={{ fontSize: 20 }} />,
      label: '연결 프로젝트',
      note: 'bound project 기준',
    },
    {
      color: 'linear-gradient(135deg,#f59e0b,#fbbf24)',
      getValue: (stats: PermissionHubStats) => stats.pendingRequests,
      icon: <ApprovalRoundedIcon sx={{ fontSize: 20 }} />,
      label: '요청 대기',
      note: 'permission realm inbox',
    },
  ] as const;
}

function buildKindNote(filters: PermissionHubFilters | undefined) {
  if (!filters) return 'realm kind 집계';

  const counts = new Map(filters.kinds.map((kind) => [kind.value, kind.count]));
  return `platform ${counts.get('platform') ?? 0} · project ${counts.get('project') ?? 0} · resource ${counts.get('resource') ?? 0} · scoped ${counts.get('scoped') ?? 0}`;
}
