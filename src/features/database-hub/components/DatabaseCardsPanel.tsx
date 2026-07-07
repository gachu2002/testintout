import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import { Box, Button, ButtonBase, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { type ReactNode, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Badge, IconTile, Metric, WorkspaceUsageMeter } from '@/components/workspace';
import {
  ResourceCardFooter,
  ResourceCardRoot,
  ResourceCardTop,
  ResourceMeta,
  ResourceMetricList,
  ResourceName,
  ResourceNameRow,
  ResourceStatusRow,
} from '@/components/workspace/ResourceCardPrimitives';
import {
  ResourceMenuIcon,
  WorkspaceResourceCardsPanel,
} from '@/components/workspace/ResourceCards';
import { shouldForwardProp } from '@/components/workspace/utils';
import { routes } from '@/config/routes';
import {
  useDatabaseBindingsQueries,
  useRestartDatabaseMutation,
} from '@/features/database-hub/hooks/useDatabaseHubQueries';
import { databaseHubSectionStatus } from '@/features/database-hub/sectionStatus';
import type { DatabaseBinding, DatabaseResource } from '@/features/database-hub/types';
import { formatLabel, getInitials } from '@/lib/formatters';
import type { ToneName } from '@/styles/tokens';

const DATABASE_CARD_PAGE_SIZE = 4;

const panelCopy = {
  empty: '선택한 필터에 맞는 데이터베이스 리소스가 없습니다.',
  label: 'Database Fleet',
  title: 'Databases',
};

const PanelActionLink = styled(RouterLink)(({ theme }) => ({
  alignItems: 'center',
  color: theme.workspace.hubThemes.database.brand,
  display: 'inline-flex',
  flexShrink: 0,
  fontSize: 12,
  fontWeight: theme.workspace.typography.weights.extraBold,
  gap: theme.spacing(0.25),
  lineHeight: 1.4,
  textDecoration: 'none',
  '&:hover': {
    color: theme.workspace.hubThemes.database.hover,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 16,
  },
}));

const ResourceNameLink = styled(RouterLink)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: theme.workspace.hubThemes.database.brand,
  },
}));

const EnginePill = styled('span')(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: 10,
  fontWeight: 700,
}));

const UsageBlock = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1.75),
}));

const UsageHead = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.75),
}));

const BlockLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: 11,
  fontWeight: 800,
  letterSpacing: '.08em',
  textTransform: 'uppercase',
}));

const UsageValue = styled(Typography)(({ theme }) => ({
  color: theme.workspace.hubThemes.database.brand,
  fontSize: 11,
  fontWeight: 800,
}));

const UsageMeta = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: 10,
  lineHeight: 1.4,
  marginTop: theme.spacing(0.875),
}));

const ConnectionChipBlock = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
}));

const ConnectionChipRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.625),
  marginTop: theme.spacing(0.875),
}));

const ConnectionChip = styled('span', {
  shouldForwardProp,
})<{ chipType: 'console' | 'more' | 'project' }>(({ chipType, theme }) => {
  const colorMap = {
    console: {
      background: alpha(theme.palette.secondary.main, 0.1),
      border: alpha(theme.palette.secondary.main, 0.16),
      color: theme.palette.secondary.dark,
    },
    more: {
      background: theme.palette.background.default,
      border: theme.workspace.colors.border,
      color: theme.palette.text.secondary,
    },
    project: {
      background: '#eef2ff',
      border: 'rgba(79, 70, 229, .15)',
      color: '#4f46e5',
    },
  }[chipType];

  return {
    alignItems: 'center',
    backgroundColor: colorMap.background,
    border: `1px solid ${colorMap.border}`,
    borderRadius: theme.workspace.radii.pill,
    color: colorMap.color,
    display: 'inline-flex',
    fontSize: 11,
    fontWeight: 600,
    gap: theme.spacing(0.375),
    lineHeight: 1.3,
    maxWidth: '100%',
    padding: theme.spacing(0.375, 1),
    whiteSpace: 'nowrap',
    '& .MuiSvgIcon-root': {
      fontSize: 12,
    },
  };
});

const CardSpacer = styled(Box)({
  flex: 1,
});

const CardMidFoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: theme.spacing(1.25),
}));

const FooterMembers = styled(Box)({
  alignItems: 'center',
  display: 'flex',
  '& > * + *': {
    marginLeft: -6,
  },
});

