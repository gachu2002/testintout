import type { LinearProgressProps } from '@mui/material';

import { Meter } from '@/components/workspace/data';
import { clampPercent } from '@/lib/formatters';

type WorkspaceUsageMeterProps = Omit<LinearProgressProps, 'value' | 'variant'> & {
  fill?: string;
  label: string;
  value: number | null | undefined;
};

export function WorkspaceUsageMeter({ fill, label, value, ...props }: WorkspaceUsageMeterProps) {
  return (
    <Meter
      aria-label={label}
      fill={fill}
      value={clampPercent(value)}
      variant="determinate"
      {...props}
    />
  );
}
