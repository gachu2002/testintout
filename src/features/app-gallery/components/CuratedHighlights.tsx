import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { Box, Chip, CircularProgress, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import type { ReactNode } from 'react';

import { SectionStatusBadge } from '@/components/reference-status';
import { IconTile } from '@/components/workspace';
import { WorkspaceIcon } from '@/components/WorkspaceIcon';
import {
  FeatureCard,
  FeaturedGrid,
  PanelCard,
  SectionLabel,
  TagChip,
  TagRow,
} from '@/features/app-gallery/components/AppGalleryPrimitives';
import { appGallerySectionStatus } from '@/features/app-gallery/sectionStatus';
import type { AppGalleryFeaturedApp } from '@/features/app-gallery/types';

export function CuratedHighlights({
  apps,
  isLoading,
}: {
  apps: AppGalleryFeaturedApp[];
  isLoading: boolean;
}) {
  const sideApps = apps.slice(0, 2);

  return (
    <PanelCard>
      <SectionLabel sx={{ mb: 1.75 }}>
        <StarRoundedIcon sx={{ color: 'primary.main', fontSize: 15 }} />
        Curated Highlights
        <SectionStatusBadge status={appGallerySectionStatus.highlights} />
      </SectionLabel>
      {isLoading && sideApps.length === 0 ? (
        <Stack alignItems="center" justifyContent="center" minHeight={220}>
          <CircularProgress size={24} />
        </Stack>
      ) : (
        <FeaturedGrid>
          <FeaturedPrimaryCard />
          <Stack spacing={1.5}>
            {sideApps.map((app, index) => (
              <FeaturedSideCard app={app} index={index} key={app.slug} />
            ))}
          </Stack>
        </FeaturedGrid>
      )}
    </PanelCard>
  );
}

function FeaturedPrimaryCard() {
  return (
    <FeatureCard>
      <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={1.5}>
        <IconTile tileBackground="linear-gradient(135deg, #4f8cff, #22d3ee)" tileSize={46}>
          <WorkspaceIcon name="project" sx={{ fontSize: 23 }} />
        </IconTile>
        <Chip
          label="Usage Guide"
          size="small"
          sx={{
            bgcolor: '#e0edff',
            color: '#3157b7',
            fontSize: 10,
            fontWeight: 800,
          }}
        />
      </Stack>
      <Typography
        color="secondary.main"
        fontSize={10}
        fontWeight={800}
        letterSpacing="0.08em"
        sx={{ mt: 2.25, textTransform: 'uppercase' }}
      >
        Start Here
      </Typography>
      <Typography fontSize={24} fontWeight={800} letterSpacing="-0.04em" sx={{ mt: 1 }}>
        The easiest way to explore App Gallery
      </Typography>
      <Typography color="text.secondary" fontSize={13} lineHeight={1.7} sx={{ mt: 1 }}>
        Start with recently added apps and clear descriptions. Apps with obvious purpose are easier
        to evaluate first.
      </Typography>
      <Stack spacing={1.125} sx={{ my: 2 }}>
        <Point icon={<ScheduleRoundedIcon />} text="Scan the newest apps first." />
        <Point icon={<DescriptionRoundedIcon />} text="Open apps with clear descriptions first." />
        <Point
          icon={<OpenInNewRoundedIcon />}
          text="If something fits, open it and continue exploring."
        />
      </Stack>
      <TagRow>
        <TagChip
          icon={<ScheduleRoundedIcon />}
          label="Newest first"
          size="small"
          variant="outlined"
        />
        <TagChip
          icon={<DescriptionRoundedIcon />}
          label="Read first"
          size="small"
          variant="outlined"
        />
        <TagChip
          icon={<OpenInNewRoundedIcon />}
          label="Open and decide"
          size="small"
          variant="outlined"
        />
      </TagRow>
    </FeatureCard>
  );
}

function FeaturedSideCard({ app, index }: { app: AppGalleryFeaturedApp; index: number }) {
  const label = index === 0 ? 'Quick Pick' : 'Trending Now';
  const icon = index === 0 ? 'thumb_up' : 'local_fire_department';

  return (
    <Box
      sx={(theme) => ({
        bgcolor: 'background.paper',
        border: `1px solid ${theme.workspace.colors.border}`,
        borderRadius: 2,
        p: 2,
      })}
    >
      <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={1.5}>
        <Box minWidth={0}>
          <SectionLabel sx={{ color: app.iconColor, mb: 0.75 }}>
            <WorkspaceIcon name={icon} sx={{ fontSize: 15 }} />
            {label}
          </SectionLabel>
          <Typography fontSize={16} fontWeight={800} lineHeight={1.35}>
            {app.title}
          </Typography>
        </Box>
        <IconTile
          tileBackground={alpha(app.iconColor, 0.12)}
          tileColor={app.iconColor}
          tileSize={44}
        >
          <WorkspaceIcon name={app.icon} sx={{ fontSize: 21 }} />
        </IconTile>
      </Stack>
      <Typography color="text.secondary" fontSize={12} lineHeight={1.6} sx={{ mt: 1.5 }}>
        {app.summary}
      </Typography>
      <Box
        sx={(theme) => ({
          alignItems: 'center',
          bgcolor: theme.palette.background.default,
          border: `1px solid ${theme.workspace.colors.border}`,
          borderRadius: 1.5,
          color: 'text.secondary',
          display: 'flex',
          fontSize: 12,
          gap: 1,
          mt: 1.5,
          p: 1.25,
        })}
      >
        <CheckCircleRoundedIcon sx={{ color: app.iconColor, fontSize: 16 }} />
        {app.subtitle}
      </Box>
    </Box>
  );
}

function Point({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <Stack alignItems="flex-start" direction="row" spacing={1}>
      <Box sx={{ color: '#4f8cff', display: 'inline-flex', mt: 0.125 }}>{icon}</Box>
      <Typography fontSize={12} lineHeight={1.55}>
        {text}
      </Typography>
    </Stack>
  );
}
