import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { Avatar, Box, ButtonBase, Tooltip, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import { SectionStatusBadge } from '@/components/reference-status';
import { routes } from '@/config/routes';
import { AppHeaderNotifications } from '@/features/app-shell/components/AppHeaderNotifications';
import { AppHeaderSearch } from '@/features/app-shell/components/AppHeaderSearch';
import { AxLogoMark } from '@/features/app-shell/components/AxLogoMark';
import { ServiceMenuPanel } from '@/features/app-shell/components/ServiceMenuPanel';
import { getInitials } from '@/features/app-shell/components/utils';
import {
  useCurrentUserQuery,
  useServiceMenuQuery,
} from '@/features/app-shell/hooks/useAppShellQueries';
import { appShellSectionStatus } from '@/features/app-shell/sectionStatus';
import { useAppStore } from '@/stores/appStore';

const HeaderRoot = styled('header')(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.98),
  borderBottom: `1px solid ${theme.workspace.colors.border}`,
  height: theme.workspace.layout.topbarHeight,
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.appBar,
}));

const HeaderInner = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  gap: theme.spacing(1.5),
  height: '100%',
  margin: '0 auto',
  maxWidth: theme.workspace.layout.navMaxWidth,
  padding: theme.spacing(0, 3),
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1),
    padding: theme.spacing(0, 2),
  },
}));

const BrandLink = styled(RouterLink)(({ theme }) => ({
  alignItems: 'center',
  color: theme.palette.text.primary,
  display: 'inline-flex',
  flexShrink: 0,
  gap: theme.spacing(1.25),
  textDecoration: 'none',
  '&:focus-visible': {
    outline: theme.workspace.focus.outline,
    outlineOffset: theme.workspace.focus.outlineOffset,
  },
}));

const ServiceMenuButton = styled(ButtonBase)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.workspace.colors.surfaceSoft,
  border: `1px solid ${theme.workspace.colors.border}`,
  borderRadius: 12,
  color: theme.palette.text.primary,
  display: 'inline-flex',
  flexShrink: 0,
  gap: theme.spacing(1),
  height: 40,
  padding: theme.spacing(0, 1.375),
  transition: theme.transitions.create(['background-color', 'box-shadow'], {
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover, &[data-open="true"]': {
    backgroundColor: theme.palette.background.default,
    boxShadow: `inset 0 0 0 1px ${theme.workspace.colors.border}`,
  },
  '&:focus-visible': {
    outline: theme.workspace.focus.outline,
    outlineOffset: theme.workspace.focus.outlineOffset,
  },
}));

const ReferenceStatusToggle = styled(ButtonBase)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.workspace.colors.surfaceSoft,
  border: `1px solid ${theme.workspace.colors.border}`,
  borderRadius: 999,
  color: theme.palette.text.secondary,
  display: 'inline-flex',
  flexShrink: 0,
  gap: theme.spacing(0.625),
  height: 34,
  padding: theme.spacing(0, 1),
  transition: theme.transitions.create(
    ['background-color', 'border-color', 'color', 'box-shadow'],
    {
      duration: theme.transitions.duration.shortest,
    },
  ),
  '&:hover': {
    backgroundColor: theme.palette.background.default,
    boxShadow: `inset 0 0 0 1px ${theme.workspace.colors.border}`,
  },
  '&[data-active="true"]': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    borderColor: alpha(theme.palette.primary.main, 0.24),
    color: theme.palette.primary.main,
  },
  '&:focus-visible': {
    outline: theme.workspace.focus.outline,
    outlineOffset: theme.workspace.focus.outlineOffset,
  },
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    padding: 0,
    width: 34,
    '& .reference-status-toggle-label': {
      display: 'none',
    },
  },
}));

const AvatarLink = styled(RouterLink)(({ theme }) => ({
  borderRadius: '50%',
  display: 'inline-flex',
  flexShrink: 0,
  textDecoration: 'none',
  '&:focus-visible': {
    outline: theme.workspace.focus.outline,
    outlineOffset: theme.workspace.focus.outlineOffset,
  },
}));

