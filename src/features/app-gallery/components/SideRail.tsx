import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import { Box, Stack, Typography } from '@mui/material';

import { SectionStatusBadge } from '@/components/reference-status';
import { SmartLink } from '@/components/SmartLink';
import {
  SectionLabel,
  SideRowGrid,
  SoftPanelCard,
} from '@/features/app-gallery/components/AppGalleryPrimitives';
import { appGallerySectionStatus } from '@/features/app-gallery/sectionStatus';
import type { AppGalleryApp, AppGalleryCategory } from '@/features/app-gallery/types';

export function SideRail({
  apps,
  categories,
}: {
  apps: AppGalleryApp[];
  categories: AppGalleryCategory[];
}) {
  const categoryTrends = categories
    .filter((category) => category.id !== 'all')
    .sort((left, right) => right.count - left.count)
    .slice(0, 3);

  return (
    <Stack spacing={2.5}>
      <SoftPanelCard>
        <SectionLabel sx={{ mb: 1.75 }}>
          <ScheduleRoundedIcon sx={{ color: 'primary.main', fontSize: 15 }} />
          추천 앱 목록
          <SectionStatusBadge status={appGallerySectionStatus.sideRail} />
        </SectionLabel>
        <Stack spacing={1.25}>
          {apps.map((app, index) => (
            <SideRow
              key={app.slug}
              meta={app.subtitle}
              rank={index + 1}
              title={app.title}
              value={app.categoryLabel}
            />
          ))}
        </Stack>
      </SoftPanelCard>

      <SoftPanelCard>
        <SectionLabel sx={{ mb: 1.75 }}>
          <TrendingUpRoundedIcon sx={{ color: 'primary.main', fontSize: 15 }} />
          이번 페이지에서 눈에 띄는 흐름
          <SectionStatusBadge status={appGallerySectionStatus.sideRail} />
        </SectionLabel>
        <Stack spacing={1.25}>
          {categoryTrends.map((category, index) => (
            <SideRow
              key={category.id}
              meta={category.description}
              rank={index + 1}
              title={category.label}
              value={`${category.count} apps`}
            />
          ))}
        </Stack>
      </SoftPanelCard>
    </Stack>
  );
}

function SideRow({
  href,
  meta,
  rank,
  title,
  value,
}: {
  href?: string;
  meta: string;
  rank: number;
  title: string;
  value: string;
}) {
  const content = (
    <SideRowGrid>
      <Typography color="primary.main" fontSize={11} fontWeight={800} textAlign="center" width={20}>
        {rank}
      </Typography>
      <Box minWidth={0}>
        <Typography fontSize={12} fontWeight={800} noWrap>
          {title}
        </Typography>
        <Typography color="text.disabled" fontSize={11} lineHeight={1.5} noWrap>
          {meta}
        </Typography>
      </Box>
      <Typography color="text.secondary" fontSize={11} fontWeight={800} whiteSpace="nowrap">
        {value}
      </Typography>
    </SideRowGrid>
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
