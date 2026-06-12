import { Box, Skeleton, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import type { ReactNode } from 'react';

import { IconTile } from '@/components/workspace/data';

const StatTileRoot = styled('article')(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: alpha(theme.palette.background.paper, 0.92),
  border: `1px solid ${alpha(theme.workspace.colors.borderStrong, 0.88)}`,
  borderRadius: theme.workspace.radii.xl,
  display: 'grid',
  gap: theme.spacing(1.5),
  gridTemplateColumns: 'auto minmax(0, 1fr)',
  minWidth: 0,
  padding: theme.spacing(2),
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontSize: 22,
  fontWeight: theme.workspace.typography.weights.extraBold,
  letterSpacing: '-.04em',
  lineHeight: 1,
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: 11,
}));

const StatNote = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 10,
  fontWeight: theme.workspace.typography.weights.bold,
}));

export function StatTile({
  color,
  icon,
  isLoading = false,
  label,
  note,
  value,
}: {
  color?: string;
  icon: ReactNode;
  isLoading?: boolean;
  label: ReactNode;
  note?: ReactNode;
  value: ReactNode;
}) {
  return (
    <StatTileRoot>
      <IconTile tileBackground={color} tileSize={42}>
        {icon}
      </IconTile>
      <Box minWidth={0}>
        {isLoading ? <Skeleton height={26} width={64} /> : <StatValue>{value}</StatValue>}
        <StatLabel>{label}</StatLabel>
        {note ? <StatNote>{note}</StatNote> : null}
      </Box>
    </StatTileRoot>
  );
}
