import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import type { ReactNode } from 'react';

import { FilterBar, ResultCount } from '@/components/workspace';
import {
  WorkspaceFilterGroup,
  type WorkspaceFilterOption,
} from '@/components/workspace/FilterControls';
import { permissionHubSectionStatus } from '@/features/permission-hub/sectionStatus';
import type {
  PermissionHubFilters,
  PermissionHubStats,
  PermissionKindFilter,
} from '@/features/permission-hub/types';

const kindMeta: Record<PermissionKindFilter, { icon: ReactNode; label: string }> = {
  all: { icon: <AppsRoundedIcon sx={{ fontSize: 15 }} />, label: '전체' },
  platform: { icon: <AdminPanelSettingsRoundedIcon sx={{ fontSize: 15 }} />, label: '플랫폼' },
  project: { icon: <Inventory2RoundedIcon sx={{ fontSize: 15 }} />, label: '프로젝트' },
  resource: { icon: <StorageRoundedIcon sx={{ fontSize: 15 }} />, label: '리소스' },
  scoped: { icon: <VpnKeyRoundedIcon sx={{ fontSize: 15 }} />, label: 'Scoped' },
};

const referenceKindOrder: PermissionKindFilter[] = [
  'all',
  'platform',
  'project',
  'resource',
  'scoped',
];

export function PermissionHubFilterBar({
  activeKind,
  filters,
  isLoading,
  loadedCount,
  onKindChange,
  stats,
  total,
}: {
  activeKind: PermissionKindFilter;
  filters?: PermissionHubFilters;
  isLoading: boolean;
  loadedCount: number;
  onKindChange: (kind: PermissionKindFilter) => void;
  stats?: PermissionHubStats;
  total?: number;
}) {
  const options = buildFilterOptions(filters, stats).map<WorkspaceFilterOption>((option) => {
    const meta = kindMeta[option.kind];

    return {
      count: option.count,
      icon: meta.icon,
      isActive: option.kind === activeKind,
      key: option.kind,
      label: meta.label,
      onClick: () => onKindChange(option.kind),
    };
  });

  return (
    <FilterBar>
      <WorkspaceFilterGroup
        ariaLabel="Permission realm kind filters"
        hub="permissions"
        isLoading={isLoading}
        label="View"
        options={options}
        skeletonCount={5}
        status={permissionHubSectionStatus.filters}
      />
      <ResultCount>{buildResultCopy(loadedCount, total)}</ResultCount>
    </FilterBar>
  );
}

function buildFilterOptions(
  filters: PermissionHubFilters | undefined,
  stats: PermissionHubStats | undefined,
) {
  const counts = new Map(filters?.kinds.map((kind) => [kind.value, kind.count]) ?? []);
  const allCount =
    stats?.totalRealms ?? [...counts.values()].reduce((sum, count) => sum + count, 0);

  return referenceKindOrder.map((kind) => ({
    count: kind === 'all' ? allCount : (counts.get(kind) ?? 0),
    kind,
  }));
}

function buildResultCopy(loadedCount: number, total: number | undefined) {
  if (total === undefined) return 'Realm list loading';

  return `Loaded ${loadedCount.toLocaleString()} of ${total.toLocaleString()} realms`;
}
