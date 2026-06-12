import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded';
import WebRoundedIcon from '@mui/icons-material/WebRounded';
import type { ReactNode } from 'react';

import { FilterBar, ResultCount } from '@/components/workspace';
import {
  WorkspaceFilterGroup,
  type WorkspaceFilterOption,
} from '@/components/workspace/FilterControls';
import { consoleHubSectionStatus } from '@/features/console-hub/sectionStatus';
import type { ConsoleFilterCount, ConsoleHubFilters } from '@/features/console-hub/types';
import { formatLabel } from '@/lib/formatters';

export function ConsoleHubFilterBar({
  activeType,
  filters,
  isLoading,
  loadedCount,
  onTypeChange,
  total,
}: {
  activeType: string;
  filters?: ConsoleHubFilters;
  isLoading: boolean;
  loadedCount: number;
  onTypeChange: (type: string) => void;
  total?: number;
}) {
  const options = buildTypeOptions(filters, total).map<WorkspaceFilterOption>((option) => {
    const meta = getTypeMeta(option.value, option.label);

    return {
      count: option.count,
      icon: meta.icon,
      isActive: option.value === activeType,
      key: option.value,
      label: meta.label,
      onClick: () => onTypeChange(option.value),
    };
  });

  return (
    <FilterBar>
      <WorkspaceFilterGroup
        ariaLabel="Console type filters"
        hub="consoles"
        isLoading={isLoading}
        label="View"
        options={options}
        skeletonCount={6}
        skeletonWidth={118}
        status={consoleHubSectionStatus.filters}
      />
      <ResultCount>{buildResultCopy(activeType, loadedCount, total)}</ResultCount>
    </FilterBar>
  );
}

function buildTypeOptions(filters: ConsoleHubFilters | undefined, total: number | undefined) {
  const allCount = total ?? filters?.types.reduce((sum, type) => sum + type.count, 0) ?? 0;

  return [
    { count: allCount, label: '전체', value: 'all' },
    ...(filters?.types ?? []),
  ] satisfies ConsoleFilterCount[];
}

function getTypeMeta(type: string, label: string): { icon: ReactNode; label: string } {
  if (type === 'all') return { icon: <AppsRoundedIcon sx={{ fontSize: 15 }} />, label };
  if (type === 'attu') return { icon: <HubRoundedIcon sx={{ fontSize: 15 }} />, label };
  if (type === 'mongogui') {
    return { icon: <AccountTreeRoundedIcon sx={{ fontSize: 15 }} />, label };
  }
  if (type === 'pgadmin') return { icon: <StorageRoundedIcon sx={{ fontSize: 15 }} />, label };
  if (type === 'phpmyadmin') {
    return { icon: <TableChartRoundedIcon sx={{ fontSize: 15 }} />, label };
  }
  if (type === 'redisinsight') {
    return { icon: <MemoryRoundedIcon sx={{ fontSize: 15 }} />, label };
  }

  return { icon: <WebRoundedIcon sx={{ fontSize: 15 }} />, label: label || formatLabel(type) };
}

function buildResultCopy(activeType: string, loadedCount: number, total: number | undefined) {
  const totalCopy = typeof total === 'number' ? `${total.toLocaleString()} total` : 'total loading';

  if (activeType === 'all') return `Loaded ${loadedCount.toLocaleString()} of ${totalCopy}`;

  return `${loadedCount.toLocaleString()} ${formatLabel(activeType)} consoles · ${totalCopy}`;
}
