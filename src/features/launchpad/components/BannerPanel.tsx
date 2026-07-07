import EventRoundedIcon from '@mui/icons-material/EventRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import { Box, Button, Paper, Skeleton, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import { SectionStatusBadge } from '@/components/reference-status';
import { SmartLink } from '@/components/SmartLink';
import { focusVisibleStyles } from '@/components/workspace';
import { WorkspaceIcon } from '@/components/WorkspaceIcon';
import type { ServiceMenuGroup } from '@/features/app-shell/types';
import { launchpadSectionStatus } from '@/features/launchpad/sectionStatus';
import type {
  LaunchpadAnnouncement,
  LaunchpadBanner,
  LaunchpadHero,
} from '@/features/launchpad/types';
import {
  buildBannerSlides,
  getSlideVisual,
  type ReferenceBannerSlide,
} from '@/features/launchpad/utils/bannerSlides';

import { BannerVisualCard, DejPipelineBackground, DejSnapshot } from './BannerVisuals';

export function BannerPanel({
  activeIndex,
  announcements,
  banners,
  hero,
  isLoading,
  onSelect,
  showAnnouncementsError = false,
  serviceGroups,
}: {
  activeIndex: number;
  announcements: LaunchpadAnnouncement[];
  banners: LaunchpadBanner[];
  hero?: LaunchpadHero;
  isLoading: boolean;
  onSelect: (index: number) => void;
  showAnnouncementsError?: boolean;
  serviceGroups: ServiceMenuGroup[];
}) {
  const [isPaused, setIsPaused] = useState(false);
  const slides = isLoading ? [] : buildBannerSlides(banners, announcements, hero, serviceGroups);
  const safeIndex = activeIndex >= 0 && activeIndex < slides.length ? activeIndex : 0;

  useEffect(() => {
    if (isLoading || isPaused || slides.length < 2) return;

    const intervalId = window.setInterval(() => {
      onSelect((safeIndex + 1) % slides.length);
    }, 10000);

    return () => window.clearInterval(intervalId);
  }, [isLoading, isPaused, onSelect, safeIndex, slides.length]);

  if (isLoading) {
    return (
      <Paper
        sx={(theme) => ({
          border: `1px solid ${theme.workspace.colors.border}`,
          borderRadius: '18px',
          overflow: 'hidden',
          p: { md: '26px 30px 24px', xs: '24px 22px 20px' },
        })}
      >
        <Skeleton height={30} width={160} />
        <Skeleton height={40} sx={{ mt: 1.5 }} width="56%" />
        <Skeleton height={22} sx={{ mt: 1 }} width="72%" />
        <Stack direction="row" spacing={1.25} sx={{ mt: 2 }}>
          <Skeleton height={40} variant="rounded" width={132} />
          <Skeleton height={40} variant="rounded" width={104} />
        </Stack>
      </Paper>
    );
  }

  if (slides.length === 0) return null;
  return (
    <Box
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      sx={{ display: 'grid', gap: '2px' }}
    >
      <Box sx={{ display: 'grid' }}>
        {slides.map((slide, index) => (
          <BannerSlideFrame
            hero={hero}
            isActive={index === safeIndex}
            key={slide.id}
            showAnnouncementsError={showAnnouncementsError}
            slide={slide}
          />
        ))}
      </Box>
      <BannerDots activeIndex={safeIndex} onSelect={onSelect} slides={slides} />
    </Box>
  );
}

