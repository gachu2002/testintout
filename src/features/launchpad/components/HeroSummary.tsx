import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { Box, Skeleton, Stack, Typography } from '@mui/material';
import { styled, type Theme } from '@mui/material/styles';

import { SectionStatusBadge } from '@/components/reference-status';
import { SmartLink } from '@/components/SmartLink';
import { IconTile, Panel } from '@/components/workspace';
import { WorkspaceIcon } from '@/components/WorkspaceIcon';
import { routes } from '@/config/routes';
import type { CurrentUser } from '@/features/app-shell/types';
import { launchpadSectionStatus } from '@/features/launchpad/sectionStatus';
import type { HeroStat, LaunchpadHero } from '@/features/launchpad/types';

const LoadingPanel = styled(Panel)(({ theme }) => ({
  borderRadius: theme.workspace.radii.sm,
  padding: theme.spacing(1.5),
}));

const HeroRoot = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
}));

const HeroCopy = styled(Box)({
  minWidth: 0,
});

const HeroTitle = styled('h1')({
  fontSize: 20,
  fontWeight: 700,
  letterSpacing: '-.45px',
  lineHeight: 1.4,
  margin: 0,
});

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 12,
  marginTop: theme.spacing(0.25),
}));

const StatsList = styled(Stack)({
  flexDirection: 'row',
  flexShrink: 0,
  flexWrap: 'wrap',
  gap: 8,
});

const statCardStyles = (theme: Theme) => ({
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.workspace.colors.border}`,
  borderRadius: theme.workspace.radii.sm,
  color: theme.palette.text.primary,
  display: 'flex',
  gap: 7,
  padding: '6px 10px',
  textDecoration: 'none',
  transition: theme.transitions.create(['border-color', 'box-shadow', 'transform'], {
    duration: theme.transitions.duration.shortest,
  }),
  whiteSpace: 'nowrap',
});

const StatCard = styled('div')(({ theme }) => statCardStyles(theme));

const StatCardLink = styled(SmartLink)(({ theme }) => ({
  ...statCardStyles(theme),
  '&:hover': {
    borderColor: 'rgba(79,140,255,.26)',
    boxShadow: '0 10px 22px rgba(79,140,255,.1)',
    transform: 'translateY(-1px)',
  },
}));

const StatValue = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'statColor',
})<{ statColor: string }>(({ statColor }) => ({
  background: statColor,
  backgroundClip: 'text',
  fontSize: 13,
  fontWeight: 700,
  lineHeight: 1.15,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: 9,
  lineHeight: 1.2,
  marginTop: theme.spacing(0.125),
}));

export function HeroSummary({
  hero,
  isLoading,
  user,
}: {
  hero?: LaunchpadHero;
  isLoading: boolean;
  user?: CurrentUser;
}) {
  if (isLoading) {
    return (
      <LoadingPanel>
        <Skeleton height={26} width="34%" />
        <Skeleton height={18} width="48%" />
        <Stack direction={{ sm: 'row', xs: 'column' }} spacing={1} sx={{ mt: 1.25 }}>
          {[0, 1, 2, 3].map((item) => (
            <Skeleton height={46} key={item} sx={{ flex: 1, borderRadius: 1 }} variant="rounded" />
          ))}
        </Stack>
      </LoadingPanel>
    );
  }

  const fallbackDisplayName = user?.givenName || user?.fullname || hero?.userName || 'AX Studio';
  const title = hero?.title ?? `Hello, ${fallbackDisplayName}`;
  const subtitle =
    hero?.subtitle ??
    `Keep building today. You have ${user?.summary.unreadNotificationCount ?? 0} unread notifications.`;
  const stats = hero?.heroStats ?? [];

  return (
    <HeroRoot data-ref="launchpad-hero">
      <HeroCopy>
        <HeroTitle>
          {title} <AutoAwesomeRoundedIcon sx={{ color: 'primary.main', fontSize: 17, mb: -0.25 }} />
          <SectionStatusBadge status={launchpadSectionStatus.hero} />
        </HeroTitle>
        <HeroSubtitle>{subtitle}</HeroSubtitle>
      </HeroCopy>

      <StatsList>
        {stats.map((stat) => (
          <StatItem key={stat.key} stat={stat} />
        ))}
      </StatsList>
    </HeroRoot>
  );
}

function StatItem({ stat }: { stat: HeroStat }) {
  const isWorkspaceStat = stat.key === 'workspace';
  const statContent = (
    <>
      <IconTile sx={{ borderRadius: '7px' }} tileBackground={stat.color} tileSize={24}>
        <WorkspaceIcon name={stat.icon} sx={{ fontSize: 13 }} />
      </IconTile>
      <Box minWidth={0}>
        <StatValue noWrap statColor={stat.color}>
          {stat.value}
        </StatValue>
        <StatLabel noWrap>{stat.label}</StatLabel>
      </Box>
    </>
  );

  if (isWorkspaceStat) {
    return <StatCardLink href={routes.projects}>{statContent}</StatCardLink>;
  }

  return <StatCard>{statContent}</StatCard>;
}