const MemberAvatar = styled('span', {
  shouldForwardProp,
})<{ owner?: boolean }>(({ owner = false, theme }) => ({
  alignItems: 'center',
  borderRadius: '50%',
  boxShadow: owner
    ? `0 0 0 2px #fff, 0 0 0 3.5px ${theme.workspace.hubThemes.database.brand}`
    : '0 0 0 2px #fff',
  color: '#fff',
  display: 'inline-flex',
  flexShrink: 0,
  fontSize: owner ? 10 : 9,
  fontWeight: 800,
  height: owner ? 28 : 26,
  justifyContent: 'center',
  width: owner ? 28 : 26,
}));

const MemberMore = styled('span')(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: '#e8eaf6',
  borderRadius: '50%',
  boxShadow: '0 0 0 2px #fff',
  color: theme.palette.text.secondary,
  display: 'inline-flex',
  flexShrink: 0,
  fontSize: 9,
  fontWeight: 800,
  height: 26,
  justifyContent: 'center',
  width: 26,
}));

const FooterNote = styled(Typography)(({ theme }) => ({
  alignItems: 'center',
  color: theme.palette.text.disabled,
  display: 'inline-flex',
  fontSize: 11,
  gap: theme.spacing(0.625),
  marginRight: 'auto',
  '& .MuiSvgIcon-root': {
    fontSize: 14,
  },
}));

const PaginationRoot = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  justifyContent: 'center',
  marginTop: theme.spacing(2.25),
}));

const PaginationSummary = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  flexBasis: '100%',
  fontSize: 12,
  fontWeight: 600,
  marginBottom: theme.spacing(0.5),
  textAlign: 'center',
}));

const PaginationControls = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  justifyContent: 'center',
}));

