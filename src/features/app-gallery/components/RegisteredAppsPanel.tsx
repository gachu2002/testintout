import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import { Box, Chip, CircularProgress, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { SectionStatusBadge } from '@/components/reference-status';
import { IconTile } from '@/components/workspace';
import { WorkspaceIcon } from '@/components/WorkspaceIcon';
import {
  CardGrid,
  PanelCard,
  SectionLabel,
  StoreCard,
  TagRow,
} from '@/features/app-gallery/components/AppGalleryPrimitives';
import { appGallerySectionStatus } from '@/features/app-gallery/sectionStatus';
import type { AppGalleryApp } from '@/features/app-gallery/types';
import { iconGradient } from '@/features/app-gallery/utils/visuals';

export function RegisteredAppsPanel({
  apps,
  isLoading,
}: {
  apps: AppGalleryApp[];
  isLoading: boolean;
}) {
  return (
    <PanelCard>
      <Stack spacing={1} sx={{ mb: 2.25 }}>
        <SectionLabel>
          <Inventory2RoundedIcon sx={{ color: 'primary.main', fontSize: 15 }} />
          Registered Apps
          <SectionStatusBadge status={appGallerySectionStatus.registeredApps} />
        </SectionLabel>
        <Typography
          component="h2"
          fontSize={26}
          fontWeight={800}
          letterSpacing="-0.04em"
          lineHeight={1.18}
        >
          Review recently added apps at a glance
        </Typography>
        <Typography color="text.secondary" fontSize={13} lineHeight={1.7} maxWidth={760}>
          Compare names, descriptions, categories, and install targets before choosing what to open.
        </Typography>
      </Stack>

      {isLoading ? (
        <Stack alignItems="center" justifyContent="center" minHeight={220}>
          <CircularProgress size={24} />
        </Stack>
      ) : (
        <CardGrid>
          {apps.map((app) => (
            <AppCard app={app} key={app.slug} />
          ))}
        </CardGrid>
      )}

      {!isLoading && apps.length === 0 ? (
        <Typography color="text.secondary" sx={{ mt: 2 }} variant="body2">
          No apps match the current search and category.
        </Typography>
      ) : null}
    </PanelCard>
  );
}

function AppCard({ app }: { app: AppGalleryApp }) {
  return (
    <StoreCard>
      <Stack
        alignItems="flex-start"
        direction="row"
        justifyContent="space-between"
        spacing={1.5}
        sx={{ mb: 1.75 }}
      >
        <IconTile tileBackground={iconGradient(app.iconColor)} tileSize={42}>
          <WorkspaceIcon name={app.icon} sx={{ fontSize: 21 }} />
        </IconTile>
        <Chip
          label={app.categoryLabel}
          size="small"
          sx={{
            bgcolor: alpha(app.iconColor, 0.12),
            color: app.iconColor,
            fontSize: 10,
            fontWeight: 800,
          }}
        />
      </Stack>
      <Typography fontSize={17} fontWeight={800} letterSpacing="-0.03em" sx={{ mb: 0.5 }}>
        {app.title}
      </Typography>
      <Typography color="text.disabled" fontSize={11} sx={{ mb: 1.5 }}>
        {app.subtitle}
      </Typography>
      <Typography color="text.secondary" fontSize={12} lineHeight={1.65} sx={{ mb: 1.75 }}>
        {app.summary}
      </Typography>
      <TagRow sx={{ mb: 1.75 }}>
        {app.tags.slice(0, 3).map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            sx={{
              bgcolor: 'background.default',
              color: 'text.secondary',
              fontSize: 10,
              fontWeight: 800,
            }}
          />
        ))}
      </TagRow>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={1}
        sx={{ mt: 'auto' }}
      >
        <Typography
          fontSize={11}
          fontWeight={800}
          sx={(theme) => ({ color: theme.workspace.colors.green })}
        >
          Launch URL pending
        </Typography>
        <Box
          component="span"
          sx={{
            alignItems: 'center',
            color: 'text.disabled',
            display: 'inline-flex',
            fontSize: 12,
            fontWeight: 800,
            gap: 0.5,
            textDecoration: 'none',
          }}
        >
          Open
          <ChevronRightRoundedIcon sx={{ fontSize: 15 }} />
        </Box>
      </Stack>
    </StoreCard>
  );
}
