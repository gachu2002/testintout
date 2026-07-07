import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { type ReactNode, useMemo, useState } from 'react';

import { Badge, IconTile } from '@/components/workspace';
import { useCreateDatabaseMutation } from '@/features/database-hub/hooks/useDatabaseHubQueries';

type DatabaseCreateDialogProps = {
  onClose: () => void;
  open: boolean;
};

type EngineOption = {
  desc: string;
  hint: string;
  id: string;
  meta: string;
  sizeHint: string;
  title: string;
};

const engineOptions: EngineOption[] = [
  {
    desc: '문서 중심 데이터를 유연하게 저장하는 DB입니다.',
    hint: '로그, 문서형 서비스, 빠른 프로토타입',
    id: 'mongo',
    meta: 'Document DB',
    sizeHint: '예: 20, 50, 100',
    title: 'MongoDB',
  },
  {
    desc: '가장 익숙한 관계형 워크로드에 적합한 DB입니다.',
    hint: '업무 시스템, 백오피스, 일반 CRUD',
    id: 'mysql',
    meta: 'Relational DB',
    sizeHint: '예: 20, 100, 200',
    title: 'MariaDB',
  },
  {
    desc: '검색과 로그 분석을 위한 인덱싱 중심 DB입니다.',
    hint: '검색, 운영 로그, 분석 쿼리',
    id: 'elastic',
    meta: 'Search DB',
    sizeHint: '예: 50, 200, 500',
    title: 'Elastic Search',
  },
  {
    desc: '확장성과 안정성이 중요한 관계형 서비스에 적합합니다.',
    hint: '서비스 DB, 분석, 복잡한 쿼리',
    id: 'postgres',
    meta: 'Relational DB',
    sizeHint: '예: 20, 100, 200',
    title: 'Postgresql',
  },
  {
    desc: '벡터 검색과 AI 검색 시나리오에 맞는 DB입니다.',
    hint: 'RAG, 추천, 임베딩 검색',
    id: 'milvus',
    meta: 'Vector DB',
    sizeHint: '예: 50, 100, 300',
    title: 'Milvus',
  },
  {
    desc: '빠른 캐시와 세션 저장에 적합한 인메모리 DB입니다.',
    hint: '캐시, 세션, 큐, 실시간 상태',
    id: 'redis',
    meta: 'Cache DB',
    sizeHint: '예: 2, 8, 16',
    title: 'redis',
  },
];
const defaultEngineOption = engineOptions[0] as EngineOption;

const steps = ['DB 종류', 'DB 정보', '생성 상태'];

const EngineGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1.25),
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

const EngineCard = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected?: boolean }>(({ selected = false, theme }) => ({
  alignItems: 'flex-start',
  borderColor: selected
    ? alpha(theme.workspace.hubThemes.database.brand, 0.5)
    : alpha(theme.workspace.colors.borderStrong, 0.85),
  borderRadius: theme.workspace.radii.xl,
  color: theme.palette.text.primary,
  display: 'grid',
  gap: theme.spacing(1),
  justifyItems: 'stretch',
  padding: theme.spacing(1.5),
  textAlign: 'left',
  textTransform: 'none',
  ...(selected
    ? {
        backgroundColor: alpha(theme.workspace.hubThemes.database.brand, 0.08),
        boxShadow: `0 0 0 1px ${alpha(theme.workspace.hubThemes.database.brand, 0.22)}`,
      }
    : {}),
}));

