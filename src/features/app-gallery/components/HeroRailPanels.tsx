import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { SectionStatusBadge } from '@/components/reference-status';
import { SmartLink } from '@/components/SmartLink';
import { IconTile } from '@/components/workspace';
import { WorkspaceIcon } from '@/components/WorkspaceIcon';
import { RailCard, SectionLabel } from '@/features/app-gallery/components/AppGalleryPrimitives';
import { appGallerySectionStatus } from '@/features/app-gallery/sectionStatus';
import type { AppGalleryApp, AppGalleryRelatedAi } from '@/features/app-gallery/types';
import { iconGradient } from '@/features/app-gallery/utils/visuals';

export function RecentRailCard({ apps, isLoading }: { apps: AppGalleryApp[]; isLoading: boolean }) {
  return (
    <RailCard>
      <SectionLabel sx={{ color: 'secondary.main', mb: 1.25 }}>
        <BoltRoundedIcon sx={{ fontSize: 14 }} />
        실데이터 하이라이트
        <SectionStatusBadge status={appGallerySectionStatus.heroRail} />
      </SectionLabel>
      <Typography fontSize={18} fontWeight={800} letterSpacing="-0.03em" sx={{ mb: 0.75 }}>
        빠르게 둘러볼 앱
      </Typography>
      <Typography color="text.secondary" fontSize={12} lineHeight={1.6} sx={{ mb: 1.75 }}>
        실제 /api/v2/app-gallery/apps 응답에서 먼저 추천할 카탈로그를 보여줍니다.
      </Typography>
      {isLoading ? <CircularProgress size={22} /> : <MiniAppList apps={apps} />}
    </RailCard>
  );
}

export function CriteriaRailCard({ relatedAi }: { relatedAi: AppGalleryRelatedAi[] }) {
  const firstRelatedAi = relatedAi.at(0);

  return (
    <RailCard>
      <SectionLabel sx={{ color: 'secondary.main', mb: 1.25 }}>
        <LinkRoundedIcon sx={{ fontSize: 14 }} /> 함께 보는 AI 큐레이션
        <SectionStatusBadge status={appGallerySectionStatus.heroRail} />
      </SectionLabel>
      <Typography fontSize={18} fontWeight={800} letterSpacing="-0.03em" sx={{ mb: 0.75 }}>
        AI Gallery와 함께 보기
      </Typography>
      <Typography color="text.secondary" fontSize={12} lineHeight={1.6} sx={{ mb: 1.75 }}>
        앱 상세와 연결되는 related AI 큐레이션도 같은 host의 v2 API에서 읽어옵니다.
      </Typography>
      {firstRelatedAi ? (
        <MiniRow
          href={firstRelatedAi.href}
          icon="ai_gallery"
          iconColor="#7c5fcf"
          meta={firstRelatedAi.subtitle}
          pill={firstRelatedAi.category}
          title={firstRelatedAi.title}
        />
      ) : null}
    </RailCard>
  );
}

function MiniAppList({ apps }: { apps: AppGalleryApp[] }) {
  return (
    <Stack spacing={1.25}>
      {apps.map((app) => (
        <MiniRow
          icon={app.icon}
          iconColor={app.iconColor}
          key={app.slug}
          meta={app.summary}
          pill={app.categoryLabel}
          title={app.title}
        />
      ))}
    </Stack>
  );
}

function MiniRow({
  href,
  icon,
  iconColor,
  meta,
  pill,
  title,
}: {
  href?: string;
  icon: string;
  iconColor: string;
  meta: string;
  pill: string;
  title: string;
}) {
  const content = (
    <Box
      sx={(theme) => ({
        alignItems: 'center',
        display: 'grid',
        gap: theme.spacing(1.25),
        gridTemplateColumns: 'auto minmax(0, 1fr) auto',
      })}
    >
      <IconTile tileBackground={iconGradient(iconColor)} tileSize={34}>
        <WorkspaceIcon name={icon} sx={{ fontSize: 18 }} />
      </IconTile>
      <Box minWidth={0}>
        <Typography fontSize={12} fontWeight={800} noWrap>
          {title}
        </Typography>
        <Typography color="text.disabled" fontSize={11} lineHeight={1.5} noWrap>
          {meta}
        </Typography>
      </Box>
      <Box
        sx={{
          bgcolor: alpha(iconColor, 0.12),
          borderRadius: 999,
          color: iconColor,
          fontSize: 10,
          fontWeight: 800,
          px: 1,
          py: 0.625,
          whiteSpace: 'nowrap',
        }}
      >
        {pill}
      </Box>
    </Box>
  );

  if (!href) {
    return content;
  }

  return (
    <Box component={SmartLink} href={href} sx={{ color: 'inherit', textDecoration: 'none' }}>
      {content}
    </Box>
  );
}
