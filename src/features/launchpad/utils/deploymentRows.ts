import { routes } from '@/config/routes';
import type { Job, Project } from '@/features/launchpad/types';
import { getJobTitle } from '@/features/launchpad/utils/statusTone';
import { formatRelativeTime } from '@/lib/formatters';

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
  const projectIcons = ['language', 'dashboard', 'schedule'];
  const projectRows = projects.map((project, index) => ({
    href: routes.projects,
    icon: getCycledValue(projectIcons, index),
    iconBackground: getCycledValue(DEPLOYMENT_GRADIENTS, index),
    id: `project-${project.id}`,
    name: project.name,
    status: project.visibility === 'private' ? 'Running' : 'Stopped',
    version: `${project.projectType} · ${formatRelativeTime(project.updatedAt)}`,
  }));
  const jobRows = jobs.map((job, index) => ({
    href: routes.projects,
    icon: index % 2 === 0 ? 'schedule' : 'smart_toy',
    iconBackground: getCycledValue(DEPLOYMENT_GRADIENTS, projectRows.length + index),
    id: `job-${job.id}`,
    name: getJobTitle(job.type),
    status: getDeploymentStatus(job.status),
    version: `${job.type} · ${formatRelativeTime(job.updatedAt)}`,
  }));

  return [...projectRows, ...jobRows].slice(0, 5);
}

function getCycledValue(values: string[], index: number) {
  return values[index % values.length] ?? values[0] ?? '';
}

function getDeploymentStatus(status: string) {
  const normalized = status.toLowerCase();

  if (['queued', 'pending', 'building'].includes(normalized)) return 'Building';
  if (['failed', 'error', 'denied'].includes(normalized)) return 'Error';
  if (['stopped', 'cancelled'].includes(normalized)) return 'Stopped';

  return 'Running';
}

const DEPLOYMENT_GRADIENTS = [
  'linear-gradient(135deg,#34d399,#0d9488)',
  'linear-gradient(135deg,#4f8cff,#3b6fcf)',
  'linear-gradient(135deg,#22d3ee,#0086cc)',
  'linear-gradient(135deg,#a78bfa,#7c5fcf)',
  'linear-gradient(135deg,#d6d8db,#9298a0)',
];
