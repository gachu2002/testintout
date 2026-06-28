import type { LaunchpadAnnouncement, LaunchpadHero } from '@/features/launchpad/types';
import { workspaceTokens } from '@/styles/tokens';

export type BannerVariant = 'dej' | 'event' | 'release' | 'security';

export type ReferenceBannerSlide = {
  description: string;
  eyebrow: string;
  id: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  title: string;
  variant: BannerVariant;
};

export function buildBannerSlides(
  announcements: LaunchpadAnnouncement[],
  hero?: LaunchpadHero,
): ReferenceBannerSlide[] {
  const releaseAnnouncement =
    announcements.find((announcement) => announcement.type !== 'security') ?? announcements[0];
  const eventAnnouncement = announcements[1] ?? releaseAnnouncement;
  const securityAnnouncement =
    announcements.find((announcement) => announcement.type === 'security') ??
    announcements[1] ??
    announcements[0];

  return [
    {
      description:
        hero?.subtitle ??
        'Workspace 전반의 운영 현황과 바로 이어지는 작업 흐름을 한 화면에서 확인합니다.',
      eyebrow: 'Launchpad Overview API',
      id: 'about-dej',
      primaryHref: '/workspace/app-gallery',
      primaryLabel: 'App Gallery',
      secondaryHref: '/workspace/ai-gallery',
      secondaryLabel: 'AI Gallery',
      title: hero?.title ?? 'Welcome back',
      variant: 'dej',
    },
    {
      description: releaseAnnouncement?.message ?? 'Launchpad API announcements are not available.',
      eyebrow: 'Launchpad Release',
      id: releaseAnnouncement?.id ?? 'launchpad-release',
      primaryHref: releaseAnnouncement?.href ?? '/docs/api/v2/features/launchpad',
      primaryLabel: '가이드 열기',
      secondaryHref: '/workspace/app-gallery',
      secondaryLabel: 'App Gallery 보기',
      title: releaseAnnouncement?.title ?? 'Launchpad Release',
      variant: 'release',
    },
    {
      description: eventAnnouncement?.message ?? 'Launchpad spotlight content is not available.',
      eyebrow: 'AX Studio Conference',
      id: eventAnnouncement?.id ? `${eventAnnouncement.id}-spotlight` : 'launchpad-spotlight',
      primaryHref: eventAnnouncement?.href ?? '/docs/articles/token-hygiene',
      primaryLabel: '관련 문서 보기',
      secondaryHref: '/workspace/ai-gallery',
      secondaryLabel: 'AI Gallery 보기',
      title: eventAnnouncement?.title ?? 'Launchpad Spotlight',
      variant: 'event',
    },
    {
      description: securityAnnouncement?.message ?? 'Security notice content is not available.',
      eyebrow: 'Security Notice',
      id: securityAnnouncement?.id ? `${securityAnnouncement.id}-security` : 'ax-studio-security',
      primaryHref: securityAnnouncement?.href ?? '/docs/articles/token-hygiene',
      primaryLabel: '보안 가이드',
      secondaryHref: '/workspace/keycenter',
      secondaryLabel: 'Keycenter 보기',
      title: securityAnnouncement?.title ?? 'Security Notice',
      variant: 'security',
    },
  ];
}

