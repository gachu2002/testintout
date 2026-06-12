import { Box, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import { IconTile } from './data';
import { HoverCard } from './surface';
import { shouldForwardProp } from './utils';

export const ResourceCardRoot = styled(HoverCard, {
  shouldForwardProp,
})<{ cardMinHeight?: number }>(({ cardMinHeight = 330, theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: cardMinHeight,
  padding: theme.spacing(2.75),
}));

export const ResourceCardTop = styled(Box)(({ theme }) => ({
  alignItems: 'flex-start',
  display: 'flex',
  gap: theme.spacing(1.5),
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
}));

export const ResourceStatusRow = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1.5),
}));

export const ResourceKindLabel = styled('span')(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: 10,
  fontWeight: theme.workspace.typography.weights.extraBold,
  letterSpacing: '.04em',
  textTransform: 'uppercase',
}));

export const ResourceNameRow = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  gap: theme.spacing(1.5),
  minWidth: 0,
}));

export const ResourceName = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontWeight: theme.workspace.typography.weights.extraBold,
  letterSpacing: '-.03em',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const ResourceMeta = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: 11,
  lineHeight: 1.5,
  marginTop: theme.spacing(0.5),
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const ResourceMenuButton = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  borderRadius: 10,
  color: theme.palette.text.disabled,
  display: 'flex',
  flexShrink: 0,
  height: 30,
  justifyContent: 'center',
  width: 30,
}));

export const ResourceMetricList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1.75),
}));

export const ResourceInfoBlock = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1.75),
}));

export const ResourceInfoCard = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: alpha(theme.palette.background.paper, 0.94),
  border: `1px solid ${alpha(theme.workspace.colors.borderStrong, 0.9)}`,
  borderRadius: theme.workspace.radii.lg,
  display: 'flex',
  gap: theme.spacing(1.125),
  minWidth: 0,
  padding: theme.spacing(1, 1.25),
}));

export const ResourceInfoBadge = styled(IconTile)(({ theme }) => ({
  fontSize: 10,
  fontWeight: theme.workspace.typography.weights.extraBold,
  letterSpacing: '.04em',
}));

export const ResourceCardFooter = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  borderTop: `1px solid ${alpha(theme.workspace.colors.borderStrong, 0.7)}`,
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1.25),
  justifyContent: 'flex-end',
  marginTop: 'auto',
  paddingTop: theme.spacing(1.75),
}));
