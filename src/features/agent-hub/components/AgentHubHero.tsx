import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import ApprovalRoundedIcon from '@mui/icons-material/ApprovalRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import { Button } from '@mui/material';
import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { StatGrid, StatTile } from '@/components/workspace';
import { WorkspaceHubHero } from '@/components/workspace/HubHero';
import { workspaceHubHeroActionButtonSx } from '@/components/workspace/HubHeroStyles';
import { routes } from '@/config/routes';
import { agentHubSectionStatus } from '@/features/agent-hub/sectionStatus';
import type { AgentHubStats, AgentStatsCard } from '@/features/agent-hub/types';

const heroCopy = {
  description:
    '실제로 업무를 실행하는 Dify agent를 모았습니다. Agent 자체와 runtime, workflow, approval, key 정책을 한 화면에서 빠르게 확인합니다.',
  eyebrow: 'AI · Automation Runtimes',
  primaryAction: '새 Agent 생성',
  secondaryAction: 'Keycenter 보기',
  title: 'Agent Hub',
};

const statColors = [
  'linear-gradient(135deg,#7c3aed,#8b5cf6)',
  'linear-gradient(135deg,#6d28d9,#a78bfa)',
  'linear-gradient(135deg,#8b5cf6,#c4b5fd)',
  'linear-gradient(135deg,#5b21b6,#8b5cf6)',
  'linear-gradient(135deg,#0e7490,#22d3ee)',
];

export function AgentHubHero({ isLoading, stats }: { isLoading: boolean; stats?: AgentHubStats }) {
  const cards = stats?.cards ?? [];

  return (
    <WorkspaceHubHero
      actions={
        <>
          <Button
            disabled
            startIcon={<AddCircleRoundedIcon />}
            sx={workspaceHubHeroActionButtonSx}
            variant="contained"
          >
            {heroCopy.primaryAction}
          </Button>
          <Button
            component={RouterLink}
            startIcon={<KeyRoundedIcon />}
            sx={workspaceHubHeroActionButtonSx}
            to={routes.keycenter}
            variant="outlined"
          >
            {heroCopy.secondaryAction}
          </Button>
        </>
      }
      description={heroCopy.description}
      eyebrow={heroCopy.eyebrow}
      eyebrowIcon={<SmartToyRoundedIcon sx={{ fontSize: 15 }} />}
      hub="agents"
      status={agentHubSectionStatus.heroFilters}
      title={heroCopy.title}
    >
      <StatGrid>
        {buildStatCards(cards).map((card, index) => (
          <StatTile
            color={statColors[index % statColors.length]}
            icon={getStatIcon(card.id)}
            isLoading={isLoading}
            key={card.id}
            label={card.label}
            note={card.note}
            value={card.value.toLocaleString()}
          />
        ))}
      </StatGrid>
    </WorkspaceHubHero>
  );
}

function buildStatCards(cards: AgentStatsCard[]) {
  if (cards.length > 0) return cards;

  return [
    { id: 'agents', label: '등록 Agent', note: 'agent stats loading', value: 0 },
    { id: 'workflow', label: 'Workflow', note: 'workflow stats loading', value: 0 },
    { id: 'reviewer', label: 'Reviewer', note: 'reviewer stats loading', value: 0 },
    { id: 'linkedTools', label: 'Linked Tools', note: 'tool stats loading', value: 0 },
    { id: 'approval', label: 'Approval Enabled', note: 'approval stats loading', value: 0 },
  ];
}

function getStatIcon(id: string): ReactNode {
  if (id === 'workflow') return <AccountTreeRoundedIcon sx={{ fontSize: 20 }} />;
  if (id === 'reviewer') return <ApprovalRoundedIcon sx={{ fontSize: 20 }} />;
  if (id === 'linkedTools') return <Inventory2RoundedIcon sx={{ fontSize: 20 }} />;
  if (id === 'approval') return <ApprovalRoundedIcon sx={{ fontSize: 20 }} />;

  return <SmartToyRoundedIcon sx={{ fontSize: 20 }} />;
}