const PaginationButton = styled(ButtonBase, {
  shouldForwardProp,
})<{ active?: boolean }>(({ active = false, theme }) => ({
  backgroundColor: active ? theme.workspace.hubThemes.database.brand : alpha('#fff', 0.92),
  border: `1px solid ${active ? theme.workspace.hubThemes.database.brand : alpha(theme.workspace.colors.borderStrong, 0.96)}`,
  borderRadius: 12,
  boxShadow: active
    ? `0 10px 20px ${alpha(theme.workspace.hubThemes.database.brand, 0.2)}`
    : 'none',
  color: active ? '#fff' : theme.palette.text.secondary,
  fontSize: 13,
  fontWeight: 700,
  height: 38,
  minWidth: 38,
  padding: theme.spacing(0, 1.5),
  transition: theme.transitions.create(['background-color', 'border-color', 'color', 'transform'], {
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': {
    borderColor: active
      ? theme.workspace.hubThemes.database.brand
      : alpha(theme.workspace.hubThemes.database.brand, 0.24),
    color: active ? '#fff' : theme.workspace.hubThemes.database.brand,
    transform: 'translateY(-1px)',
  },
  '&.Mui-disabled': {
    opacity: 0.42,
    transform: 'none',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 18,
  },
}));

export function DatabaseCardsPanel({
  activeCategory,
  databases,
  isLoading,
  loadedCount,
  total,
}: {
  activeCategory: string;
  databases: DatabaseResource[];
  isLoading: boolean;
  loadedCount: number;
  total?: number;
}) {
  const [pagination, setPagination] = useState({ category: activeCategory, page: 1 });
  const bindingQueries = useDatabaseBindingsQueries(databases.map((database) => database.id));
  const totalPages = Math.max(1, Math.ceil(databases.length / DATABASE_CARD_PAGE_SIZE));
  const requestedPage = pagination.category === activeCategory ? pagination.page : 1;
  const currentPage = Math.min(requestedPage, totalPages);
  const startIndex = (currentPage - 1) * DATABASE_CARD_PAGE_SIZE;
  const pageDatabases = databases.slice(startIndex, startIndex + DATABASE_CARD_PAGE_SIZE);
  const bindingsById = new Map(
    databases.map((database, index) => [database.id, bindingQueries[index]?.data ?? []]),
  );
  const bindingsLoadingById = new Map(
    databases.map((database, index) => [database.id, Boolean(bindingQueries[index]?.isLoading)]),
  );

  const setCurrentPage = (nextPage: number) => {
    setPagination({ category: activeCategory, page: nextPage });
  };

  return (
    <WorkspaceResourceCardsPanel
      description={buildPanelDescription(total ?? loadedCount)}
      emptyCopy={panelCopy.empty}
      headerAction={
        <PanelActionLink to={routes.projects}>
          프로젝트 연결 보기
          <ChevronRightRoundedIcon />
        </PanelActionLink>
      }
      hub="database"
      icon={<StorageRoundedIcon sx={{ fontSize: 14 }} />}
      isEmpty={databases.length === 0}
      isLoading={isLoading}
      label={panelCopy.label}
      status={databaseHubSectionStatus.cards}
      title={panelCopy.title}
    >
      {pageDatabases.map((database) => (
        <DatabaseCard
          bindings={bindingsById.get(database.id) ?? []}
          database={database}
          isBindingsLoading={bindingsLoadingById.get(database.id) ?? false}
          key={database.id}
        />
      ))}
      <DatabaseCardsPagination
        currentPage={currentPage}
        pageSize={DATABASE_CARD_PAGE_SIZE}
        setPage={setCurrentPage}
        totalItems={databases.length}
        totalPages={totalPages}
      />
    </WorkspaceResourceCardsPanel>
  );
}

function DatabaseCard({
  bindings,
  database,
  isBindingsLoading,
}: {
  bindings: DatabaseBinding[];
  database: DatabaseResource;
  isBindingsLoading: boolean;
}) {
  const engineMeta = getEngineMeta(database.engine);
  const restartMutation = useRestartDatabaseMutation();
  const projectBindings = bindings.filter((binding) => binding.targetType === 'project');
  const consoleBindings = bindings.filter((binding) => binding.targetType === 'console');
  const canRestart = Boolean(database.capabilities.canRestart && database.status !== 'stopped');
  const detailPath = `${routes.databases}/${encodeURIComponent(database.id)}`;

  return (
    <ResourceCardRoot cardMinHeight={360} hub="database">
      <ResourceCardTop>
        <Box minWidth={0}>
          <ResourceStatusRow>
            <Badge dot tone={getStatusTone(database.status, database.health.severity)}>
              {getStatusLabel(database)}
            </Badge>
            <EnginePill>{getEngineText(database, engineMeta.label)}</EnginePill>
          </ResourceStatusRow>
          <ResourceNameRow>
            <IconTile tileBackground={engineMeta.color} tileSize={42}>
              {engineMeta.icon}
            </IconTile>
            <Box minWidth={0}>
              <ResourceName>
                <ResourceNameLink to={detailPath}>{database.name}</ResourceNameLink>
              </ResourceName>
              <ResourceMeta>{database.summary || `${engineMeta.label} database`}</ResourceMeta>
            </Box>
          </ResourceNameRow>
        </Box>
        <ResourceMenuIcon />
      </ResourceCardTop>

      <ResourceMetricList>
        <Metric>
          <LinkRoundedIcon />
          Bindings {formatNumber(database.bindingCount)}
        </Metric>
        <Metric>
          <HealthAndSafetyRoundedIcon />
          Backup {getBackupLabel(database.backup)}
        </Metric>
      </ResourceMetricList>

      <UsageBlock>
        <UsageHead>
          <BlockLabel>Storage</BlockLabel>
          <UsageValue>{formatUsagePercent(database.usage.usagePercent)}</UsageValue>
        </UsageHead>
        <WorkspaceUsageMeter
          fill={engineMeta.color}
          label={`${database.name} storage usage`}
          value={database.usage.usagePercent}
        />
        <UsageMeta>{database.usage.storageLabel}</UsageMeta>
      </UsageBlock>

      <ConnectionChips
        consoleBindings={consoleBindings}
        isLoading={isBindingsLoading}
        projectBindings={projectBindings}
      />

      <CardSpacer />
      <CardMidFoot>
        <DatabaseFooterMembers database={database} tileBackground={engineMeta.color} />
      </CardMidFoot>

      <ResourceCardFooter>
        <FooterNote>
          <ScheduleRoundedIcon />
          {formatUpdatedAt(database.updatedAt)}
        </FooterNote>
        {restartMutation.isError ? (
          <Typography color="error" fontSize={10} mr="auto">
            Restart request failed
          </Typography>
        ) : null}
        <Button
          disabled={!canRestart || restartMutation.isPending}
          onClick={() => restartMutation.mutate(database.id)}
          size="small"
          startIcon={<RestartAltRoundedIcon />}
          variant="contained"
        >
          {restartMutation.isPending ? 'Preparing' : 'Restart'}
        </Button>
      </ResourceCardFooter>
    </ResourceCardRoot>
  );
}

function ConnectionChips({
  consoleBindings,
  isLoading,
  projectBindings,
}: {
  consoleBindings: DatabaseBinding[];
  isLoading: boolean;
  projectBindings: DatabaseBinding[];
}) {
  const chips = [
    ...projectBindings.map((binding) => ({ binding, type: 'project' as const })),
    ...consoleBindings.map((binding) => ({ binding, type: 'console' as const })),
  ];
  const visibleChips = chips.slice(0, 6);
  const overflow = chips.length - visibleChips.length;

  if (!isLoading && chips.length === 0) return null;

  return (
    <ConnectionChipBlock>
      <BlockLabel>Connected Projects</BlockLabel>
      <ConnectionChipRow>
        {isLoading ? (
          <ConnectionChip chipType="more">Loading bindings</ConnectionChip>
        ) : (
          visibleChips.map(({ binding, type }) => (
            <ConnectionChip chipType={type} key={binding.id} title={buildBindingTitle(binding)}>
              {type === 'project' ? <PublicRoundedIcon /> : <BuildRoundedIcon />}
              {binding.label || binding.targetName}
            </ConnectionChip>
          ))
        )}
        {overflow > 0 ? <ConnectionChip chipType="more">+{overflow}</ConnectionChip> : null}
      </ConnectionChipRow>
    </ConnectionChipBlock>
  );
}

function DatabaseFooterMembers({
  database,
  tileBackground,
}: {
  database: DatabaseResource;
  tileBackground: string;
}) {
  const collaborators = getResourceAuthors(database).slice(0, 2);
  const overflow = Math.max(0, getResourceAuthors(database).length - collaborators.length);

  return (
    <FooterMembers aria-label={`${database.owner.displayName} owner`}>
      <MemberAvatar owner style={{ background: tileBackground }}>
        {getInitials(database.owner.displayName, 'OW')}
      </MemberAvatar>
      {collaborators.map((collaborator) => (
        <MemberAvatar
          key={collaborator.sub || collaborator.email}
          style={{ background: '#818cf8' }}
        >
          {getInitials(collaborator.displayName, 'CO')}
        </MemberAvatar>
      ))}
      {overflow > 0 ? <MemberMore>+{overflow}</MemberMore> : null}
    </FooterMembers>
  );
}

function DatabaseCardsPagination({
  currentPage,
  pageSize,
  setPage,
  totalItems,
  totalPages,
}: {
  currentPage: number;
  pageSize: number;
  setPage: (page: number) => void;
  totalItems: number;
  totalPages: number;
}) {
  if (totalItems <= pageSize) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(totalItems, currentPage * pageSize);

  return (
    <PaginationRoot aria-label="리소스 페이지네이션">
      <PaginationSummary>
        총 {formatNumber(totalItems)}개 중 {formatNumber(startItem)}-{formatNumber(endItem)}
      </PaginationSummary>
      <PaginationControls>
        <PaginationButton disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>
          <ChevronLeftRoundedIcon />
        </PaginationButton>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <PaginationButton
            active={pageNumber === currentPage}
            aria-current={pageNumber === currentPage ? 'page' : undefined}
            key={pageNumber}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </PaginationButton>
        ))}
        <PaginationButton
          disabled={currentPage === totalPages}
          onClick={() => setPage(currentPage + 1)}
        >
          <ChevronRightRoundedIcon />
        </PaginationButton>
      </PaginationControls>
    </PaginationRoot>
  );
}

