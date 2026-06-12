import { Skeleton } from '@mui/material';
import type { ReactNode } from 'react';

import type { SectionStatusInfo } from '@/components/reference-status';
import { SectionStatusBadge } from '@/components/reference-status';
import type { HubThemeName } from '@/styles/tokens';

import { Pill } from './data';
import { FilterLabel, FilterRow } from './patterns';

export type WorkspaceFilterOption = {
  count?: number;
  icon?: ReactNode;
  isActive: boolean;
  key: string;
  label: ReactNode;
  onClick: () => void;
};

type WorkspaceFilterGroupProps = {
  ariaLabel: string;
  hub: HubThemeName;
  isLoading: boolean;
  label: string;
  options: WorkspaceFilterOption[];
  skeletonCount?: number;
  skeletonWidth?: number;
  status?: SectionStatusInfo;
};

export function WorkspaceFilterGroup({
  ariaLabel,
  hub,
  isLoading,
  label,
  options,
  skeletonCount = 4,
  skeletonWidth = 112,
  status,
}: WorkspaceFilterGroupProps) {
  return (
    <FilterRow aria-label={ariaLabel} role="group">
      <FilterLabel>{label}</FilterLabel>
      {status ? <SectionStatusBadge status={status} /> : null}
      {isLoading ? (
        <FilterSkeletons count={skeletonCount} width={skeletonWidth} />
      ) : (
        options.map((option) => (
          <WorkspaceFilterButton hub={hub} key={option.key} option={option} />
        ))
      )}
    </FilterRow>
  );
}

export function WorkspaceFilterButton({
  hub,
  option,
}: {
  hub: HubThemeName;
  option: WorkspaceFilterOption;
}) {
  return (
    <Pill
      active={option.isActive}
      aria-pressed={option.isActive}
      hub={hub}
      onClick={option.onClick}
      type="button"
    >
      {option.icon}
      {option.label}
      {typeof option.count === 'number' ? <span>{option.count.toLocaleString()}</span> : null}
    </Pill>
  );
}

export function FilterSkeletons({ count = 4, width = 112 }: { count?: number; width?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, item) => (
        <Skeleton
          height={36}
          key={item}
          sx={(theme) => ({ borderRadius: theme.workspace.radii.pill })}
          variant="rounded"
          width={width}
        />
      ))}
    </>
  );
}
