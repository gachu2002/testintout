import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { Box, Button, Chip, CircularProgress, Stack, Typography } from '@mui/material';
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
  onOpenAppDetail,
}: {
  apps: AppGalleryFeaturedApp[];
  isLoading: boolean;
  onOpenAppDetail: (slug: string) => void;
}) {
  const mainApp = apps.at(0);
  const sideApps = apps.slice(1, 3);

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
          <FeaturedPrimaryCard app={mainApp} onOpenAppDetail={onOpenAppDetail} />
          <Stack spacing={1.5}>
            {sideApps.map((app, index) => (
              <FeaturedSideCard
                app={app}
                index={index}
                key={app.slug}
                onOpenAppDetail={onOpenAppDetail}
              />
            ))}
          </Stack>
        </FeaturedGrid>
      )}
    </PanelCard>
  );
}

function FeaturedPrimaryCard({
  app,
  onOpenAppDetail,
}: {
  app?: AppGalleryFeaturedApp;
  onOpenAppDetail: (slug: string) => void;
}) {
  if (!app) {
    return (
      <FeatureCard>
        <Typography color="text.secondary" fontSize={13}>
          Featured apps are not available.
        </Typography>
      </FeatureCard>
    );
  }

  return (
    <FeatureCard>
      <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={1.5}>
        <IconTile tileBackground={app.iconColor} tileSize={46}>
          <WorkspaceIcon name={app.icon} sx={{ fontSize: 23 }} />
        </IconTile>
        <Chip
          label={app.badge}
          size="small"
          sx={{
            bgcolor: alpha(app.iconColor, 0.12),
            color: app.iconColor,
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
        {app.categoryLabel}
      </Typography>
      <Typography fontSize={24} fontWeight={800} letterSpacing="-0.04em" sx={{ mt: 1 }}>
        {app.title}
      </Typography>
      <Typography color="text.secondary" fontSize={13} lineHeight={1.7} sx={{ mt: 1 }}>
        {app.summary}
      </Typography>
      <Stack spacing={1.125} sx={{ my: 2 }}>
        {app.tags.slice(0, 3).map((tag) => (
          <Point icon={<CheckCircleRoundedIcon />} key={tag} text={tag} />
        ))}
      </Stack>
      <TagRow>
        <TagChip
          icon={<DescriptionRoundedIcon />}
          label={app.categoryLabel}
          size="small"
          variant="outlined"
        />
        <TagChip
          icon={<OpenInNewRoundedIcon />}
          label={app.installTargetLabel}
          size="small"
          variant="outlined"
        />
      </TagRow>
      <Button
        onClick={() => onOpenAppDetail(app.slug)}
        startIcon={<OpenInNewRoundedIcon />}
        sx={{ mt: 2.25 }}
        variant="contained"
      >
        상세 계약 보기
      </Button>
    </FeatureCard>
  );
}

function FeaturedSideCard({
  app,
  index,
  onOpenAppDetail,
}: {
  app: AppGalleryFeaturedApp;
  index: number;
  onOpenAppDetail: (slug: string) => void;
}) {
  const label = index === 0 ? '운영 관점 추천' : '문서/협업 관점 추천';
  const marker = index === 0 ? 'O' : 'W';

  return (
    <Box
      component="button"
      onClick={() => onOpenAppDetail(app.slug)}
      sx={(theme) => ({
        bgcolor: 'background.paper',
        border: `1px solid ${theme.workspace.colors.border}`,
        borderRadius: 2,
        color: 'inherit',
        cursor: 'pointer',
        p: 2,
        textAlign: 'left',
      })}
      type="button"
    >
      <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={1.5}>
        <Box minWidth={0}>
          <SectionLabel sx={{ color: app.iconColor, mb: 0.75 }}>
            <WorkspaceIcon name={app.icon} sx={{ fontSize: 15 }} />
            {label}
          </SectionLabel>
          <Typography fontSize={16} fontWeight={800} lineHeight={1.35}>
            {app.title}
          </Typography>
        </Box>
        <Typography color={app.iconColor} fontSize={22} fontWeight={900}>
          {marker}
        </Typography>
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
        <WorkspaceIcon name={app.icon} sx={{ color: app.iconColor, fontSize: 16 }} />
        {app.badge || app.categoryLabel}
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
