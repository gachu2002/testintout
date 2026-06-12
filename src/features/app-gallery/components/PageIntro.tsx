import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import ViewCarouselRoundedIcon from '@mui/icons-material/ViewCarouselRounded';
import { Box, Typography } from '@mui/material';

import { SectionStatusBadge } from '@/components/reference-status';
import {
  PageHeader,
  SectionLabel,
  TagChip,
  TagRow,
} from '@/features/app-gallery/components/AppGalleryPrimitives';
import { appGallerySectionStatus } from '@/features/app-gallery/sectionStatus';
import type { AppGalleryHero } from '@/features/app-gallery/types';

export function PageIntro({ hero, totalApps }: { hero?: AppGalleryHero; totalApps: number }) {
  return (
    <PageHeader>
      <SectionLabel>
        <StorefrontRoundedIcon sx={{ color: 'primary.main', fontSize: 15 }} />
        DEJ App Gallery
        <SectionStatusBadge status={appGallerySectionStatus.pageIntro} />
      </SectionLabel>
      <Box>
        <Typography component="h1" variant="h3">
          {hero?.title ?? 'App Gallery'}
        </Typography>
        <Typography color="text.secondary" maxWidth={860} sx={{ mt: 1 }} variant="body2">
          {hero?.subtitle ??
            'Browse community-registered apps from the live list. The page surfaces app names, descriptions, and install targets first so teams can quickly understand where each app fits.'}
        </Typography>
      </Box>
      <TagRow>
        <TagChip
          icon={<Inventory2RoundedIcon />}
          label={`${totalApps} Registered Apps`}
          size="small"
          variant="outlined"
        />
        <TagChip
          icon={<ViewCarouselRoundedIcon />}
          label="6 per page"
          size="small"
          variant="outlined"
        />
        <TagChip
          icon={<ScheduleRoundedIcon />}
          label="Newest first"
          size="small"
          variant="outlined"
        />
        <TagChip
          icon={<AutoAwesomeRoundedIcon />}
          label="Install target included"
          size="small"
          variant="outlined"
        />
      </TagRow>
    </PageHeader>
  );
}
