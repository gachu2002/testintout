import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import { Box, Skeleton, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { SectionStatusBadge } from '@/components/reference-status';
import { SmartLink } from '@/components/SmartLink';
import { Panel } from '@/components/workspace';
import { launchpadSectionStatus } from '@/features/launchpad/sectionStatus';
import type {
  AiGallerySpotlight,
  AppGalleryFeaturedItem,
  StoreSpotlightItem,
} from '@/features/launchpad/types';
import {
  buildAiSection,
  buildAppSection,
  getTileTagTone,
  type StoreSectionViewModel,
  type StoreSpotlightCard,
  type StoreTileViewModel,
} from '@/features/launchpad/utils/storeSpotlightViewModel';

import { CompactLabel, PanelMoreLink, PanelStatusMessage } from './LaunchpadPrimitives';

export function StoreSpotlightPanel({
  aiSpotlight,
  aiSpotlightHasError = false,
  aiSpotlightIsLoading = false,
  appFeaturedHasError = false,
  appFeaturedIsLoading = false,
  appFeaturedItems,
  items,
  storeSpotlightHasError = false,
}: {
  aiSpotlight?: AiGallerySpotlight;
  aiSpotlightHasError?: boolean;
  aiSpotlightIsLoading?: boolean;
  appFeaturedHasError?: boolean;
  appFeaturedIsLoading?: boolean;
  appFeaturedItems: AppGalleryFeaturedItem[];
  items: StoreSpotlightItem[];
  storeSpotlightHasError?: boolean;
}) {
  const appItem = items.find((item) => !item.type.includes('ai'));
  const aiItem = items.find((item) => item.type.includes('ai'));
  const sections = [
    buildAppSection(appItem, appFeaturedItems, {
      hasError: appFeaturedHasError,
      isLoading: appFeaturedIsLoading,
    }),
    buildAiSection(aiItem, aiSpotlight, {
      hasError: aiSpotlightHasError,
      isLoading: aiSpotlightIsLoading,
    }),
  ];

  return (
    <Panel>
      <CompactLabel icon={<StorefrontRoundedIcon sx={{ fontSize: 14 }} />} label="Gallery" />
      {storeSpotlightHasError ? (
        <Typography color="text.disabled" fontSize={12} sx={{ mb: 1.5 }}>
          Store metadata is unavailable. Gallery content will use available feeds.
        </Typography>
      ) : null}
      <Box sx={{ display: 'grid', gap: '18px' }}>
        {sections.map((section, index) => (
          <Box key={section.variant}>
            {index > 0 ? <StoreDivider /> : null}
            <StoreGallerySection section={section} />
          </Box>
        ))}
      </Box>
    </Panel>
  );
}

function StoreGallerySection({ section }: { section: StoreSectionViewModel }) {
  const status =
    section.variant === 'app'
      ? launchpadSectionStatus.appGalleryPreview
      : launchpadSectionStatus.aiGalleryPreview;

  return (
    <Box component="section" sx={{ display: 'grid', gap: '14px' }}>
      <Stack
        alignItems="flex-start"
        direction="row"
        flexWrap="wrap"
        justifyContent="space-between"
        spacing={1.5}
      >
        <Box sx={{ display: 'grid', gap: 0.5, maxWidth: 720 }}>
          <Typography color="text.primary" fontSize={20} fontWeight={800} letterSpacing="-.4px">
            {section.title}
          </Typography>
          <SectionStatusBadge status={status} />
          <Typography color="text.secondary" fontSize={12} lineHeight={1.6}>
            {section.description}
          </Typography>
        </Box>
        <PanelMoreLink href={section.href} label="갤러리 열기" />
      </Stack>

      <Box
        sx={{
          alignItems: 'stretch',
          display: 'grid',
          gap: '14px',
          gridTemplateColumns: { md: 'minmax(240px, 1.25fr) minmax(0, 2fr)', xs: '1fr' },
        }}
      >
        {section.isLoading ? (
          <SectionContentSkeleton />
        ) : section.hasError ? (
          <PanelStatusMessage label={`Could not load ${section.title}.`} />
        ) : section.spotlight ? (
          <SpotlightCard spotlight={section.spotlight} variant={section.variant} />
        ) : (
          <EmptySpotlight variant={section.variant} />
        )}
        {section.isLoading || section.hasError ? null : (
          <Box
            sx={{
              alignItems: 'stretch',
              display: 'grid',
              gap: '12px',
              gridTemplateColumns: { sm: 'repeat(2, minmax(0, 1fr))', xs: '1fr' },
              minWidth: 0,
            }}
          >
            {section.tiles.length > 0 ? (
              section.tiles.map((tile) => <StoreTile key={tile.id} tile={tile} />)
            ) : (
              <EmptyTile />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

function SpotlightCard({
  spotlight,
  variant,
}: {
  spotlight: StoreSpotlightCard;
  variant: StoreSectionViewModel['variant'];
}) {
  const isApp = variant === 'app';

  return (
    <Box
      component={SmartLink}
      href={spotlight.href}
      sx={(theme) => ({
        background: isApp
          ? 'radial-gradient(circle at top right, rgba(34,211,238,.14), transparent 38%), linear-gradient(145deg, #f6f9ff 0%, #ffffff 65%)'
          : 'radial-gradient(circle at top right, rgba(124,95,207,.16), transparent 38%), linear-gradient(145deg, #fff8fb 0%, #ffffff 65%)',
        border: `1px solid ${alpha(isApp ? theme.workspace.colors.indigo : theme.workspace.colors.brand, 0.12)}`,
        borderRadius: '14px',
        boxShadow: '0 12px 30px rgba(15,23,42,.06)',
        color: 'text.primary',
        minWidth: 0,
        p: '18px',
        textDecoration: 'none',
        transition: '150ms ease',
        '&:hover': {
          borderColor: alpha(
            isApp ? theme.workspace.colors.blue : theme.workspace.colors.brand,
            0.22,
          ),
          boxShadow: '0 14px 30px rgba(15,23,42,.08)',
          transform: 'translateY(-1px)',
        },
      })}
    >
      <Stack
        alignItems="flex-start"
        direction="row"
        justifyContent="space-between"
        spacing={1.5}
        sx={{ mb: 1.75 }}
      >
        <Box
          sx={{
            alignItems: 'center',
            background: spotlight.iconBackground,
            borderRadius: '14px',
            boxShadow: isApp ? '0 10px 24px rgba(79,140,255,.2)' : '0 10px 24px rgba(180,14,77,.2)',
            color: '#fff',
            display: 'flex',
            height: 44,
            justifyContent: 'center',
            width: 44,
          }}
        >
          {getStoreIcon(spotlight.icon, 22)}
        </Box>
        <Box
          sx={(theme) => ({
            bgcolor: theme.workspace.colors.brandBackground,
            borderRadius: 999,
            color: theme.workspace.colors.brand,
            fontSize: 10,
            fontWeight: 700,
            px: 1.25,
            py: 0.75,
            whiteSpace: 'nowrap',
          })}
        >
          {spotlight.stateLabel}
        </Box>
      </Stack>
      <Typography
        sx={(theme) => ({
          color: isApp ? theme.workspace.colors.blue : theme.workspace.colors.purple,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '.08em',
          mb: 1,
          textTransform: 'uppercase',
        })}
      >
        {spotlight.eyebrow}
      </Typography>
      <Typography fontSize={22} fontWeight={800} letterSpacing="-.4px" sx={{ mb: 1 }}>
        {spotlight.title}
      </Typography>
      <Typography color="text.secondary" fontSize={12} lineHeight={1.65} sx={{ mb: 1.75 }}>
        {spotlight.description}
      </Typography>
      <Stack spacing={1} sx={{ mb: 1.75 }}>
        {spotlight.points.map((point) => (
          <Stack alignItems="flex-start" direction="row" key={point.text} spacing={1}>
            <Box
              sx={(theme) => ({
                color: isApp ? theme.workspace.colors.blue : theme.workspace.colors.brand,
                display: 'inline-flex',
                mt: 0.25,
              })}
            >
              {getStoreIcon(point.icon, 15)}
            </Box>
            <Typography color="text.primary" fontSize={11} lineHeight={1.5}>
              {point.text}
            </Typography>
          </Stack>
        ))}
      </Stack>
      <Stack direction="row" flexWrap="wrap" gap={1}>
        {spotlight.tags.map((tag) => (
          <Box
            key={tag}
            sx={(theme) => ({
              alignItems: 'center',
              bgcolor: 'rgba(255,255,255,.86)',
              border: `1px solid ${theme.workspace.colors.border}`,
              borderRadius: 999,
              color: 'text.secondary',
              display: 'inline-flex',
              fontSize: 10,
              fontWeight: 700,
              gap: 0.5,
              px: 1.25,
              py: 0.75,
            })}
          >
            <SellRoundedIcon sx={{ fontSize: 12 }} />
            {tag}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

function StoreTile({ tile }: { tile: StoreTileViewModel }) {
  return (
    <Box
      component={SmartLink}
      href={tile.href}
      sx={(theme) => ({
        alignItems: 'flex-start',
        background: 'linear-gradient(180deg,#f8fafc 0%,#ffffff 100%)',
        border: `1px solid ${theme.workspace.colors.border}`,
        borderRadius: '14px',
        color: 'text.primary',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 152,
        minWidth: 0,
        p: '14px 13px 12px',
        textDecoration: 'none',
        transition: 'all .15s',
        '&:hover': {
          background: '#fff',
          borderColor: alpha(theme.workspace.colors.brand, 0.2),
          boxShadow: '0 3px 10px rgba(0,0,0,.07)',
        },
      })}
    >
      <Box
        sx={{
          alignItems: 'center',
          background: tile.iconBackground,
          borderRadius: '11px',
          color: '#fff',
          display: 'flex',
          height: 36,
          justifyContent: 'center',
          mb: 1.25,
          width: 36,
        }}
      >
        {getStoreIcon(tile.icon, 18)}
      </Box>
      <Typography fontSize={13} fontWeight={600} sx={{ mb: 0.75 }}>
        {tile.name}
      </Typography>
      <Typography
        color="text.disabled"
        fontSize={11}
        lineHeight={1.45}
        sx={{
          display: '-webkit-box',
          mb: 1.25,
          minHeight: 48,
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
        }}
      >
        {tile.description}
      </Typography>
      <Box
        sx={(theme) => {
          const tone = getTileTagTone(tile.tagTone, theme.workspace.colors);
          return {
            bgcolor: tone.background,
            borderRadius: '4px',
            color: tone.color,
            display: 'inline-block',
            fontSize: 9,
            fontWeight: 700,
            mt: 'auto',
            px: 0.75,
            py: 0.25,
            textTransform: 'uppercase',
          };
        }}
      >
        {tile.tag}
      </Box>
    </Box>
  );
}

function EmptySpotlight({ variant }: { variant: StoreSectionViewModel['variant'] }) {
  return (
    <Box
      sx={(theme) => ({
        border: `1px dashed ${theme.workspace.colors.borderStrong}`,
        borderRadius: '14px',
        color: 'text.secondary',
        fontSize: 12,
        minHeight: 220,
        p: '18px',
      })}
    >
      {variant === 'app'
        ? 'No App Gallery recommendations are available.'
        : 'No AI Gallery recommendations are available.'}
    </Box>
  );
}

function EmptyTile() {
  return (
    <Box
      sx={(theme) => ({
        border: `1px dashed ${theme.workspace.colors.borderStrong}`,
        borderRadius: '14px',
        color: 'text.secondary',
        fontSize: 12,
        minHeight: 152,
        p: '14px 13px 12px',
      })}
    >
      No gallery items are available.
    </Box>
  );
}

function StoreDivider() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        alignItems: 'center',
        display: 'flex',
        my: '18px',
        '&::before, &::after': {
          content: '""',
          flex: 1,
          height: 1,
        },
        '&::before': {
          background:
            'linear-gradient(90deg, rgba(214,216,219,0) 0%, rgba(214,216,219,.95) 18%, rgba(180,14,77,.22) 100%)',
        },
        '&::after': {
          background:
            'linear-gradient(90deg, rgba(180,14,77,.22) 0%, rgba(214,216,219,.95) 82%, rgba(214,216,219,0) 100%)',
        },
      }}
    />
  );
}

function SectionContentSkeleton() {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: '14px',
        gridColumn: '1 / -1',
        gridTemplateColumns: { md: 'minmax(240px, 1.25fr) minmax(0, 2fr)', xs: '1fr' },
      }}
    >
      <Skeleton height={240} variant="rounded" />
      <Skeleton height={240} variant="rounded" />
    </Box>
  );
}

function getStoreIcon(name: string, fontSize: number) {
  const sx = { fontSize };

  switch (name) {
    case 'dashboard':
    case 'dashboard_customize':
      return <DashboardRoundedIcon sx={sx} />;
    case 'hub':
      return <HubRoundedIcon sx={sx} />;
    case 'link':
      return <LinkRoundedIcon sx={sx} />;
    case 'menu_book':
      return <MenuBookRoundedIcon sx={sx} />;
    case 'monitoring':
      return <QueryStatsRoundedIcon sx={sx} />;
    case 'rocket_launch':
      return <RocketLaunchRoundedIcon sx={sx} />;
    case 'terminal':
      return <TerminalRoundedIcon sx={sx} />;
    case 'vpn_key':
      return <VpnKeyRoundedIcon sx={sx} />;
    case 'code':
      return <CodeRoundedIcon sx={sx} />;
    case 'smart_toy':
    default:
      return <SmartToyRoundedIcon sx={sx} />;
  }
}
