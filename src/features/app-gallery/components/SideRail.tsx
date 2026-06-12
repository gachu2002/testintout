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
import type { AppGalleryApp } from '@/features/app-gallery/types';

export function SideRail({ apps }: { apps: AppGalleryApp[] }) {
  return (
    <Stack spacing={2.5}>
      <SoftPanelCard>
        <SectionLabel sx={{ mb: 1.75 }}>
          <ScheduleRoundedIcon sx={{ color: 'primary.main', fontSize: 15 }} />
          Recently Added
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
          Notable Patterns
          <SectionStatusBadge status={appGallerySectionStatus.sideRail} />
        </SectionLabel>
        <Stack spacing={1.25}>
          <SideRow
            meta="Apps like Code Studio stand out when the project starting path is clear."
            rank={1}
            title="Development Start"
            value="Clear"
          />
          <SideRow
            meta="Apps like Launch Monitor make operational readiness easy to check."
            rank={2}
            title="Operational Visibility"
            value="Practical"
          />
          <SideRow
            meta="Apps like Docs Portal organize documentation and guides into a portal flow."
            rank={3}
            title="Docs Portal"
            value="Connected"
          />
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
