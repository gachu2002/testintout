import { Skeleton, Stack } from '@mui/material';

import { CardGrid } from '@/components/workspace/layout';
import type { GridBreak, GridCols } from '@/components/workspace/utils';

type SkeletonProps = {
  count?: number;
  height?: number;
};

type CardSkeletonProps = SkeletonProps & {
  collapseAt?: GridBreak;
  cols?: GridCols;
};

export function RowSkeletons({ count = 3, height = 52 }: SkeletonProps) {
  return (
    <Stack spacing={1}>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton height={height} key={index} variant="rounded" />
      ))}
    </Stack>
  );
}

export function CardSkeletons({ collapseAt, cols, count = 4, height = 260 }: CardSkeletonProps) {
  return (
    <CardGrid collapseAt={collapseAt} cols={cols}>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton
          height={height}
          key={index}
          sx={(theme) => ({ borderRadius: theme.workspace.radii.card })}
          variant="rounded"
        />
      ))}
    </CardGrid>
  );
}