function getEngineMeta(engine: string): {
  color: string;
  icon: ReactNode;
  label: string;
  shortLabel: string;
} {
  if (engine === 'milvus') {
    return {
      color: 'linear-gradient(135deg,#0f766e,#5eead4)',
      icon: <HubRoundedIcon sx={{ fontSize: 20 }} />,
      label: 'Vector DB · Milvus',
      shortLabel: 'Milvus',
    };
  }

  if (engine === 'mongo') {
    return {
      color: 'linear-gradient(135deg,#16a34a,#4ade80)',
      icon: <AccountTreeRoundedIcon sx={{ fontSize: 20 }} />,
      label: 'Document DB · MongoDB',
      shortLabel: 'MongoDB',
    };
  }

  if (engine === 'mysql') {
    return {
      color: 'linear-gradient(135deg,#0891b2,#22d3ee)',
      icon: <TableChartRoundedIcon sx={{ fontSize: 20 }} />,
      label: 'Relational DB · MariaDB / MySQL',
      shortLabel: 'MariaDB',
    };
  }

  if (engine === 'elastic') {
    return {
      color: 'linear-gradient(135deg,#7c3aed,#a78bfa)',
      icon: <TravelExploreRoundedIcon sx={{ fontSize: 20 }} />,
      label: 'Search DB · Elasticsearch',
      shortLabel: 'Elastic',
    };
  }

  if (engine === 'postgres') {
    return {
      color: 'linear-gradient(135deg,#2563eb,#60a5fa)',
      icon: <StorageRoundedIcon sx={{ fontSize: 20 }} />,
      label: 'Relational DB · PostgreSQL',
      shortLabel: 'PostgreSQL',
    };
  }

  if (engine === 'redis') {
    return {
      color: 'linear-gradient(135deg,#f97316,#fb923c)',
      icon: <MemoryRoundedIcon sx={{ fontSize: 20 }} />,
      label: 'Cache DB · Redis',
      shortLabel: 'Redis',
    };
  }

  return {
    color: 'linear-gradient(135deg,#2563eb,#06b6d4)',
    icon: <DnsRoundedIcon sx={{ fontSize: 20 }} />,
    label: formatLabel(engine),
    shortLabel: formatLabel(engine),
  };
}