function BannerSlideFrame({
  hero,
  isActive,
  showAnnouncementsError,
  slide,
}: {
  hero?: LaunchpadHero;
  isActive: boolean;
  showAnnouncementsError: boolean;
  slide: ReferenceBannerSlide;
}) {
  const visual = getSlideVisual(slide.variant);
  const isDark = slide.variant !== 'release';
  const isRelease = slide.variant === 'release';
  const hasVisualSide = slide.variant === 'dej' || slide.visualMode !== 'none';
  const titleMaxWidth = !hasVisualSide
    ? 860
    : slide.variant === 'release'
      ? 620
      : slide.variant === 'dej'
        ? 860
        : 680;
  const descriptionMaxWidth = !hasVisualSide
    ? 860
    : slide.variant === 'release'
      ? 520
      : slide.variant === 'dej'
        ? 860
        : 680;

  return (
    <Paper
      aria-hidden={!isActive}
      sx={(theme) => ({
        alignItems: { md: 'center', xs: 'flex-start' },
        alignSelf: 'stretch',
        background: visual.background,
        border: `1px solid ${visual.borderColor}`,
        borderRadius: '18px',
        boxShadow: visual.shadow,
        color: isDark ? '#fff' : theme.palette.text.primary,
        display: hasVisualSide ? 'flex' : 'block',
        gridArea: '1 / 1',
        isolation: 'isolate',
        minHeight: { md: hasVisualSide ? 168 : 0, xs: 'auto' },
        opacity: isActive ? 1 : 0,
        overflow: 'hidden',
        p: { md: visual.padding, xs: '24px 22px 20px' },
        pointerEvents: isActive ? 'auto' : 'none',
        position: 'relative',
        transform: isActive ? 'translateX(0)' : 'translateX(12px)',
        transition: 'opacity .45s ease, transform .45s ease',
        width: '100%',
      })}
    >
      {slide.variant === 'dej' || slide.showBackdrop ? <DejPipelineBackground /> : null}

      <Stack
        alignItems={{ md: 'center', xs: 'flex-start' }}
        direction={{ md: 'row', xs: 'column' }}
        justifyContent="space-between"
        spacing={3}
        sx={{ position: 'relative', width: '100%', zIndex: 2 }}
      >
        <Box maxWidth={hasVisualSide ? 720 : '100%'}>
          <Stack
            alignItems="center"
            direction="row"
            spacing={0.625}
            sx={{
              bgcolor: isDark
                ? alpha('#fff', 0.13)
                : isRelease
                  ? 'rgba(255,255,255,.82)'
                  : 'transparent',
              borderRadius: 999,
              boxShadow: isDark
                ? `inset 0 0 0 1px ${alpha('#fff', 0.12)}`
                : isRelease
                  ? 'inset 0 0 0 1px rgba(244,114,182,.18)'
                  : 'none',
              color: isDark ? '#e0f7ff' : isRelease ? '#be185d' : 'primary.main',
              display: 'inline-flex',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: isDark ? '.1em' : '1.6px',
              mb: 1.5,
              px: isDark || isRelease ? 1.125 : 0,
              py: isDark || isRelease ? 0.75 : 0,
              textTransform: 'uppercase',
            }}
          >
            {getSlideIcon(slide)}
            {slide.eyebrow}
            <SectionStatusBadge disabled={!isActive} status={launchpadSectionStatus.banner} />
          </Stack>
          <Typography
            component="h2"
            sx={{
              color: isDark ? '#fff' : isRelease ? '#831843' : 'text.primary',
              fontSize: { sm: slide.variant === 'dej' ? 24 : 23, xs: 21 },
              fontWeight: 800,
              letterSpacing: slide.variant === 'dej' ? '-.7px' : '-.5px',
              lineHeight: slide.variant === 'dej' ? 1.26 : 1.3,
              maxWidth: titleMaxWidth,
              mb: 1.25,
              textShadow: isDark
                ? slide.variant === 'dej'
                  ? '0 3px 16px rgba(0,0,0,.72), 0 0 1px rgba(255,255,255,.6)'
                  : '0 3px 16px rgba(0,0,0,.55)'
                : 'none',
            }}
          >
            {slide.title}
          </Typography>
          <Typography
            sx={{
              color: isDark
                ? 'rgba(236,249,255,.9)'
                : isRelease
                  ? 'rgba(131,24,67,.84)'
                  : 'text.secondary',
              fontSize: 13,
              lineHeight: slide.variant === 'release' ? 1.6 : 1.65,
              maxWidth: descriptionMaxWidth,
              textShadow: isDark
                ? slide.variant === 'dej'
                  ? '0 2px 10px rgba(0,0,0,.58)'
                  : '0 2px 10px rgba(0,0,0,.44)'
                : 'none',
            }}
          >
            {slide.description}
          </Typography>

          <BannerActions isInteractive={isActive} slide={slide} visual={visual} />
        </Box>

        {hasVisualSide || showAnnouncementsError ? (
          <Stack
            alignItems="center"
            spacing={2}
            sx={{
              minWidth: { md: hasVisualSide ? 240 : 0, xs: 0 },
              width: { md: 'auto', xs: '100%' },
            }}
          >
            {slide.variant === 'dej' ? <DejSnapshot hero={hero} slide={slide} /> : null}
            {slide.variant !== 'dej' && slide.visualMode !== 'none' ? (
              <BannerVisualCard slide={slide} />
            ) : null}
            {showAnnouncementsError ? <AnnouncementErrorNotice isDark={isDark} /> : null}
          </Stack>
        ) : null}
      </Stack>
    </Paper>
  );
}

