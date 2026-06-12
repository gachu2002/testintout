import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import type { GridBreak, GridCols } from '@/components/workspace/utils';
import { shouldForwardProp } from '@/components/workspace/utils';

export const Page = styled(Box)(({ theme }) => ({
  margin: '0 auto',
  maxWidth: theme.workspace.layout.pageMaxWidth,
  padding: theme.spacing(3, 3, 9),
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2.25, 2, 7),
  },
}));

export const MainGrid = styled(Box)(({ theme }) => ({
  alignItems: 'start',
  display: 'grid',
  gap: theme.workspace.layout.gap,
  gridTemplateColumns: `minmax(0, 1fr) ${theme.workspace.layout.railWidth}px`,
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const CardGrid = styled(Box, {
  shouldForwardProp,
})<{ collapseAt?: GridBreak; cols?: GridCols }>(({ collapseAt = 'sm', cols = 2, theme }) => ({
  display: 'grid',
  gap: theme.spacing(2.25),
  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
  ...(cols > 2
    ? {
        [theme.breakpoints.down('lg')]: {
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        },
      }
    : {}),
  [theme.breakpoints.down(collapseAt)]: {
    gridTemplateColumns: '1fr',
  },
}));
