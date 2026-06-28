import ViewCarouselRoundedIcon from '@mui/icons-material/ViewCarouselRounded';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { SectionStatusBadge } from '@/components/reference-status';
import { IconTile } from '@/components/workspace';
import { WorkspaceIcon } from '@/components/WorkspaceIcon';
import {
  CollectionCard,
  CollectionGrid,
  PanelCard,
  SectionLabel,
} from '@/features/app-gallery/components/AppGalleryPrimitives';
import { appGallerySectionStatus } from '@/features/app-gallery/sectionStatus';
import type {
  AppGalleryApp,
  AppGalleryCategory,
  AppGalleryFeaturedApp,
} from '@/features/app-gallery/types';
import { iconGradient } from '@/features/app-gallery/utils/visuals';

export function CollectionsPanel({
  apps,
  categories,
  featuredApps,
  onOpenAppDetail,
}: {
  apps: AppGalleryApp[];
  categories: AppGalleryCategory[];
  featuredApps: AppGalleryFeaturedApp[];
  onOpenAppDetail: (slug: string) => void;
}) {
  const categoryPicks = categories
    .filter((category) => category.id !== 'all')
    .slice(0, 3)
    .map((category) => apps.find((app) => app.category === category.id))
    .filter((app): app is AppGalleryApp => Boolean(app));

  return (
    <PanelCard>
      <Stack spacing={1} sx={{ mb: 2.25 }}>
        <SectionLabel>
          <ViewCarouselRoundedIcon sx={{ color: 'primary.main', fontSize: 15 }} />
          Collections
          <SectionStatusBadge status={appGallerySectionStatus.collections} />
        </SectionLabel>
        <Typography
          component="h2"
          fontSize={26}
          fontWeight={800}
          letterSpacing="-0.04em"
          lineHeight={1.18}
        >
          목적에 따라 가볍게 모아본 앱 묶음
        </Typography>
        <Typography color="text.secondary" fontSize={13} lineHeight={1.7} maxWidth={760}>
          Featured, 카테고리, 관련 AI 큐레이션을 바탕으로 실제 카탈로그를 다시 묶어 보여줍니다.
        </Typography>
      </Stack>
      <CollectionGrid>
        <CollectionGroup
          apps={featuredApps.slice(0, 3)}
          description="백엔드의 /api/v2/app-gallery/featured 결과를 기준으로 지금 바로 살펴볼 앱을 모았습니다."
          label={`${featuredApps.slice(0, 3).length} Apps`}
          onOpenAppDetail={onOpenAppDetail}
          title="Featured App 묶음"
        />
        <CollectionGroup
          apps={categoryPicks}
          description="각 카테고리에서 가장 먼저 볼 만한 앱을 골라 비교할 수 있게 묶었습니다."
          label={`${categoryPicks.length} Picks`}
          onOpenAppDetail={onOpenAppDetail}
          title="카테고리별 첫 진입점"
        />
      </CollectionGrid>
    </PanelCard>
  );
}

function CollectionGroup({
  apps,
  description,
  label,
  onOpenAppDetail,
  title,
}: {
  apps: AppGalleryApp[];
  description: string;
  label: string;
  onOpenAppDetail: (slug: string) => void;
  title: string;
}) {
  return (
    <CollectionCard>
      <Stack
        alignItems="flex-start"
        direction="row"
        justifyContent="space-between"
        spacing={1.5}
        sx={{ mb: 1.75 }}
      >
        <Box>
          <Typography fontSize={18} fontWeight={800} letterSpacing="-0.03em">
            {title}
          </Typography>
          <Typography color="text.secondary" fontSize={12} lineHeight={1.65} sx={{ mt: 0.5 }}>
            {description}
          </Typography>
        </Box>
        <Chip
          label={label}
          size="small"
          sx={{ bgcolor: '#e0e7ff', color: '#4f46e5', fontSize: 10, fontWeight: 800 }}
        />
      </Stack>
      <Stack spacing={1.25}>
        {apps.map((app) => (
          <Box
            component="button"
            key={app.slug}
            onClick={() => onOpenAppDetail(app.slug)}
            sx={(theme) => ({
              alignItems: 'center',
              border: 0,
              bgcolor: alpha(theme.workspace.colors.background, 0.8),
              borderRadius: 1.5,
              color: 'inherit',
              cursor: 'pointer',
              display: 'grid',
              gap: 1.25,
              gridTemplateColumns: 'auto minmax(0, 1fr) auto',
              p: 1.25,
              textAlign: 'left',
            })}
            type="button"
          >
            <IconTile tileBackground={iconGradient(app.iconColor)} tileSize={30}>
              <WorkspaceIcon name={app.icon} sx={{ fontSize: 16 }} />
            </IconTile>
            <Box minWidth={0}>
              <Typography fontSize={12} fontWeight={800} noWrap>
                {app.title}
              </Typography>
              <Typography color="text.disabled" fontSize={11} noWrap>
                {app.summary}
              </Typography>
            </Box>
            <Typography color="primary.main" fontSize={10} fontWeight={800}>
              {app.categoryLabel}
            </Typography>
          </Box>
        ))}
      </Stack>
    </CollectionCard>
  );
}
