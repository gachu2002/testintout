import { workspaceTokens } from '@/styles/tokens';

export function getStatusTone(status: string) {
  const normalized = status.toLowerCase();

  if (
    ['active', 'approved', 'done', 'executed', 'healthy', 'private', 'running'].includes(normalized)
  ) {
    return {
      background: workspaceTokens.colors.greenBackground,
      color: workspaceTokens.colors.green,
    };
  }

  if (['queued', 'review', 'building'].includes(normalized)) {
    return {
      background: workspaceTokens.colors.blueBackground,
      color: workspaceTokens.colors.blue,
    };
  }

  if (normalized === 'pending') {
    return {
      background: workspaceTokens.colors.orangeBackground,
      color: workspaceTokens.colors.orange,
    };
  }

  if (['denied', 'error', 'failed', 'rejected'].includes(normalized)) {
    return { background: '#fee2e2', color: '#b91c1c' };
  }

  return {
    background: workspaceTokens.colors.background,
    color: workspaceTokens.colors.textTertiary,
  };
}
