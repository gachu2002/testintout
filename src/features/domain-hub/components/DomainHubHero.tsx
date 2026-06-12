import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import LanRoundedIcon from '@mui/icons-material/LanRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { StatGrid, StatTile } from '@/components/workspace';
import { WorkspaceHubHero } from '@/components/workspace/HubHero';
import { workspaceHubHeroActionButtonSx } from '@/components/workspace/HubHeroStyles';
import { routes } from '@/config/routes';
import { domainHubSectionStatus } from '@/features/domain-hub/sectionStatus';
import type { DomainHubStats } from '@/features/domain-hub/types';

const heroCopy = {
  description:
    '워크스페이스 DNS 리소스 모음입니다. 각 도메인에 어떤 프로젝트가 연결되어 있는지, 인증서와 커넥션 상태가 어떤지 빠르게 찾는 구성을 목표로 합니다.',
  eyebrow: 'Accessibility · Domain Provisioning',
  primaryAction: '새 도메인 생성',
  secondaryAction: '프로젝트 허브 보기',
  title: 'Domain Hub',
};

const statsConfig = [
  {
    color: 'linear-gradient(135deg,#4f46e5,#60a5fa)',
    getValue: (stats: DomainHubStats) => stats.total,
    icon: <ApartmentRoundedIcon sx={{ fontSize: 20 }} />,
    label: '등록 도메인',
    note: '전체 등록 DNS 리소스',
  },
  {
    color: 'linear-gradient(135deg,#f59e0b,#fbbf24)',
    getValue: (stats: DomainHubStats) => stats.pending,
    icon: <ScheduleRoundedIcon sx={{ fontSize: 20 }} />,
    label: '대기',
    note: '프로비저닝 대기',
  },
  {
    color: 'linear-gradient(135deg,#2563eb,#60a5fa)',
    getValue: (stats: DomainHubStats) => stats.review,
    icon: <VerifiedUserRoundedIcon sx={{ fontSize: 20 }} />,
    label: '검토',
    note: '인증서 또는 route 검토',
  },
  {
    color: 'linear-gradient(135deg,#0f766e,#14b8a6)',
    getValue: (stats: DomainHubStats) => stats.connected,
    icon: <LanRoundedIcon sx={{ fontSize: 20 }} />,
    label: '연결 완료',
    note: 'ingress / CDN route 기준',
  },
] as const;

export function DomainHubHero({
  isLoading,
  stats,
}: {
  isLoading: boolean;
  stats?: DomainHubStats;
}) {
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
      hub="domain"
      maxDescriptionWidth={780}
      status={domainHubSectionStatus.hero}
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
