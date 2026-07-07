import { routes } from '@/config/routes';
import type { Job, Project } from '@/features/launchpad/types';
import { formatLaunchpadRelativeTime } from '@/features/launchpad/utils/referenceFormatters';

export type DeploymentRow = {
  href: string;
  icon: string;
  iconBackground: string;
  id: string;
  name: string;
  status: string;
  version: string;
};

export function buildDeploymentRows(projects: Project[], jobs: Job[]): DeploymentRow[] {
  return projects.slice(0, 5).map((project, index) => ({
    href: routes.projects,
    icon: 'rocket_launch',
    iconBackground: getCycledValue(DEPLOYMENT_GRADIENTS, index),
    id: `project-${project.id}`,
    name: project.name,
    status: getProjectPill(project, jobs),
    version: `${project.ide || project.projectType || 'workspace'} · ${formatLaunchpadRelativeTime(
      project.updatedAt,
    )}`,
  }));
}

function getCycledValue(values: string[], index: number) {
  return values[index % values.length] ?? values[0] ?? '';
}

function getProjectPill(project: Project, jobs: Job[]) {
  const match = jobs.find((job) => String(job.id || '').includes(project.id || ''));
  const normalized = match?.status.toLowerCase();

  if (normalized === 'running') return 'Running';
  if (normalized === 'queued') return 'Queued';
  if (normalized === 'failed') return 'Error';

  return 'Ready';
}

const DEPLOYMENT_GRADIENTS = [
  'linear-gradient(135deg,#34d399,#0d9488)',
  'linear-gradient(135deg,#4f8cff,#3b6fcf)',
  'linear-gradient(135deg,#22d3ee,#0086cc)',
  'linear-gradient(135deg,#a78bfa,#7c5fcf)',
  'linear-gradient(135deg,#d6d8db,#9298a0)',
];
