import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import LanRoundedIcon from '@mui/icons-material/LanRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import { Button } from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { StatGrid, StatTile } from '@/components/workspace';
import { WorkspaceHubHero } from '@/components/workspace/HubHero';
import { workspaceHubHeroActionButtonSx } from '@/components/workspace/HubHeroStyles';
import { routes } from '@/config/routes';
import { DomainCreateDialog } from '@/features/domain-hub/components/DomainCreateDialog';
import { domainHubSectionStatus } from '@/features/domain-hub/sectionStatus';
import type {
  DomainCertificatePanel,
  DomainConnectionPanel,
  DomainHubStats,
  DomainResource,
} from '@/features/domain-hub/types';

const heroCopy = {
  description:
    '워크스페이스 DNS 리소스 모음입니다. 각 도메인에 어떤 프로젝트가 연결되어 있는지, 인증서와 커넥션 상태가 어떤지 빠르게 찾는 구성을 목표로 합니다.',
  eyebrow: 'Accessibility · Domain Provisioning',
  primaryAction: '새 도메인 생성',
  secondaryAction: '프로젝트 허브 보기',
  title: 'Domain Hub',
};

export function DomainHubHero({
  certificatePanel,
  connectionPanel,
  domains,
  isLoading,
  stats,
}: {
  certificatePanel?: DomainCertificatePanel;
  connectionPanel?: DomainConnectionPanel;
  domains: DomainResource[];
  isLoading: boolean;
  stats?: DomainHubStats;
}) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const statItems = buildHeroStats({ certificatePanel, connectionPanel, domains, stats });

  return (
    <>
      <WorkspaceHubHero
        actions={
          <>
            <Button
              onClick={() => setIsCreateOpen(true)}
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
          {statItems.map((item) => (
            <StatTile
              color={item.color}
              icon={item.icon}
              isLoading={isLoading}
              key={item.label}
              label={item.label}
              note={item.note}
              value={item.value}
            />
          ))}
        </StatGrid>
      </WorkspaceHubHero>
      <DomainCreateDialog onClose={() => setIsCreateOpen(false)} open={isCreateOpen} />
    </>
  );
}

function buildHeroStats({
  certificatePanel,
  connectionPanel,
  domains,
  stats,
}: {
  certificatePanel?: DomainCertificatePanel;
  connectionPanel?: DomainConnectionPanel;
  domains: DomainResource[];
  stats?: DomainHubStats;
}) {
  const total = stats?.total ?? domains.length;
  const pending = stats?.pending ?? 0;
  const review = stats?.review ?? 0;
  const connected = stats?.connected ?? 0;
  const boundProjects = domains.filter((domain) => Boolean(domain.boundProject)).length;
  const issuedCertificates = countPanelStatus(certificatePanel, 'issued');
  const connectedRoutes = countPanelStatus(connectionPanel, 'connected');

  return [
    {
      color: 'linear-gradient(135deg,#4f46e5,#6366f1)',
      icon: <ApartmentRoundedIcon sx={{ fontSize: 20 }} />,
      label: '등록 도메인',
      note: `Connected ${formatNumber(connected)} · Pending ${formatNumber(pending + review)}`,
      value: formatNumber(total),
    },
    {
      color: 'linear-gradient(135deg,#6366f1,#818cf8)',
      icon: <LinkRoundedIcon sx={{ fontSize: 20 }} />,
      label: '바인딩 프로젝트',
      note:
        total > 0
          ? `${formatNumber(total)}개 도메인 중 ${formatNumber(boundProjects)}개 연결`
          : '도메인 연결 정보 없음',
      value: formatNumber(boundProjects),
    },
    {
      color: 'linear-gradient(135deg,#4338ca,#60a5fa)',
      icon: <VerifiedUserRoundedIcon sx={{ fontSize: 20 }} />,
      label: '정상 인증서',
      note: `Issued ${formatNumber(issuedCertificates)} · Review ${formatNumber(
        countPanelStatus(certificatePanel, 'pending'),
      )}`,
      value: formatNumber(issuedCertificates),
    },
    {
      color: 'linear-gradient(135deg,#3730a3,#6366f1)',
      icon: <LanRoundedIcon sx={{ fontSize: 20 }} />,
      label: '연결 완료',
      note: `Ready ${formatNumber(countPanelStatus(connectionPanel, 'ready'))} · None ${formatNumber(
        countPanelStatus(connectionPanel, 'none'),
      )}`,
      value: formatNumber(connectedRoutes),
    },
  ];
}

function countPanelStatus(
  panel: DomainCertificatePanel | DomainConnectionPanel | undefined,
  targetStatus: string,
) {
  const match = panel?.items.find((item) => item.status === targetStatus);
  return match?.count ?? 0;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('ko-KR').format(value);
}