function BannerActions({
  inSide = false,
  isInteractive = true,
  slide,
  visual,
}: {
  inSide?: boolean;
  isInteractive?: boolean;
  slide: ReferenceBannerSlide;
  visual: ReturnType<typeof getSlideVisual>;
}) {
  return (
    <Stack
      direction="row"
      spacing={1.5}
      sx={{ mt: inSide ? 0 : 1.75, width: { xs: '100%', sm: inSide ? 'auto' : 'fit-content' } }}
    >
      <Button
        component={SmartLink}
        href={slide.primaryHref}
        sx={{
          background: visual.ctaBackground,
          borderRadius: '10px',
          boxShadow: visual.ctaShadow,
          color: visual.ctaColor,
          flex: { xs: 1, sm: '0 0 auto' },
          fontSize: 13,
          gap: 0.75,
          fontWeight: 700,
          height: 40,
          minWidth: 106,
          px: 2.5,
          textTransform: 'none',
          '&:hover': { background: visual.ctaHoverBackground, transform: 'translateY(-1px)' },
        }}
        tabIndex={isInteractive ? undefined : -1}
      >
        {slide.primaryIcon ? (
          <WorkspaceIcon name={slide.primaryIcon} sx={{ fontSize: 17 }} />
        ) : null}
        {slide.primaryLabel}
      </Button>
      {slide.secondaryLabel && slide.secondaryHref ? (
        <Button
          component={SmartLink}
          href={slide.secondaryHref}
          sx={{
            bgcolor: visual.ghostBackground,
            border: `1px solid ${visual.ghostBorder}`,
            borderRadius: '10px',
            color: visual.ghostColor,
            flex: { xs: 1, sm: '0 0 auto' },
            fontSize: 13,
            gap: 0.75,
            fontWeight: 600,
            height: 40,
            minWidth: 88,
            px: 2.25,
            textTransform: 'none',
            '&:hover': {
              bgcolor: visual.ghostHoverBackground,
              borderColor: visual.ghostHoverBorder,
            },
          }}
          tabIndex={isInteractive ? undefined : -1}
        >
          {slide.secondaryIcon ? (
            <WorkspaceIcon name={slide.secondaryIcon} sx={{ fontSize: 17 }} />
          ) : null}
          {slide.secondaryLabel}
        </Button>
      ) : null}
    </Stack>
  );
}

function BannerDots({
  activeIndex,
  onSelect,
  slides,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
  slides: ReferenceBannerSlide[];
}) {
  if (slides.length < 2) return null;

  return (
    <Stack direction="row" justifyContent="center" spacing={0.75}>
      {slides.map((slide, index) => (
        <Box
          aria-current={index === activeIndex}
          aria-label={`View ${slide.eyebrow} banner`}
          component="button"
          key={slide.id}
          onClick={() => onSelect(index)}
          sx={(theme) => ({
            bgcolor: index === activeIndex ? theme.workspace.colors.brand : 'rgba(95,101,109,.45)',
            border: 0,
            borderRadius: 99,
            cursor: 'pointer',
            height: 6,
            p: 0,
            transition: 'all .2s',
            width: index === activeIndex ? 20 : 6,
            ...focusVisibleStyles(theme),
          })}
          type="button"
        />
      ))}
    </Stack>
  );
}

function AnnouncementErrorNotice({ isDark }: { isDark: boolean }) {
  return (
    <Typography
      sx={{
        color: isDark ? 'rgba(236,249,255,.72)' : 'text.disabled',
        fontSize: 11,
        textAlign: 'center',
      }}
    >
      Announcement feed unavailable.
    </Typography>
  );
}

function getSlideIcon(slide: ReferenceBannerSlide) {
  if (slide.eyebrowIcon) return <WorkspaceIcon name={slide.eyebrowIcon} sx={{ fontSize: 13 }} />;
  if (slide.variant === 'dej') return <TimelineRoundedIcon sx={{ fontSize: 13 }} />;
  if (slide.variant === 'release') return <RocketLaunchRoundedIcon sx={{ fontSize: 13 }} />;
  if (slide.variant === 'learning' || slide.variant === 'research') {
    return <EventRoundedIcon sx={{ fontSize: 13 }} />;
  }

  return <SecurityRoundedIcon sx={{ fontSize: 13 }} />;
}
