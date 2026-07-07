export function getArticleGradient(category: string) {
  if (category === 'development') return 'linear-gradient(135deg,#3157b7,#111827)';
  if (category === 'security') return 'linear-gradient(135deg,#b91c1c,#111827)';

  return 'linear-gradient(135deg,#475569,#111827)';
}
