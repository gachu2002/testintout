export { getStatusTone } from '@/lib/statusTone';

export function getJobTitle(type: string) {
  if (type.includes('approval')) return 'Approval workflow';
  if (type.includes('mail')) return 'Mail notification job';
  if (type.includes('notify')) return 'Workspace notification job';

  return type;
}