export function getSlideVisual(variant: BannerVariant) {
  if (variant === 'dej') {
    return {
      background:
        'linear-gradient(90deg, rgba(2,12,24,.56) 0%, rgba(3,20,38,.36) 42%, rgba(3,20,38,.12) 72%, rgba(3,20,38,.04) 100%), radial-gradient(circle at center, rgba(255,255,255,.04), transparent 60%), radial-gradient(circle at 12% 14%, rgba(255,255,255,.22), transparent 24%), radial-gradient(circle at 20% 72%, rgba(34,211,238,.24), transparent 26%), radial-gradient(circle at 84% 28%, rgba(59,130,246,.26), transparent 30%), radial-gradient(circle at 72% 82%, rgba(14,165,233,.22), transparent 28%), linear-gradient(135deg, #031b31 0%, #074064 48%, #052743 100%)',
      borderColor: 'rgba(255,255,255,.16)',
      ctaBackground: 'linear-gradient(135deg, #0284c7, #22d3ee)',
      ctaHoverBackground: 'linear-gradient(135deg, #0369a1, #38bdf8)',
      ctaShadow: '0 10px 24px rgba(14,165,233,.22)',
      dotColor: '#38bdf8',
      ghostBackground: 'rgba(7,29,48,.72)',
      ghostBorder: 'rgba(125,211,252,.28)',
      ghostColor: '#e0f7ff',
      ghostHoverBackground: 'rgba(14,165,233,.16)',
      ghostHoverBorder: 'rgba(125,211,252,.46)',
      padding: '24px 28px 22px',
      shadow: '0 18px 44px rgba(12,19,43,.18)',
    };
  }

  if (variant === 'event') {
    return {
      background:
        'linear-gradient(90deg, rgba(2,12,24,.58) 0%, rgba(3,20,38,.28) 52%, rgba(3,20,38,.05) 100%), radial-gradient(circle at 86% 18%, rgba(125,211,252,.32), transparent 28%), radial-gradient(circle at 62% 88%, rgba(167,139,250,.24), transparent 30%), linear-gradient(135deg, #102047 0%, #155e75 54%, #0f2f54 100%)',
      borderColor: 'rgba(255,255,255,.18)',
      ctaBackground: 'linear-gradient(135deg, #2563eb, #22d3ee)',
      ctaHoverBackground: 'linear-gradient(135deg, #1d4ed8, #38bdf8)',
      ctaShadow: '0 10px 24px rgba(37,99,235,.2)',
      dotColor: '#60a5fa',
      ghostBackground: 'rgba(7,29,48,.68)',
      ghostBorder: 'rgba(125,211,252,.26)',
      ghostColor: '#e0f7ff',
      ghostHoverBackground: 'rgba(14,165,233,.16)',
      ghostHoverBorder: 'rgba(125,211,252,.46)',
      padding: '26px 30px 24px',
      shadow: '0 18px 44px rgba(12,19,43,.16)',
    };
  }

  if (variant === 'security') {
    return {
      background:
        'linear-gradient(90deg, rgba(2,12,24,.58) 0%, rgba(3,20,38,.28) 52%, rgba(3,20,38,.05) 100%), radial-gradient(circle at 88% 18%, rgba(52,211,153,.3), transparent 30%), radial-gradient(circle at 64% 88%, rgba(14,165,233,.22), transparent 30%), linear-gradient(135deg, #06231f 0%, #0f3f3e 52%, #09233d 100%)',
      borderColor: 'rgba(255,255,255,.18)',
      ctaBackground: 'linear-gradient(135deg, #059669, #22d3ee)',
      ctaHoverBackground: 'linear-gradient(135deg, #047857, #38bdf8)',
      ctaShadow: '0 10px 24px rgba(5,150,105,.2)',
      dotColor: '#34d399',
      ghostBackground: 'rgba(7,29,48,.68)',
      ghostBorder: 'rgba(125,211,252,.26)',
      ghostColor: '#e0f7ff',
      ghostHoverBackground: 'rgba(14,165,233,.16)',
      ghostHoverBorder: 'rgba(125,211,252,.46)',
      padding: '26px 30px 24px',
      shadow: '0 18px 44px rgba(12,19,43,.16)',
    };
  }

  return {
    background:
      'radial-gradient(circle at top right, rgba(180,14,77,.08), transparent 34%), linear-gradient(90deg, #f7eff3 0%, #eef3f8 58%, #ece6f4 100%)',
    borderColor: 'rgba(214,216,219,.75)',
    ctaBackground: workspaceTokens.colors.brand,
    ctaHoverBackground: workspaceTokens.colors.brandHover,
    ctaShadow: '0 8px 20px rgba(180,14,77,.18)',
    dotColor: workspaceTokens.colors.brand,
    ghostBackground: 'rgba(255,255,255,.62)',
    ghostBorder: 'rgba(214,216,219,.95)',
    ghostColor: workspaceTokens.colors.textPrimary,
    ghostHoverBackground: '#fff',
    ghostHoverBorder: 'rgba(180,14,77,.18)',
    padding: '30px 32px 24px',
    shadow: 'none',
  };
}
