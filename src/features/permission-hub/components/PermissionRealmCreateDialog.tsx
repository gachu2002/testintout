import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';

import { useCreatePermissionRealmMutation } from '@/features/permission-hub/hooks/usePermissionHubQueries';

const ProgressPanel = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  background: `linear-gradient(135deg, ${alpha('#be185d', 0.1)}, ${alpha('#fb7185', 0.12)})`,
  border: `1px solid ${alpha('#be185d', 0.14)}`,
  borderRadius: theme.workspace.radii.xl,
  display: 'flex',
  gap: theme.spacing(1.25),
  padding: theme.spacing(1.5),
}));

const StepBadge = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  background: 'linear-gradient(135deg,#be185d,#fb7185)',
  borderRadius: 999,
  color: theme.palette.common.white,
  display: 'inline-flex',
  flexShrink: 0,
  fontSize: 12,
  fontWeight: theme.workspace.typography.weights.extraBold,
  height: 30,
  justifyContent: 'center',
  width: 30,
}));

export function PermissionRealmCreateDialog({
  existingRealmNames,
  onClose,
  open,
}: {
  existingRealmNames: string[];
  onClose: () => void;
  open: boolean;
}) {
  const createRealmMutation = useCreatePermissionRealmMutation();
  const [realmName, setRealmName] = useState('');
  const [validationError, setValidationError] = useState('');
  const normalizedName = realmName.trim();
  const existingNames = useMemo(
    () => new Set(existingRealmNames.map((name) => name.trim().toLowerCase()).filter(Boolean)),
    [existingRealmNames],
  );
  const duplicateName = normalizedName ? existingNames.has(normalizedName.toLowerCase()) : false;
  const feedbackMessage = getFeedbackMessage({
    duplicateName,
    error: createRealmMutation.isError ? createRealmMutation.error : null,
    normalizedName,
    validationError,
  });

  const resetDialogState = () => {
    setRealmName('');
    setValidationError('');
    createRealmMutation.reset();
  };

  const handleClose = () => {
    if (createRealmMutation.isPending) return;
    resetDialogState();
    onClose();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!normalizedName) {
      setValidationError('Realm 이름을 입력해 주세요.');
      return;
    }

    if (duplicateName) {
      setValidationError('같은 이름의 Realm이 이미 있습니다.');
      return;
    }

    setValidationError('');
    void submitRealm(normalizedName);
  };

  const submitRealm = async (name: string) => {
    try {
      await createRealmMutation.mutateAsync({ kind: 'scoped', name });
      resetDialogState();
      onClose();
    } catch {
      // The mutation error is rendered from React Query state.
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" onClose={handleClose} open={open}>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle sx={{ pb: 1.5 }}>
          <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={2}>
            <Box>
              <Typography color="primary" fontSize={11} fontWeight={900} letterSpacing=".08em">
                Create Realm
              </Typography>
              <Stack alignItems="center" direction="row" spacing={1} sx={{ mt: 0.75 }}>
                <StepBadge>1</StepBadge>
                <Typography component="span" variant="h6">
                  Realm 생성
                </Typography>
              </Stack>
              <Typography color="text.secondary" sx={{ mt: 1 }} variant="body2">
                중복되지 않은 이름이면 새 Permission Realm을 바로 생성합니다.
              </Typography>
            </Box>
            <StepBadge aria-hidden="true" sx={{ height: 42, width: 42 }}>
              <VpnKeyRoundedIcon sx={{ fontSize: 22 }} />
            </StepBadge>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2.25} sx={{ pt: 1 }}>
            <ProgressPanel>
              <StepBadge>1</StepBadge>
              <Box minWidth={0}>
                <Typography color="text.secondary" fontSize={11} fontWeight={800}>
                  Realm 이름
                </Typography>
                <Typography fontWeight={800} noWrap>
                  {normalizedName || '아직 입력되지 않았습니다.'}
                </Typography>
              </Box>
            </ProgressPanel>
            <TextField
              disabled={createRealmMutation.isPending}
              error={Boolean(validationError || duplicateName || createRealmMutation.isError)}
              fullWidth
              helperText="새 Realm은 기본적으로 scoped 타입으로 생성됩니다."
              label="Realm 이름"
              onChange={(event) => {
                setRealmName(event.target.value);
                setValidationError('');
                createRealmMutation.reset();
              }}
              placeholder="예: workspace-analytics"
              required
              value={realmName}
            />
            {feedbackMessage ? (
              <Alert severity={feedbackMessage.severity}>{feedbackMessage.text}</Alert>
            ) : null}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button disabled={createRealmMutation.isPending} onClick={handleClose} variant="outlined">
            취소
          </Button>
          <Button
            disabled={!normalizedName || duplicateName || createRealmMutation.isPending}
            startIcon={<AddCircleRoundedIcon />}
            type="submit"
            variant="contained"
          >
            {createRealmMutation.isPending ? '생성중...' : '생성'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

function getFeedbackMessage({
  duplicateName,
  error,
  normalizedName,
  validationError,
}: {
  duplicateName: boolean;
  error: unknown;
  normalizedName: string;
  validationError: string;
}) {
  if (validationError) {
    return { severity: 'error' as const, text: validationError };
  }

  if (duplicateName) {
    return { severity: 'error' as const, text: '같은 이름의 Realm이 이미 있습니다.' };
  }

  if (error) {
    return { severity: 'error' as const, text: getErrorMessage(error) };
  }

  if (normalizedName) {
    return { severity: 'success' as const, text: '사용 가능한 이름입니다.' };
  }

  return null;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Realm 생성에 실패했습니다.';
}
