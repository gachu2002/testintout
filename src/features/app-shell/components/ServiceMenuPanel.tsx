import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { alpha, styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

import { SectionStatusBadge } from '@/components/reference-status';
import { focusVisibleStyles } from '@/components/workspace';
import { WorkspaceIcon } from '@/components/WorkspaceIcon';
import { isInternalHref } from '@/config/routes';
import { appShellSectionStatus } from '@/features/app-shell/sectionStatus';
import type { ServiceMenuGroup, ServiceMenuLink } from '@/features/app-shell/types';

const serviceOutlinks = [
  {
    href: 'https://dej-chatbot.apps.hedej.lge.com',
    label: 'DEJ 챗봇',
  },
  {
    href: 'https://workspace.hedej.lge.com/heans',
    label: 'HEANS',
  },
  {
    href: 'https://workspace.hedej.lge.com/hevpds',
    label: 'HEVPDS',
  },
] as const;

const PanelRoot = styled(Box)(({ theme }) => ({
  background: theme.workspace.gradients.menuSurface,
  borderBottom: `1px solid ${theme.workspace.colors.border}`,
  borderTop: `1px solid ${alpha(theme.workspace.colors.border, 0.9)}`,
  boxShadow: theme.workspace.shadows.popover,
  left: 0,
  maxHeight: `calc(100vh - ${theme.workspace.layout.topbarHeight}px)`,
  overflowX: 'hidden',
  overflowY: 'auto',
  overscrollBehaviorY: 'contain',
  padding: theme.spacing(2.25, 0, 2.5),
  position: 'fixed',
  top: theme.workspace.layout.topbarHeight,
  width: '100vw',
  zIndex: theme.zIndex.appBar + 1,
}));

const PanelInner = styled(Box)(({ theme }) => ({
  margin: '0 auto',
  maxWidth: theme.workspace.layout.navMaxWidth,
  padding: theme.spacing(0, 3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 2),
  },
}));

const ServiceGroupGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    rowGap: theme.spacing(2),
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

const ServiceGroupColumn = styled('section')(({ theme }) => ({
  minWidth: 0,
  padding: theme.spacing(0, 3.75),
  '& + &': {
    borderLeft: `1px solid ${theme.workspace.colors.border}`,
  },
  [theme.breakpoints.down('lg')]: {
    borderLeft: '0 !important',
    padding: theme.spacing(0, 2.25),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5, 0),
    '& + &': {
      borderTop: `1px solid ${theme.workspace.colors.border}`,
    },
  },
}));

