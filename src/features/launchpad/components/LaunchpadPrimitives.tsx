import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { ReactNode } from 'react';

import { SectionStatusBadge, type SectionStatusInfo } from '@/components/reference-status';
import { SmartLink } from '@/components/SmartLink';
import { Empty, focusVisibleStyles, Kicker, RowSkeletons } from '@/components/workspace';

const StatusEmpty = styled(Empty)(({ theme }) => ({
  borderRadius: theme.workspace.radii.lg,
  color: theme.palette.text.secondary,
  fontSize: 12,
  gridColumn: '1 / -1',
  padding: theme.spacing(2.25),
}));

export function ListSkeleton({ count }: { count: number }) {
  return <RowSkeletons count={count} />;
}

export function CompactLabel({
  icon,
  label,
  status,
}: {
  icon: ReactNode;
  label: string;
  status?: SectionStatusInfo;
}) {
  return (
    <Kicker sx={{ mb: 1.5 }}>
      <Box sx={{ display: 'inline-flex', flexShrink: 0 }}>{icon}</Box>
      <Box component="span" sx={{ lineHeight: 1 }}>
        {label}
      </Box>
      {status ? <SectionStatusBadge status={status} /> : null}
    </Kicker>
  );
}

export function RailHeader({
  action,
  icon,
  status,
  title,
}: {
  action?: ReactNode;
  icon: ReactNode;
  status?: SectionStatusInfo;
  title: string;
}) {
  return (
    <Kicker sx={{ mb: 1.5 }}>
      <Box sx={{ display: 'inline-flex', flexShrink: 0 }}>{icon}</Box>
      <Box component="span" sx={{ lineHeight: 1 }}>
        {title}
      </Box>
      {status ? <SectionStatusBadge status={status} /> : null}
      {action ? <Box sx={{ ml: 'auto' }}>{action}</Box> : null}
    </Kicker>
  );
}

export function HeaderTextAction({ label }: { label: string }) {
  return (
    <Typography
      color="text.disabled"
      fontSize={11}
      fontWeight={500}
      sx={{ cursor: 'default', letterSpacing: 0, textTransform: 'none' }}
    >
      {label}
    </Typography>
  );
}

export function PanelMoreLink({ href, label }: { href: string; label: string }) {
  return (
    <Stack
      alignItems="center"
      color="text.disabled"
      component={SmartLink}
      direction="row"
      fontSize={11}
      fontWeight={500}
      href={href}
      spacing={0.25}
      sx={(theme) => ({
        letterSpacing: 0,
        textDecoration: 'none',
        textTransform: 'none',
        '&:hover': { color: 'primary.main' },
        ...focusVisibleStyles(theme),
      })}
    >
      {label}
      <ChevronRightRoundedIcon sx={{ fontSize: 15 }} />
    </Stack>
  );
}

export function PanelStatusMessage({ label }: { label: string }) {
  return <StatusEmpty>{label}</StatusEmpty>;
}
