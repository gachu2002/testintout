import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import ViewInArRoundedIcon from '@mui/icons-material/ViewInArRounded';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { StatGrid, StatTile } from '@/components/workspace';
import { WorkspaceHubHero } from '@/components/workspace/HubHero';
import { workspaceHubHeroActionButtonSx } from '@/components/workspace/HubHeroStyles';
import { routes } from '@/config/routes';
import { bucketHubSectionStatus } from '@/features/bucket-hub/sectionStatus';
import type { BucketHubFilters, BucketHubStats } from '@/features/bucket-hub/types';
import { formatBytes } from '@/features/bucket-hub/utils/format';

const heroCopy = {
  description:
    '오브젝트 스토리지 리소스 모음입니다. 실제 업로드 흐름과 퍼블릭 노출은 프로젝트/도메인 허브에서 보고, 여기서는 버킷 상태와 연결 대상을 빠르게 찾습니다.',
  eyebrow: 'Storage · Object Plane',
  primaryAction: '새 버킷 생성',
  secondaryAction: '프로젝트 허브 보기',
  title: 'Bucket Hub',
};

export function BucketHubHero({
  filters,
  isLoading,
  stats,
}: {
  filters?: BucketHubFilters;
  isLoading: boolean;
  stats?: BucketHubStats;
}) {
  const sharedTypeCount = filters?.types.find((item) => item.value === 'shared')?.count;
  const privateTypeCount = filters?.types.find((item) => item.value === 'private')?.count;
  const activeCount = filters?.statuses.find((item) => item.value === 'active')?.count;

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
      hub="buckets"
      maxDescriptionWidth={780}
      status={bucketHubSectionStatus.heroFilters}
      title={heroCopy.title}
    >
      <StatGrid>
        <StatTile
          color="linear-gradient(135deg,#0f766e,#14b8a6)"
          icon={<FolderRoundedIcon sx={{ fontSize: 20 }} />}
          isLoading={isLoading}
          label="등록 버킷"
          note={activeCount === undefined ? '전체 등록 object buckets' : `Active ${activeCount}`}
          value={stats ? stats.totalBuckets.toLocaleString() : '0'}
        />
        <StatTile
          color="linear-gradient(135deg,#0d9488,#2dd4bf)"
          icon={<LinkRoundedIcon sx={{ fontSize: 20 }} />}
          isLoading={isLoading}
          label="바인딩 프로젝트"
          note="프로젝트 연결 기준"
          value={stats ? stats.boundProjectCount.toLocaleString() : '0'}
        />
        <StatTile
          color="linear-gradient(135deg,#0f766e,#5eead4)"
          icon={<StorageRoundedIcon sx={{ fontSize: 20 }} />}
          isLoading={isLoading}
          label="총 사용량"
          note="사용 중인 object bytes"
          value={stats ? formatBytes(stats.totalUsedBytes) : '0 B'}
        />
        <StatTile
          color="linear-gradient(135deg,#14b8a6,#99f6e4)"
          icon={<ViewInArRoundedIcon sx={{ fontSize: 20 }} />}
          isLoading={isLoading}
          label="할당 용량"
          note={buildTypeNote(sharedTypeCount, privateTypeCount)}
          value={stats ? formatBytes(stats.totalQuotaBytes) : '0 B'}
        />
      </StatGrid>
    </WorkspaceHubHero>
  );
}

function buildTypeNote(sharedTypeCount: number | undefined, privateTypeCount: number | undefined) {
  if (sharedTypeCount === undefined && privateTypeCount === undefined) {
    return 'Accepted quota total';
  }

  return `Shared ${sharedTypeCount ?? 0} · Private ${privateTypeCount ?? 0}`;
}
