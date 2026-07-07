import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import type { ReactNode } from 'react';

import { FilterBar, ResultCount } from '@/components/workspace';
import {
  WorkspaceFilterGroup,
  type WorkspaceFilterOption,
} from '@/components/workspace/FilterControls';
import { databaseHubSectionStatus } from '@/features/database-hub/sectionStatus';
import type { DatabaseHubFilters } from '@/features/database-hub/types';

export function DatabaseHubFilterBar({
  activeCategory,
  filters,
  isLoading,
  loadedCount,
  onCategoryChange,
  total,
}: {
  activeCategory: string;
  filters?: DatabaseHubFilters;
  isLoading: boolean;
  loadedCount: number;
  onCategoryChange: (category: string) => void;
  total?: number;
}) {
  const options = buildCategoryOptions(filters, total).map<WorkspaceFilterOption>((option) => {
    const meta = getCategoryMeta(option.category);

    return {
      count: option.count,
      icon: meta.icon,
      isActive: option.category === activeCategory,
      key: option.category,
      label: meta.label,
      onClick: () => onCategoryChange(option.category),
    };
  });

  return (
    <FilterBar>
      <WorkspaceFilterGroup
        ariaLabel="Database category filters"
        hub="database"
        isLoading={isLoading}
        label="View"
        options={options}
        skeletonCount={6}
        status={databaseHubSectionStatus.filters}
      />
      <ResultCount>{buildResultCopy(activeCategory, loadedCount, total)}</ResultCount>
    </FilterBar>
  );
}

function buildCategoryOptions(filters: DatabaseHubFilters | undefined, total: number | undefined) {
  const allCount = total ?? filters?.engines.reduce((sum, engine) => sum + engine.count, 0) ?? 0;
  const grouped =
    filters?.engines.reduce<Record<string, number>>((acc, engine) => {
      const category = getDatabaseEngineCategory(engine.value);
      acc[category] = (acc[category] ?? 0) + engine.count;

      return acc;
    }, {}) ?? {};

  return [
    { category: 'all', count: allCount },
    ...Object.entries(grouped).map(([category, count]) => ({ category, count })),
  ];
}

function getCategoryMeta(category: string): { icon: ReactNode; label: string } {
  if (category === 'all') return { icon: <AppsRoundedIcon sx={{ fontSize: 15 }} />, label: '전체' };
  if (category === 'relational') {
    return { icon: <TableChartRoundedIcon sx={{ fontSize: 15 }} />, label: '관계형' };
  }
  if (category === 'document') {
    return { icon: <AccountTreeRoundedIcon sx={{ fontSize: 15 }} />, label: '문서형' };
  }
  if (category === 'cache')
    return { icon: <BoltRoundedIcon sx={{ fontSize: 15 }} />, label: '캐시' };
  if (category === 'search') {
    return { icon: <TravelExploreRoundedIcon sx={{ fontSize: 15 }} />, label: '검색' };
  }
  if (category === 'vector')
    return { icon: <HubRoundedIcon sx={{ fontSize: 15 }} />, label: '벡터' };

  return { icon: <StorageRoundedIcon sx={{ fontSize: 15 }} />, label: '기타' };
}

function buildResultCopy(activeCategory: string, loadedCount: number, total: number | undefined) {
  const totalCopy = typeof total === 'number' ? `${total.toLocaleString()} total` : 'total loading';

  if (activeCategory === 'all') return `Loaded ${loadedCount.toLocaleString()} of ${totalCopy}`;

  return `${loadedCount.toLocaleString()} ${getCategoryMeta(activeCategory).label} resources · ${totalCopy}`;
}

function getDatabaseEngineCategory(engine: string) {
  if (engine === 'mysql' || engine === 'postgres') return 'relational';
  if (engine === 'mongo') return 'document';
  if (engine === 'redis') return 'cache';
  if (engine === 'elastic') return 'search';
  if (engine === 'milvus') return 'vector';

  return 'unknown';
}
