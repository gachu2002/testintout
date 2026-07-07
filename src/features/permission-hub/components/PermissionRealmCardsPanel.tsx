import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import { Box, Button, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import type { ReactNode } from 'react';

import {
  Badge,
  buildResourceResultCopy,
  IconTile,
  Metric,
  Tag,
  WorkspaceResourceCardsPanel,
} from '@/components/workspace';
import {
  ResourceCardFooter,
  ResourceCardRoot,
  ResourceCardTop,
  ResourceInfoBadge,
  ResourceInfoBlock,
  ResourceInfoCard,
  ResourceMeta,
  ResourceMetricList,
  ResourceName,
  ResourceNameRow,
  ResourceStatusRow,
} from '@/components/workspace/ResourceCardPrimitives';
import { ResourceInfoText, ResourceMenuIcon } from '@/components/workspace/ResourceCards';
import { permissionHubSectionStatus } from '@/features/permission-hub/sectionStatus';
import type {
  PermissionKindFilter,
  PermissionRealm,
  PermissionRealmKind,
  PermissionRealmStatus,
} from '@/features/permission-hub/types';
import { formatDate, formatLabel, getInitials } from '@/lib/formatters';
import type { ToneName } from '@/styles/tokens';

const panelCopy = {
  description:
    'Permission Realm 목록을 한곳에 모았습니다. 각 카드에서는 연결된 프로젝트와 포함된 Role을 함께 보고, 요청 흐름은 계약이 제공되면 우측 패널에서 이어서 확인합니다.',
  empty: '선택한 필터에 맞는 Permission Realm이 없습니다.',
  label: 'Permission Realms',
  title: 'Realms',
};

const KindPill = styled('span')(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: 10,
  fontWeight: 700,
}));

const BlockLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: 11,
  fontWeight: 800,
  letterSpacing: '.08em',
  marginBottom: theme.spacing(1),
  textTransform: 'uppercase',
}));

const RoleList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.75),
}));

const RoleTag = styled(Tag, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ active = false, theme }) => ({
  ...(active
    ? {
        backgroundColor: alpha(theme.workspace.hubThemes.permissions.brand, 0.1),
        borderColor: alpha(theme.workspace.hubThemes.permissions.brand, 0.24),
        color: theme.workspace.hubThemes.permissions.brand,
      }
    : {}),
}));

const RoleBlock = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1.75),
}));

export function PermissionRealmCardsPanel({
  activeKind,
  isLoading,
  loadedCount,
  realms,
  total,
}: {
  activeKind: PermissionKindFilter;
  isLoading: boolean;
  loadedCount: number;
  realms: PermissionRealm[];
  total?: number;
}) {
  return (
    <WorkspaceResourceCardsPanel
      description={panelCopy.description}
      emptyCopy={panelCopy.empty}
      hub="permissions"
      icon={<AdminPanelSettingsRoundedIcon sx={{ fontSize: 14 }} />}
      isEmpty={realms.length === 0}
      isLoading={isLoading}
      label={panelCopy.label}
      resultCopy={buildResourceResultCopy({
        filterLabel: activeKind === 'all' ? undefined : getKindMeta(activeKind).label.toLowerCase(),
        isDefault: activeKind === 'all',
        loadedCount,
        total,
        visibleCount: realms.length,
      })}
      status={permissionHubSectionStatus.cards}
      title={panelCopy.title}
    >
      {realms.map((realm) => (
        <PermissionRealmCard key={realm.id} realm={realm} />
      ))}
    </WorkspaceResourceCardsPanel>
  );
}