export function DatabaseCreateDialog({ onClose, open }: DatabaseCreateDialogProps) {
  const createMutation = useCreateDatabaseMutation();
  const [activeStep, setActiveStep] = useState(0);
  const [engine, setEngine] = useState('');
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const selectedEngine = useMemo(
    () => engineOptions.find((option) => option.id === engine) ?? defaultEngineOption,
    [engine],
  );
  const normalizedSize = normalizeDatabaseSize(size);
  const canGoNext = activeStep === 0 ? Boolean(engine) : Boolean(name.trim() && normalizedSize);
  const isSubmitting = createMutation.isPending;
  const createdDatabase = createMutation.data;

  const resetState = () => {
    createMutation.reset();
    setActiveStep(0);
    setEngine('');
    setName('');
    setSize('');
  };

  const closeDialog = () => {
    if (isSubmitting) return;
    onClose();
    resetState();
  };

  const submitCreate = async () => {
    setActiveStep(2);

    try {
      await createMutation.mutateAsync({
        engine,
        name: name.trim(),
        size: `${normalizedSize}Gi`,
      });
    } catch {
      // The dialog renders the mutation error state in the status step.
    }
  };

  const handlePrimary = async () => {
    if (activeStep === 0) {
      setActiveStep(1);
      return;
    }

    if (activeStep === 1) {
      await submitCreate();
      return;
    }

    closeDialog();
  };

  const handleBack = () => {
    if (activeStep === 0) {
      closeDialog();
      return;
    }

    setActiveStep((current) => Math.max(0, current - 1));
  };

  return (
    <Dialog fullWidth maxWidth="md" onClose={closeDialog} open={open}>
      <DialogTitle sx={{ pb: 1.5 }}>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={2}>
          <Box>
            <Typography fontSize={20} fontWeight={900} letterSpacing="-.04em">
              데이터베이스를 생성합니다
            </Typography>
            <Typography color="text.secondary" fontSize={13} mt={0.75}>
              {activeStep === 0
                ? '먼저 사용할 DB 종류를 선택해주세요.'
                : activeStep === 1
                  ? '선택한 DB의 이름과 사이즈를 입력해주세요.'
                  : '생성 진행 상황을 확인해주세요.'}
            </Typography>
          </Box>
          <IconTile hub="database" tileSize={42}>
            <StorageRoundedIcon sx={{ fontSize: 22 }} />
          </IconTile>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2.5}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 ? (
            <Stack spacing={1.5}>
              <Typography fontSize={13} fontWeight={800}>
                DB 종류를 선택해주세요.
              </Typography>
              <EngineGrid>
                {engineOptions.map((option) => {
                  const meta = getEngineMeta(option.id);

                  return (
                    <EngineCard
                      key={option.id}
                      onClick={() => setEngine(option.id)}
                      selected={engine === option.id}
                      variant="outlined"
                    >
                      <Stack direction="row" justifyContent="space-between" spacing={1.5}>
                        <IconTile tileBackground={meta.color} tileSize={36}>
                          {meta.icon}
                        </IconTile>
                        {engine === option.id ? (
                          <CheckCircleRoundedIcon color="primary" sx={{ fontSize: 18 }} />
                        ) : null}
                      </Stack>
                      <Box>
                        <Typography fontSize={14} fontWeight={900}>
                          {option.title}
                        </Typography>
                        <Typography color="text.secondary" fontSize={12} lineHeight={1.55} mt={0.5}>
                          {option.desc}
                        </Typography>
                      </Box>
                      <Typography color="text.disabled" fontSize={11}>
                        {option.meta} · {option.hint}
                      </Typography>
                    </EngineCard>
                  );
                })}
              </EngineGrid>
            </Stack>
          ) : null}

          {activeStep === 1 ? (
            <Stack spacing={2}>
              <Alert severity="info">
                {selectedEngine.title} 리소스 크기를 입력합니다. {selectedEngine.sizeHint}
              </Alert>
              <TextField
                fullWidth
                label="DB 이름"
                onChange={(event) => setName(event.target.value)}
                placeholder="예: workspace-main-postgres"
                value={name}
              />
              <TextField
                fullWidth
                inputMode="numeric"
                label="DB 사이즈"
                onChange={(event) => setSize(normalizeDatabaseSize(event.target.value))}
                placeholder={selectedEngine.sizeHint}
                slotProps={{
                  input: {
                    endAdornment: <InputAdornment position="end">Gi</InputAdornment>,
                  },
                }}
                value={size}
              />
              <Typography color="text.disabled" fontSize={12} lineHeight={1.7}>
                현재 화면에서는 이름과 크기만 먼저 정합니다. 실제 서비스에서는 프리셋, quota, 백업
                정책으로 이어서 연결할 수 있습니다.
              </Typography>
            </Stack>
          ) : null}

          {activeStep === 2 ? (
            <Stack spacing={1.5}>
              {isSubmitting ? (
                <Alert icon={<RocketLaunchRoundedIcon />} severity="info">
                  {name.trim()} {normalizedSize}Gi 생성이 진행 중입니다.
                </Alert>
              ) : null}
              {createMutation.isError ? (
                <Alert severity="error">데이터베이스 생성에 실패했습니다.</Alert>
              ) : null}
              {createdDatabase ? (
                <Alert icon={<CheckCircleRoundedIcon />} severity="success">
                  {createdDatabase.name} {createdDatabase.usage.storageLabel} 생성이 완료되었습니다.
                </Alert>
              ) : null}
              {createdDatabase ? (
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  <Badge tone="info">{createdDatabase.engine}</Badge>
                  <Badge tone="healthy">{createdDatabase.health.label}</Badge>
                  <Badge tone="draft">
                    Bindings {createdDatabase.bindingCount.toLocaleString()}
                  </Badge>
                </Stack>
              ) : null}
            </Stack>
          ) : null}
        </Stack>
      </DialogContent>
      <DialogActions>
        {activeStep < 2 ? (
          <Button disabled={isSubmitting} onClick={handleBack}>
            {activeStep === 0 ? '취소' : '뒤로'}
          </Button>
        ) : null}
        <Button
          disabled={(activeStep < 2 && !canGoNext) || isSubmitting}
          onClick={() => void handlePrimary()}
          startIcon={activeStep === 1 ? <RocketLaunchRoundedIcon /> : undefined}
          variant="contained"
        >
          {activeStep === 0 ? '다음' : activeStep === 1 ? '생성 시작' : '완료'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function normalizeDatabaseSize(value: string) {
  return value.replace(/\D+/g, '').trim();
}

function getEngineMeta(engine: string): { color: string; icon: ReactNode } {
  if (engine === 'milvus') {
    return { color: 'linear-gradient(135deg,#0f766e,#5eead4)', icon: <HubRoundedIcon /> };
  }

  if (engine === 'mongo') {
    return { color: 'linear-gradient(135deg,#16a34a,#4ade80)', icon: <DnsRoundedIcon /> };
  }

  if (engine === 'mysql') {
    return { color: 'linear-gradient(135deg,#0891b2,#22d3ee)', icon: <TableChartRoundedIcon /> };
  }

  if (engine === 'postgres') {
    return { color: 'linear-gradient(135deg,#2563eb,#60a5fa)', icon: <StorageRoundedIcon /> };
  }

  if (engine === 'redis') {
    return { color: 'linear-gradient(135deg,#f97316,#fb923c)', icon: <MemoryRoundedIcon /> };
  }

  if (engine === 'elastic') {
    return {
      color: 'linear-gradient(135deg,#7c3aed,#a78bfa)',
      icon: <TravelExploreRoundedIcon />,
    };
  }

  return { color: 'linear-gradient(135deg,#2563eb,#06b6d4)', icon: <StorageRoundedIcon /> };
}