export function AppHeader() {
  const location = useLocation();
  const currentUserQuery = useCurrentUserQuery();
  const referenceStatusVisible = useAppStore((state) => state.referenceStatusVisible);
  const toggleReferenceStatusVisible = useAppStore((state) => state.toggleReferenceStatusVisible);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const serviceMenuQuery = useServiceMenuQuery({ enabled: isMenuOpen });
  const rootRef = useRef<HTMLElement | null>(null);
  const currentUser = currentUserQuery.data;
  const unreadNotificationCount = currentUser?.summary.unreadNotificationCount ?? 0;
  const ReferenceStatusIcon = referenceStatusVisible
    ? VisibilityRoundedIcon
    : VisibilityOffRoundedIcon;
  const referenceStatusToggleLabel = referenceStatusVisible
    ? 'Hide progress status badges'
    : 'Show progress status badges';

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const closeOnOutsideInteraction = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', closeOnOutsideInteraction);
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('mousedown', closeOnOutsideInteraction);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isMenuOpen]);

  return (
    <HeaderRoot data-ref="app-header" ref={rootRef}>
      <HeaderInner>
        <BrandLink aria-label="AX Studio" to="/">
          <AxLogoMark />
          <Typography fontSize={15} fontWeight={800} letterSpacing="-0.035em" whiteSpace="nowrap">
            AX Studio
          </Typography>
        </BrandLink>
        <SectionStatusBadge status={appShellSectionStatus.topbar} />

        <ServiceMenuButton
          aria-controls={isMenuOpen ? 'service-menu-panel' : undefined}
          aria-expanded={isMenuOpen}
          aria-haspopup="true"
          aria-label="Open service menu"
          data-open={isMenuOpen ? 'true' : undefined}
          data-ref="service-menu-trigger"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <AppsRoundedIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
          <ExpandMoreRoundedIcon
            sx={{
              color: isMenuOpen ? 'primary.main' : 'text.disabled',
              fontSize: 18,
              transform: isMenuOpen ? 'rotate(180deg)' : 'none',
              transition: 'transform 180ms ease, color 150ms ease',
            }}
          />
        </ServiceMenuButton>
        <SectionStatusBadge status={appShellSectionStatus.serviceMenu} />

        <AppHeaderSearch />
        <Box sx={{ flexGrow: 1 }} />

        <AppHeaderNotifications unreadCount={unreadNotificationCount} />

        <Tooltip title={referenceStatusToggleLabel}>
          <ReferenceStatusToggle
            aria-label={referenceStatusToggleLabel}
            aria-pressed={referenceStatusVisible}
            data-active={referenceStatusVisible ? 'true' : undefined}
            data-ref="reference-status-toggle"
            onClick={toggleReferenceStatusVisible}
          >
            <ReferenceStatusIcon sx={{ fontSize: 18 }} />
            <Typography
              className="reference-status-toggle-label"
              component="span"
              fontSize={12}
              fontWeight={800}
            >
              Progress {referenceStatusVisible ? 'on' : 'off'}
            </Typography>
          </ReferenceStatusToggle>
        </Tooltip>

        <AvatarLink
          aria-label="Open Account Settings"
          data-ref="current-user-avatar"
          to={routes.accountSettings}
        >
          <Avatar
            alt={currentUser?.displayName ?? 'Current user'}
            src={currentUser?.photo ? `data:image/png;base64,${currentUser.photo}` : undefined}
            sx={{ bgcolor: 'primary.main', fontSize: 12, fontWeight: 800, height: 32, width: 32 }}
          >
            {currentUser ? getInitials(currentUser.name || currentUser.email) : 'AX'}
          </Avatar>
        </AvatarLink>
        <SectionStatusBadge status={appShellSectionStatus.currentUser} />
      </HeaderInner>

      {isMenuOpen ? (
        <ServiceMenuPanel
          currentPath={location.pathname}
          groups={serviceMenuQuery.data ?? []}
          isLoading={serviceMenuQuery.isLoading}
          onClose={() => setIsMenuOpen(false)}
        />
      ) : null}
    </HeaderRoot>
  );
}
