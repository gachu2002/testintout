import type { TypographyProps } from '@mui/material';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { createElement } from 'react';

export const Head = styled(Box)(({ theme }) => ({
  alignItems: 'flex-start',
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1.5),
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2.5),
  minWidth: 0,
}));

export const HeadCopy = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(0.5),
  minWidth: 0,
}));

export const Kicker = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  color: theme.palette.text.disabled,
  flexDirection: 'row',
  fontSize: 11,
  fontWeight: 800,
  gap: theme.spacing(0.75),
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  '& .MuiSvgIcon-root': {
    fontSize: 14,
  },
}));

export const Title = styled((props: TypographyProps) =>
  createElement(Typography, { component: 'h2', ...props }),
)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 20,
  fontWeight: 800,
  letterSpacing: '-0.03em',
  lineHeight: 1.2,
}));

export const Desc = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 12,
  lineHeight: 1.6,
  maxWidth: 720,
}));