function PermissionRealmCard({ realm }: { realm: PermissionRealm }) {
  const kindMeta = getKindMeta(realm.kind);
  const roles = Array.isArray(realm.roles) ? realm.roles : [];
  const boundProjects = Array.isArray(realm.boundProjects) ? realm.boundProjects : [];
  const currentUserRoles = Array.isArray(realm.currentUserRoles)
    ? realm.currentUserRoles
    : Array.isArray(realm.access?.currentUserRoles)
      ? realm.access.currentUserRoles
      : [];
  const roleCount = roles.length;
  const boundProjectCount = realm.projectCount || boundProjects.length;
  const canManageRealm = Boolean(realm.capabilities?.canApprove || realm.access?.canManage);
  const viewerRoles = new Set(currentUserRoles.map((role) => role.toLowerCase()));

  return (
    <ResourceCardRoot cardMinHeight={360} hub="permissions">
      <ResourceCardTop>
        <Box minWidth={0}>
          <ResourceStatusRow>
            <Badge dot tone={getStatusTone(realm.status)}>
              {getStatusLabel(realm.status)}
            </Badge>
            <KindPill>{kindMeta.label} Realm</KindPill>
          </ResourceStatusRow>
          <ResourceNameRow>
            <IconTile tileBackground={kindMeta.color} tileSize={42}>
              {kindMeta.icon}
            </IconTile>
            <Box minWidth={0}>
              <ResourceName>{realm.name}</ResourceName>
              <ResourceMeta>
                {realm.description.trim() || `${kindMeta.label} Permission Realm`}
              </ResourceMeta>
            </Box>
          </ResourceNameRow>
        </Box>
        <ResourceMenuIcon />
      </ResourceCardTop>

      <ResourceMetricList>
        <Metric>
          <GroupsRoundedIcon />
          Members {realm.memberCount.toLocaleString()}
        </Metric>
        <Metric>
          <BadgeRoundedIcon />
          Roles {roleCount.toLocaleString()}
        </Metric>
        <Metric>
          <LinkRoundedIcon />
          Projects {boundProjectCount.toLocaleString()}
        </Metric>
        {canManageRealm ? (
          <Metric>
            <VerifiedUserRoundedIcon />
            Manage enabled
          </Metric>
        ) : null}
      </ResourceMetricList>

      <ResourceInfoBlock>
        <BlockLabel>Projects</BlockLabel>
        {boundProjects.length > 0 ? (
          boundProjects.slice(0, 3).map((project) => (
            <ResourceInfoCard key={project.id}>
              <ResourceInfoBadge tileBackground={kindMeta.color} tileSize={30}>
                {getInitials(project.label, 'PR')}
              </ResourceInfoBadge>
              <ResourceInfoText
                meta={project.role ? `binding role · ${project.role}` : 'project binding'}
                title={project.label}
              />
            </ResourceInfoCard>
          ))
        ) : (
          <ResourceInfoCard>
            <ResourceInfoBadge hub="permissions" tileSize={30}>
              PR
            </ResourceInfoBadge>
            <ResourceInfoText meta="현재 바인딩된 프로젝트가 없습니다." title="No project bound" />
          </ResourceInfoCard>
        )}
      </ResourceInfoBlock>

      <RoleBlock>
        <BlockLabel>Roles</BlockLabel>
        <RoleList>
          {roles.length > 0 ? (
            roles.map((role) => {
              const isViewerRole = viewerRoles.has(role.name.toLowerCase());

              return (
                <RoleTag active={isViewerRole} key={role.name}>
                  <BadgeRoundedIcon />
                  {role.name}({role.memberCount.toLocaleString()})
                </RoleTag>
              );
            })
          ) : (
            <RoleTag>
              <BadgeRoundedIcon />
              No roles
            </RoleTag>
          )}
        </RoleList>
      </RoleBlock>

      <ResourceCardFooter>
        <Typography color="text.disabled" fontSize={10} mr="auto">
          Updated {formatDate(realm.updatedAt)}
        </Typography>
        <Button disabled size="small" startIcon={<DeleteOutlineRoundedIcon />} variant="outlined">
          Delete
        </Button>
        <Button disabled size="small" startIcon={<OpenInNewRoundedIcon />} variant="contained">
          Detail
        </Button>
      </ResourceCardFooter>
    </ResourceCardRoot>
  );
}

function getKindMeta(kind: PermissionRealmKind): {
  color: string;
  icon: ReactNode;
  label: string;
} {
  if (kind === 'platform') {
    return {
      color: 'linear-gradient(135deg,#be185d,#fb7185)',
      icon: <AdminPanelSettingsRoundedIcon sx={{ fontSize: 20 }} />,
      label: 'Platform',
    };
  }

  if (kind === 'project') {
    return {
      color: 'linear-gradient(135deg,#2563eb,#60a5fa)',
      icon: <TaskAltRoundedIcon sx={{ fontSize: 20 }} />,
      label: 'Project',
    };
  }

  if (kind === 'resource') {
    return {
      color: 'linear-gradient(135deg,#0f766e,#5eead4)',
      icon: <StorageRoundedIcon sx={{ fontSize: 20 }} />,
      label: 'Resource',
    };
  }

  return {
    color: 'linear-gradient(135deg,#db2777,#f472b6)',
    icon: <VpnKeyRoundedIcon sx={{ fontSize: 20 }} />,
    label: 'Scoped',
  };
}

function getStatusLabel(status: PermissionRealmStatus) {
  if (status === 'active') return 'Active';
  if (status === 'review') return 'Review';

  return formatLabel(status);
}

function getStatusTone(status: PermissionRealmStatus): ToneName {
  if (status === 'active') return 'healthy';
  if (status === 'review') return 'review';

  return 'info';
}