const serviceLinkStyles = ({ theme }: { theme: Theme }) => ({
  alignItems: 'flex-start',
  borderRadius: 10,
  color: theme.palette.text.primary,
  display: 'grid',
  fontSize: 13,
  fontWeight: 600,
  gap: theme.spacing(1.25),
  gridTemplateColumns: '18px minmax(0, 1fr)',
  margin: theme.spacing(0, -1.25),
  padding: theme.spacing(0.875, 1.25),
  textDecoration: 'none',
  transition: theme.transitions.create(['background-color', 'color', 'box-shadow'], {
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover, &[data-current="true"]': {
    backgroundColor: alpha(theme.palette.background.paper, 0.86),
    color: theme.palette.primary.main,
  },
  '&:hover .service-link-icon, &[data-current="true"] .service-link-icon': {
    color: theme.palette.primary.main,
  },
  '&[data-current="true"]': {
    boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.primary.main, 0.08)}`,
  },
  ...focusVisibleStyles(theme),
});

const InternalServiceLink = styled(RouterLink)(serviceLinkStyles);
const ExternalServiceLink = styled('a')(serviceLinkStyles);

const OutlinksBar = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: alpha('#f8fafc', 0.72),
  borderTop: `1px solid ${alpha('#0f172a', 0.1)}`,
  boxShadow: `inset 0 1px 0 ${alpha(theme.palette.common.white, 0.72)}`,
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1.25),
  margin: theme.spacing(2, 0, -2.5),
  padding: theme.spacing(1.125, 3, 1.25),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(-2),
    padding: theme.spacing(1.125, 2),
  },
}));

const Outlink = styled('a')(({ theme }) => ({
  alignItems: 'center',
  color: theme.palette.text.secondary,
  display: 'inline-flex',
  fontSize: 12,
  fontWeight: 700,
  gap: 4,
  padding: theme.spacing(0.375, 1),
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.primary.main,
  },
  '& + &': {
    borderLeft: `1px solid ${theme.workspace.colors.border}`,
  },
  ...focusVisibleStyles(theme),
}));

type ServiceMenuPanelProps = {
  currentPath: string;
  groups: ServiceMenuGroup[];
  isLoading: boolean;
  onClose: () => void;
};

export function ServiceMenuPanel({
  currentPath,
  groups,
  isLoading,
  onClose,
}: ServiceMenuPanelProps) {
  return (
    <PanelRoot
      aria-label="Workspace service menu"
      data-ref="service-menu-panel"
      id="service-menu-panel"
    >
      <PanelInner>
        {isLoading ? (
          <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 180 }}>
            <CircularProgress size={24} />
          </Stack>
        ) : (
          <ServiceGroupGrid>
            {groups.map((group) => (
              <ServiceGroupColumn key={group.id}>
                <Typography fontSize={15} fontWeight={700} sx={{ mb: 2.25 }}>
                  {group.title}
                </Typography>
                <Stack spacing={1.5}>
                  {group.links.map((link) => (
                    <ServiceMenuLinkItem
                      currentPath={currentPath}
                      key={link.href}
                      link={link}
                      onClose={onClose}
                    />
                  ))}
                </Stack>
              </ServiceGroupColumn>
            ))}
          </ServiceGroupGrid>
        )}

        <OutlinksBar aria-label="External DEJ systems" data-ref="external-service-links">
          <Typography color="text.disabled" fontSize={10} fontWeight={800} letterSpacing="0.08em">
            DEJ SYSTEMS
          </Typography>
          <SectionStatusBadge status={appShellSectionStatus.externalLinks} />
          <Stack direction="row" flexWrap="wrap" gap={0.5}>
            {serviceOutlinks.map((link) => (
              <Outlink href={link.href} key={link.href} rel="noopener noreferrer" target="_blank">
                <OpenInNewRoundedIcon sx={{ fontSize: 13, opacity: 0.55 }} />
                {link.label}
                <NorthEastRoundedIcon sx={{ fontSize: 13, opacity: 0.55 }} />
              </Outlink>
            ))}
          </Stack>
        </OutlinksBar>
      </PanelInner>
    </PanelRoot>
  );
}

function ServiceMenuLinkItem({
  currentPath,
  link,
  onClose,
}: {
  currentPath: string;
  link: ServiceMenuLink;
  onClose: () => void;
}) {
  const isCurrent = currentPath === link.href;
  const content = (
    <>
      <WorkspaceIcon
        className="service-link-icon"
        name={link.icon}
        sx={{ color: 'text.secondary', fontSize: 18, mt: 0.25 }}
      />
      <Box minWidth={0}>
        <Typography fontSize={13} fontWeight={700} lineHeight={1.35}>
          {link.label}
        </Typography>
        <Typography color="text.secondary" fontSize={12} fontWeight={400} lineHeight={1.45}>
          {link.description}
        </Typography>
      </Box>
    </>
  );

  if (isInternalHref(link.href)) {
    return (
      <InternalServiceLink
        data-current={isCurrent ? 'true' : undefined}
        onClick={onClose}
        to={link.href}
      >
        {content}
      </InternalServiceLink>
    );
  }

  return (
    <ExternalServiceLink
      href={link.href}
      onClick={onClose}
      rel="noopener noreferrer"
      target="_blank"
    >
      {content}
    </ExternalServiceLink>
  );
}
