import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import LanRoundedIcon from '@mui/icons-material/LanRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import type { ReactNode } from 'react';

import { FilterBar } from '@/components/workspace';
import {
  WorkspaceFilterGroup,
  type WorkspaceFilterOption,
} from '@/components/workspace/FilterControls';
import { domainHubSectionStatus } from '@/features/domain-hub/sectionStatus';
import type { DomainHubFilters, DomainStatusFilter } from '@/features/domain-hub/types';

const statusMeta: Record<DomainStatusFilter, { icon: ReactNode; label: string }> = {
  all: { icon: <AppsRoundedIcon sx={{ fontSize: 15 }} />, label: '전체' },
  certificate: { icon: <VerifiedUserRoundedIcon sx={{ fontSize: 15 }} />, label: '인증서' },
  connected: { icon: <LanRoundedIcon sx={{ fontSize: 15 }} />, label: '연결 완료' },
  pending: { icon: <ScheduleRoundedIcon sx={{ fontSize: 15 }} />, label: '대기' },
  review: { icon: <VerifiedUserRoundedIcon sx={{ fontSize: 15 }} />, label: '검토' },
};

const referenceStatusOrder: DomainStatusFilter[] = [
  'all',
  'pending',
  'review',
  'certificate',
  'connected',
];

export function DomainHubFilterBar({
  activeStatus,
  filters,
  isLoading,
  onStatusChange,
}: {
  activeStatus: DomainStatusFilter;
  filters?: DomainHubFilters;
  isLoading: boolean;
  onStatusChange: (status: DomainStatusFilter) => void;
}) {
  const statuses = buildReferenceFilterOptions(filters).map<WorkspaceFilterOption>((status) => {
    const meta = statusMeta[status] ?? {
      icon: <AppsRoundedIcon sx={{ fontSize: 15 }} />,
      label: status,
    };

    return {
      icon: meta.icon,
      isActive: status === activeStatus,
      key: status,
      label: meta.label,
      onClick: () => onStatusChange(status),
    };
  });

  return (
    <FilterBar>
      <WorkspaceFilterGroup
        ariaLabel="Domain status filters"
        hub="domain"
        isLoading={isLoading}
        label="View"
        options={statuses}
        status={domainHubSectionStatus.filters}
      />
    </FilterBar>
  );
}

function buildReferenceFilterOptions(filters: DomainHubFilters | undefined) {
  if (!filters) return ['all'] satisfies DomainStatusFilter[];

  return referenceStatusOrder.filter((status) => {
    if (status === 'all') return true;
    if (status === 'certificate') {
      return filters.certificateStatuses.some((certificateStatus) => certificateStatus !== 'none');
    }

    return filters.statuses.includes(status);
  });
}