function getStatusTone(status: string, severity: string): ToneName {
  if (severity === 'healthy' || status === 'running') return 'healthy';
  if (severity === 'degraded' || severity === 'warning') return 'incident';
  if (severity === 'critical' || severity === 'incident') return 'incident';
  if (status === 'stopped') return 'muted';
  if (severity === 'unknown' || status === 'unknown') return 'info';

  return 'info';
}

function getStatusLabel(database: DatabaseResource) {
  if (database.health.label) return database.health.label;
  const status = database.status;

  if (status === 'running') return 'Running';
  if (status === 'unknown') return 'Unknown';

  return formatLabel(status);
}

function buildPanelDescription(resourceTotal: number) {
  if (!Number.isFinite(resourceTotal) || resourceTotal <= 0) {
    return '조회 가능한 데이터베이스 리소스가 없습니다. 권한이나 연결 상태를 확인해 주세요.';
  }

  return `${formatNumber(resourceTotal)}개의 데이터베이스 리소스를 API 기준으로 렌더링합니다. 각 카드는 사용량, 백업 정책, 최근 수정 시각, bindings, restart 액션을 실제 응답으로 연결합니다.`;
}

function getEngineText(database: DatabaseResource, label: string) {
  return database.version ? `${label} · v${database.version}` : label;
}

function getBackupLabel(backup: string) {
  if (backup === 'none') return '없음';
  if (backup === 'daily') return 'Daily';
  if (backup === 'weekly') return 'Weekly';
  if (backup === 'monthly') return 'Monthly';

  return backup || '없음';
}

function formatUsagePercent(value: number) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return '0%';

  return `${Math.max(0, Math.min(100, numeric)).toLocaleString('en-US', {
    maximumFractionDigits: 1,
  })}%`;
}

function formatUpdatedAt(value: string) {
  if (!value) return '최근 수정 정보 없음';
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return '최근 수정 정보 없음';

  return `Updated ${new Intl.DateTimeFormat('ko-KR', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)}`;
}

function formatNumber(value: number) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return '0';

  return new Intl.NumberFormat('ko-KR').format(numeric);
}

function buildBindingTitle(binding: DatabaseBinding) {
  return [binding.label || binding.targetName, binding.description].filter(Boolean).join(' · ');
}

function getResourceAuthors(database: DatabaseResource) {
  return (database.collaborators || []).filter(
    (collaborator) => !isSamePrincipal(collaborator, database.owner),
  );
}

function isSamePrincipal(left: DatabaseResource['owner'], right: DatabaseResource['owner']) {
  return ['sub', 'email', 'userId', 'displayName'].some((key) => {
    const typedKey = key as keyof DatabaseResource['owner'];
    const leftValue = String(left?.[typedKey] || '')
      .trim()
      .toLowerCase();
    const rightValue = String(right?.[typedKey] || '')
      .trim()
      .toLowerCase();

    return Boolean(leftValue && rightValue && leftValue === rightValue);
  });
}
