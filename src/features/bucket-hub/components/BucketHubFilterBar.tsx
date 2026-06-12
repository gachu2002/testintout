import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import type { ReactNode } from 'react';

import { FilterBar } from '@/components/workspace';
import {
  WorkspaceFilterGroup,
  type WorkspaceFilterOption,
} from '@/components/workspace/FilterControls';
import { bucketHubSectionStatus } from '@/features/bucket-hub/sectionStatus';
import type {
  BucketFilterCount,
  BucketFilterValue,
  BucketHubFilters,
} from '@/features/bucket-hub/types';
import { getBucketStatusLabel, getBucketTypeLabel } from '@/features/bucket-hub/utils/format';

type FilterOption = {
  icon: ReactNode;
  label: string;
  value: BucketFilterValue;
};

export function BucketHubFilterBar({
  activeFilter,
  filters,
  isLoading,
  onFilterChange,
}: {
  activeFilter: BucketFilterValue;
  filters?: BucketHubFilters;
  isLoading: boolean;
  onFilterChange: (filter: BucketFilterValue) => void;
}) {
  const options = buildFilterOptions(filters).map<WorkspaceFilterOption>((option) => ({
    icon: option.icon,
    isActive: option.value === activeFilter,
    key: option.value,
    label: option.label,
    onClick: () => onFilterChange(option.value),
  }));

  return (
    <FilterBar>
      <WorkspaceFilterGroup
        ariaLabel="Bucket filters"
        hub="buckets"
        isLoading={isLoading}
        label="View"
        options={options}
        skeletonWidth={104}
        status={bucketHubSectionStatus.heroFilters}
      />
    </FilterBar>
  );
}

function buildFilterOptions(filters: BucketHubFilters | undefined): FilterOption[] {
  if (!filters) {
    return [{ icon: <AppsRoundedIcon sx={{ fontSize: 15 }} />, label: '전체', value: 'all' }];
  }

  return [
    { icon: <AppsRoundedIcon sx={{ fontSize: 15 }} />, label: '전체', value: 'all' },
    ...filters.types.map((type) => buildTypeOption(type)),
    ...filters.statuses.map((status) => buildStatusOption(status)),
  ];
}

function buildTypeOption(type: BucketFilterCount): FilterOption {
  return {
    icon: getTypeIcon(type.value),
    label: getBucketTypeLabel(type.value),
    value: `type:${type.value}`,
  };
}

function buildStatusOption(status: BucketFilterCount): FilterOption {
  return {
    icon: <CheckCircleRoundedIcon sx={{ fontSize: 15 }} />,
    label: getBucketStatusLabel(status.value),
    value: `status:${status.value}`,
  };
}

function getTypeIcon(type: string) {
  if (type === 'private') return <LockRoundedIcon sx={{ fontSize: 15 }} />;
  if (type === 'public') return <PublicRoundedIcon sx={{ fontSize: 15 }} />;

  return <HubRoundedIcon sx={{ fontSize: 15 }} />;
}
