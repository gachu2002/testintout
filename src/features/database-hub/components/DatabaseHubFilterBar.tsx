import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded';
import type { ReactNode } from 'react';

import { FilterBar, ResultCount } from '@/components/workspace';
import {
  WorkspaceFilterGroup,
  type WorkspaceFilterOption,
} from '@/components/workspace/FilterControls';
import { databaseHubSectionStatus } from '@/features/database-hub/sectionStatus';
import type { DatabaseHubFilters } from '@/features/database-hub/types';
import { formatLabel } from '@/lib/formatters';

export function DatabaseHubFilterBar({
  activeEngine,
  filters,
  isLoading,
  loadedCount,
  onEngineChange,
  total,
}: {
  activeEngine: string;
  filters?: DatabaseHubFilters;
  isLoading: boolean;
  loadedCount: number;
  onEngineChange: (engine: string) => void;
  total?: number;
}) {
  const options = buildEngineOptions(filters, total).map<WorkspaceFilterOption>((option) => {
    const meta = getEngineMeta(option.engine);

    return {
      count: option.count,
      icon: meta.icon,
      isActive: option.engine === activeEngine,
      key: option.engine,
      label: meta.label,
      onClick: () => onEngineChange(option.engine),
    };
  });

  return (
    <FilterBar>
      <WorkspaceFilterGroup
        ariaLabel="Database engine filters"
        hub="database"
        isLoading={isLoading}
        label="View"
        options={options}
        skeletonCount={6}
        status={databaseHubSectionStatus.filters}
      />
      <ResultCount>{buildResultCopy(activeEngine, loadedCount, total)}</ResultCount>
    </FilterBar>
  );
}

function buildEngineOptions(filters: DatabaseHubFilters | undefined, total: number | undefined) {
  const allCount = total ?? filters?.engines.reduce((sum, engine) => sum + engine.count, 0) ?? 0;

  return [
    { count: allCount, engine: 'all' },
    ...(filters?.engines.map((engine) => ({ count: engine.count, engine: engine.value })) ?? []),
  ];
}

function getEngineMeta(engine: string): { icon: ReactNode; label: string } {
  if (engine === 'all') return { icon: <AppsRoundedIcon sx={{ fontSize: 15 }} />, label: '전체' };
  if (engine === 'milvus')
    return { icon: <HubRoundedIcon sx={{ fontSize: 15 }} />, label: 'Milvus' };
  if (engine === 'mongo') {
    return { icon: <AccountTreeRoundedIcon sx={{ fontSize: 15 }} />, label: 'MongoDB' };
  }
  if (engine === 'mysql')
    return { icon: <TableChartRoundedIcon sx={{ fontSize: 15 }} />, label: 'MySQL' };
  if (engine === 'postgres') {
    return { icon: <StorageRoundedIcon sx={{ fontSize: 15 }} />, label: 'Postgres' };
  }
  if (engine === 'redis')
    return { icon: <MemoryRoundedIcon sx={{ fontSize: 15 }} />, label: 'Redis' };

  return { icon: <StorageRoundedIcon sx={{ fontSize: 15 }} />, label: formatLabel(engine) };
}

function buildResultCopy(activeEngine: string, loadedCount: number, total: number | undefined) {
  const totalCopy = typeof total === 'number' ? `${total.toLocaleString()} total` : 'total loading';

  if (activeEngine === 'all') return `Loaded ${loadedCount.toLocaleString()} of ${totalCopy}`;

  return `${loadedCount.toLocaleString()} ${formatLabel(activeEngine)} resources · ${totalCopy}`;
}
