import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import { Collapse, Skeleton, Stack, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useState } from 'react';

import { SectionStatusBadge } from '@/components/reference-status';
import { Badge, ListRow, Panel, RowCopy, RowList, RowMeta, RowTitle } from '@/components/workspace';
import { Desc, Head, HeadCopy, Kicker, Title } from '@/components/workspace/text';
import { permissionHubSectionStatus } from '@/features/permission-hub/sectionStatus';
import type {
  PermissionRequestItem,
  PermissionRequestStatus,
} from '@/features/permission-hub/types';
import type { ToneName } from '@/styles/tokens';

const ExpandableListRow = styled(ListRow)(({ theme }) => ({
  cursor: 'pointer',
  transition: theme.transitions.create(['background-color', 'box-shadow'], {
    duration: theme.transitions.duration.shortest,
  }),
  '&:focus-visible, &:hover': {
    backgroundColor: alpha(theme.workspace.hubThemes.permissions.brand, 0.05),
    boxShadow: `inset 0 0 0 1px ${alpha(theme.workspace.hubThemes.permissions.brand, 0.1)}`,
    outline: 'none',
  },
}));

export function PermissionRequestInboxRail({
  isLoading,
  requests,
}: {
  isLoading: boolean;
  requests: PermissionRequestItem[];
}) {
  const [expandedRequestId, setExpandedRequestId] = useState<string>('');
  const visibleRequests = requests.slice(0, 8);

  return (
    <Panel hub="permissions">
      <Kicker sx={{ mb: 1.75 }}>
        <PendingActionsRoundedIcon sx={{ fontSize: 14 }} />
        Request List
        <SectionStatusBadge status={permissionHubSectionStatus.requestInbox} />
      </Kicker>
      <Head>
        <HeadCopy>
          <Title>현재 요청 목록</Title>
          <Desc>
            {visibleRequests.length > 0
              ? `${visibleRequests.length.toLocaleString()}개의 최신 권한 요청을 우측 패널에서 바로 확인합니다.`
              : '현재 조회 가능한 권한 요청은 없지만, 새 요청이 들어오면 우측 패널에서 바로 확인합니다.'}
          </Desc>
        </HeadCopy>
      </Head>
      <RowList>
        {isLoading ? renderLoadingRows() : null}
        {!isLoading && visibleRequests.length === 0 ? <EmptyRequestRow /> : null}
        {!isLoading
          ? visibleRequests.map((request) => {
              const statusMeta = getRequestStatusMeta(request.status);
              const expanded = expandedRequestId === request.id;

              return (
                <ExpandableListRow
                  aria-expanded={expanded}
                  compact
                  key={request.id}
                  onClick={() => setExpandedRequestId(expanded ? '' : request.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setExpandedRequestId(expanded ? '' : request.id);
                    }
                    if (event.key === 'Escape' && expanded) {
                      setExpandedRequestId('');
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <RowCopy>
                    <RowTitle>{buildRequestTitle(request)}</RowTitle>
                    <Collapse in={expanded} timeout={180} unmountOnExit>
                      <Stack spacing={0.25} sx={{ mt: 0.75 }}>
                        {request.rejectReason.trim() ? (
                          <RowMeta>
                            <strong>거절 사유:</strong> {truncateText(request.rejectReason, 72)}
                          </RowMeta>
                        ) : null}
                        <RowMeta>
                          <strong>날짜:</strong> {formatRequestDate(request)}
                        </RowMeta>
                      </Stack>
                    </Collapse>
                  </RowCopy>
                  <Badge tone={statusMeta.tone}>{statusMeta.label}</Badge>
                </ExpandableListRow>
              );
            })
          : null}
      </RowList>
      <Typography color="text.secondary" fontSize={12} lineHeight={1.7} mt={2}>
        Role request submission, approval review, and rejection actions stay disabled until exact
        action response contracts are accepted.
      </Typography>
    </Panel>
  );
}

function EmptyRequestRow() {
  return (
    <ListRow compact>
      <RowCopy>
        <RowTitle>표시할 요청이 없습니다.</RowTitle>
        <RowMeta>현재 조회 가능한 permission request가 없습니다.</RowMeta>
      </RowCopy>
    </ListRow>
  );
}

function renderLoadingRows() {
  return Array.from({ length: 3 }, (_, index) => (
    <ListRow compact key={index}>
      <RowCopy sx={{ width: '100%' }}>
        <Skeleton height={18} width="72%" />
        <Skeleton height={15} width="54%" />
      </RowCopy>
      <Skeleton height={24} sx={{ borderRadius: 999 }} width={72} />
    </ListRow>
  ));
}

function buildRequestTitle(request: PermissionRequestItem) {
  const realmName = request.realmName.trim() || 'Unknown Realm';
  const roleName = request.roleName.trim() || 'role';

  return `${realmName}'s ${roleName} access request`;
}

function formatRequestDate(request: PermissionRequestItem) {
  const isRejected = request.status === 'rejected';
  const sourceValue = isRejected ? (request.decidedAt ?? request.createdAt) : request.createdAt;
  const parsed = new Date(sourceValue);

  if (Number.isNaN(parsed.getTime())) {
    return '시간 정보 없음';
  }

  return new Intl.DateTimeFormat('ko-KR', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
  }).format(parsed);
}

function getRequestStatusMeta(status: PermissionRequestStatus): { label: string; tone: ToneName } {
  if (status === 'pending') return { label: 'Pending', tone: 'pending' };
  if (status === 'approved') return { label: 'Approved', tone: 'healthy' };
  if (status === 'rejected') return { label: 'Rejected', tone: 'incident' };
  if (status === 'cancelled') return { label: 'Cancelled', tone: 'muted' };

  return { label: 'Unknown', tone: 'info' };
}

function truncateText(value: string, maxLength: number) {
  const text = value.trim();
  if (!text || text.length <= maxLength) return text;

  return `${text.slice(0, maxLength - 1)}...`;
}
