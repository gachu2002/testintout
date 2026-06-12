import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { Stack } from '@mui/material';
import type { ReactNode } from 'react';

import { FilterBar, ResultCount } from '@/components/workspace';
import {
  WorkspaceFilterGroup,
  type WorkspaceFilterOption,
} from '@/components/workspace/FilterControls';
import { agentHubSectionStatus } from '@/features/agent-hub/sectionStatus';
import type {
  AgentFilterCount,
  AgentFilterState,
  AgentHubFilters,
} from '@/features/agent-hub/types';
import { formatLabel } from '@/lib/formatters';

export function AgentHubFilterBar({
  filters,
  isLoading,
  loadedCount,
  onFilterChange,
  state,
  total,
}: {
  filters?: AgentHubFilters;
  isLoading: boolean;
  loadedCount: number;
  onFilterChange: (nextState: AgentFilterState) => void;
  state: AgentFilterState;
  total?: number;
}) {
  const typeOptions = buildOptions(filters?.types, total).map<WorkspaceFilterOption>((option) => ({
    count: option.count,
    icon: getTypeIcon(option.id),
    isActive: option.id === state.type,
    key: option.id,
    label: option.label,
    onClick: () => onFilterChange({ ...state, type: option.id }),
  }));
  const statusOptions = buildOptions(filters?.statuses, total).map<WorkspaceFilterOption>(
    (option) => ({
      count: option.count,
      icon: getStatusIcon(option.id),
      isActive: option.id === state.status,
      key: option.id,
      label: option.label,
      onClick: () => onFilterChange({ ...state, status: option.id }),
    }),
  );

  return (
    <FilterBar>
      <Stack spacing={1.25}>
        <WorkspaceFilterGroup
          ariaLabel="Agent type filters"
          hub="agents"
          isLoading={isLoading}
          label="Type"
          options={typeOptions}
          skeletonCount={4}
          status={agentHubSectionStatus.heroFilters}
        />
        <WorkspaceFilterGroup
          ariaLabel="Agent status filters"
          hub="agents"
          isLoading={isLoading}
          label="Status"
          options={statusOptions}
          skeletonCount={3}
        />
      </Stack>
      <ResultCount>{buildResultCopy(state, loadedCount, total)}</ResultCount>
    </FilterBar>
  );
}

function buildOptions(options: AgentFilterCount[] | undefined, total: number | undefined) {
  if (options?.length) return options;

  return [{ count: total ?? 0, id: 'all', label: '전체' }];
}

function getTypeIcon(type: string): ReactNode {
  if (type === 'all') return <AppsRoundedIcon sx={{ fontSize: 15 }} />;
  if (type === 'workflow') return <AccountTreeRoundedIcon sx={{ fontSize: 15 }} />;

  return <SmartToyRoundedIcon sx={{ fontSize: 15 }} />;
}

function getStatusIcon(status: string): ReactNode {
  if (status === 'running') return <PlayCircleRoundedIcon sx={{ fontSize: 15 }} />;
  if (status === 'review') return <PendingActionsRoundedIcon sx={{ fontSize: 15 }} />;

  return <TuneRoundedIcon sx={{ fontSize: 15 }} />;
}

function buildResultCopy(state: AgentFilterState, loadedCount: number, total: number | undefined) {
  const totalCopy = typeof total === 'number' ? `${total.toLocaleString()} total` : 'total loading';

  if (state.type === 'all' && state.status === 'all') {
    return `Loaded ${loadedCount.toLocaleString()} of ${totalCopy}`;
  }

  const filters = [state.type, state.status]
    .filter((value) => value !== 'all')
    .map((value) => formatLabel(value));

  return `${loadedCount.toLocaleString()} loaded · ${filters.join(' + ')} · ${totalCopy}`;
}
