import type { SvgIconComponent } from '@mui/icons-material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import type { SxProps, Theme, TooltipProps } from '@mui/material';
import { Box, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { useAppStore } from '@/stores/appStore';

import type { ApiContractStatus, SectionProgress, SectionStatusInfo } from './types';

const progressCopy: Record<SectionProgress, { icon: SvgIconComponent; label: string }> = {
  blocked: { icon: ErrorOutlineRoundedIcon, label: 'Blocked' },
  implemented: { icon: TaskAltRoundedIcon, label: 'Implemented' },
  'in-progress': { icon: PendingActionsRoundedIcon, label: 'In Progress' },
  'not-assessed': { icon: HelpOutlineRoundedIcon, label: 'Not assessed' },
  planned: { icon: InfoOutlinedIcon, label: 'Planned' },
  verified: { icon: CheckCircleRoundedIcon, label: 'Verified' },
};

const contractCopy: Record<ApiContractStatus, string> = {
  accepted: 'Accepted response contract',
  deferred: 'Deferred or out of current scope',
  'fixture-backed': 'Fixture-backed data only',
  missing: 'Missing response contract',
  none: 'No API required',
  'overlay-only': 'Overlay mapping only',
};

type SectionStatusBadgeProps = {
  disabled?: boolean;
  placement?: TooltipProps['placement'];
  size?: number;
  status: SectionStatusInfo;
  sx?: BadgeSx;
  tabIndex?: number;
};

type BadgeSx = Exclude<SxProps<Theme>, readonly unknown[]>;

export function SectionStatusBadge({
  disabled = false,
  placement = 'bottom',
  size = 20,
  status,
  sx,
  tabIndex,
}: SectionStatusBadgeProps) {
  const referenceStatusVisible = useAppStore((state) => state.referenceStatusVisible);

  if (!referenceStatusVisible) {
    return null;
  }

  const tone = getProgressTone(status.progress);
  const Icon = progressCopy[status.progress].icon;
  const sxOverrides = toSxArray(sx);
  const iconButton = (
    <IconButton
      aria-hidden={disabled ? true : undefined}
      aria-label={`${status.page} ${status.section} status: ${progressCopy[status.progress].label}`}
      data-section-status={status.id}
      disabled={disabled}
      size="small"
      sx={[
        (theme) => ({
          bgcolor: alpha(tone.color, 0.1),
          border: `1px solid ${alpha(tone.color, 0.22)}`,
          color: tone.color,
          height: size,
          ml: 0.5,
          p: 0,
          width: size,
          '&:hover': {
            bgcolor: alpha(tone.color, 0.16),
            borderColor: alpha(tone.color, 0.34),
          },
          '&:focus-visible': {
            outline: theme.workspace.focus.outline,
            outlineOffset: 2,
          },
        }),
        ...sxOverrides,
      ]}
      tabIndex={disabled ? -1 : tabIndex}
    >
      <Icon sx={{ fontSize: Math.max(12, size - 6) }} />
    </IconButton>
  );

  if (disabled) {
    return iconButton;
  }

  return (
    <Tooltip
      arrow
      enterTouchDelay={0}
      placement={placement}
      title={<StatusTooltip status={status} />}
    >
      {iconButton}
    </Tooltip>
  );
}

function StatusTooltip({ status }: { status: SectionStatusInfo }) {
  const progress = progressCopy[status.progress].label;
  const apis = status.apis ?? [];
  const evidence = status.progress === 'verified' ? 'Verified' : status.evidence;

  return (
    <Box sx={{ maxWidth: 560, p: 0.5 }}>
      <Stack spacing={1}>
        <Box>
          <Typography fontSize={12} fontWeight={800} lineHeight={1.45}>
            {status.page} :: {status.section}
          </Typography>
          <Typography color="inherit" fontSize={11} sx={{ opacity: 0.78 }}>
            Progress: {progress}
          </Typography>
          {status.readiness ? (
            <Typography color="inherit" fontSize={11} sx={{ opacity: 0.78 }}>
              Readiness: {status.readiness}
            </Typography>
          ) : null}
        </Box>

        <DetailLine label="Reference" values={[status.reference]} />
        {apis.length > 0 ? (
          <ApiLines apis={apis} />
        ) : (
          <DetailLine label="API" values={['No API required.']} />
        )}
        <DetailLine inline label="Fields" values={status.fieldsUsed ?? []} />
        <DetailLine label="Blocker" values={status.blockers ?? []} />
        <DetailLine label="Next" values={status.nextAction ? [status.nextAction] : []} />
        <DetailLine label="Evidence" values={evidence ? [evidence] : []} />
      </Stack>
    </Box>
  );
}

function ApiLines({ apis }: { apis: NonNullable<SectionStatusInfo['apis']> }) {
  return (
    <Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,.16)', mb: 0.75 }} />
      <Label>API</Label>
      <Stack spacing={0.75}>
        {apis.map((api, index) => (
          <Box key={`${api.method}-${api.path}-${index}`}>
            <Typography fontSize={11} lineHeight={1.45} sx={{ overflowWrap: 'anywhere' }}>
              {api.method} {api.path}
            </Typography>
            {api.contract ? (
              <Typography fontSize={10.5} lineHeight={1.45} sx={{ opacity: 0.78 }}>
                Contract: {contractCopy[api.contract]}
              </Typography>
            ) : null}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

function DetailLine({
  inline = false,
  label,
  values,
}: {
  inline?: boolean;
  label: string;
  values: string[];
}) {
  const visibleValues = values.filter(Boolean);

  if (visibleValues.length === 0) {
    return null;
  }

  return (
    <Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,.16)', mb: 0.75 }} />
      <Label>{label}</Label>
      {inline ? (
        <Box sx={{ columnGap: 0.75, display: 'flex', flexWrap: 'wrap', rowGap: 0.35 }}>
          {visibleValues.map((value, index) => (
            <Typography
              component="span"
              fontSize={11}
              key={value}
              lineHeight={1.45}
              sx={{ overflowWrap: 'anywhere' }}
            >
              {value}
              {index < visibleValues.length - 1 ? ',' : ''}
            </Typography>
          ))}
        </Box>
      ) : (
        <Stack spacing={0.5}>
          {visibleValues.map((value) => (
            <Typography
              fontSize={11}
              key={value}
              lineHeight={1.45}
              sx={{ overflowWrap: 'anywhere' }}
            >
              {value}
            </Typography>
          ))}
        </Stack>
      )}
    </Box>
  );
}

function Label({ children }: { children: string }) {
  return (
    <Typography fontSize={10} fontWeight={800} letterSpacing="0.08em" sx={{ opacity: 0.7 }}>
      {children.toUpperCase()}
    </Typography>
  );
}

function getProgressTone(progress: SectionProgress) {
  if (progress === 'verified') return { color: '#15803d' };
  if (progress === 'implemented') return { color: '#2563eb' };
  if (progress === 'blocked') return { color: '#dc2626' };
  if (progress === 'in-progress' || progress === 'planned') return { color: '#d97706' };

  return { color: '#64748b' };
}

function toSxArray(sx: BadgeSx | undefined): BadgeSx[] {
  if (!sx) return [];
  return [sx];
}
