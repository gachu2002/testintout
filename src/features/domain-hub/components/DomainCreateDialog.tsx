import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
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

import { useCreateDomainMutation } from '@/features/domain-hub/hooks/useDomainHubQueries';

const ProgressPanel = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  background: `linear-gradient(135deg, ${alpha('#4f46e5', 0.1)}, ${alpha('#60a5fa', 0.12)})`,
  border: `1px solid ${alpha('#4f46e5', 0.14)}`,
  borderRadius: theme.workspace.radii.xl,
  display: 'flex',
  gap: theme.spacing(1.25),
  padding: theme.spacing(1.5),
}));

const StepBadge = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  background: 'linear-gradient(135deg,#4f46e5,#60a5fa)',
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

export function DomainCreateDialog({ onClose, open }: { onClose: () => void; open: boolean }) {
  const [domainName, setDomainName] = useState('');
  const [validationError, setValidationError] = useState('');
  const createDomainMutation = useCreateDomainMutation();
  const submittedUrl = useMemo(() => toAbsoluteDomainUrl(domainName), [domainName]);
  const trimmedDomainName = domainName.trim();
  const errorMessage =
    validationError ||
    (createDomainMutation.isError ? getErrorMessage(createDomainMutation.error) : '');

  const resetDialogState = () => {
    setDomainName('');
    setValidationError('');
    createDomainMutation.reset();
  };

  const handleClose = () => {
    if (createDomainMutation.isPending) return;
    resetDialogState();
    onClose();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!trimmedDomainName) {
      setValidationError('도메인 이름을 입력해 주세요.');
      return;
    }

    if (!submittedUrl) {
      setValidationError('유효한 도메인 주소를 입력해 주세요.');
      return;
    }

    setValidationError('');

    void submitDomain(submittedUrl);
  };

  const submitDomain = async (url: string) => {
    try {
      await createDomainMutation.mutateAsync({ url });
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
              <Stack alignItems="center" direction="row" spacing={1}>
                <StepBadge>1</StepBadge>
                <Typography component="span" variant="h6">
                  도메인을 생성합니다
                </Typography>
              </Stack>
              <Typography color="text.secondary" sx={{ mt: 1 }} variant="body2">
                이름만 입력하면 나머지 연결과 인증서 설정은 상세 화면에서 이어서 진행할 수 있습니다.
              </Typography>
            </Box>
            <StepBadge aria-hidden="true" sx={{ height: 42, width: 42 }}>
              <LanguageRoundedIcon sx={{ fontSize: 22 }} />
            </StepBadge>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2.25} sx={{ pt: 1 }}>
            <ProgressPanel>
              <StepBadge>1</StepBadge>
              <Box minWidth={0}>
                <Typography color="text.secondary" fontSize={11} fontWeight={800}>
                  도메인 이름
                </Typography>
                <Typography fontWeight={800} noWrap>
                  {trimmedDomainName || '아직 입력되지 않았습니다.'}
                </Typography>
              </Box>
            </ProgressPanel>
            <TextField
              disabled={createDomainMutation.isPending}
              fullWidth
              helperText="현재 화면에서는 이름만 먼저 등록하고, 이후 상세에서 프로젝트와 연결합니다."
              label="도메인 이름을 입력해주세요."
              onChange={(event) => {
                setDomainName(event.target.value);
                setValidationError('');
                createDomainMutation.reset();
              }}
              placeholder="예: app.workspace.lge.com"
              required
              value={domainName}
            />
            {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            disabled={createDomainMutation.isPending}
            onClick={handleClose}
            variant="outlined"
          >
            취소
          </Button>
          <Button
            disabled={!trimmedDomainName || createDomainMutation.isPending}
            startIcon={<AddCircleRoundedIcon />}
            type="submit"
            variant="contained"
          >
            {createDomainMutation.isPending ? '생성 중...' : '도메인 생성'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

function toAbsoluteDomainUrl(value: string) {
  const input = value.trim();
  if (!input) return '';

  const candidate = /^[a-z]+:\/\//i.test(input) ? input : `https://${input}`;

  try {
    return new URL(candidate).toString();
  } catch {
    return '';
  }
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return '도메인 생성에 실패했습니다.';
}
