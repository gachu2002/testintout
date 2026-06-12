export function getArticleGradient(category: string) {
  if (category === 'ai') return 'linear-gradient(135deg,#a78bfa,#7c5fcf)';
  if (category === 'security') return 'linear-gradient(135deg,#f472b6,#b40e4d)';

  return 'linear-gradient(135deg,#22d3ee,#0086cc)';
}
