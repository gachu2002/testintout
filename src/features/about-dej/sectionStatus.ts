import type { SectionStatusInfo } from '@/components/reference-status';

const verifyAboutDej = 'Run /ref-verify "About DEJ" for Playwright reference comparison.';

export const aboutDejSectionStatus = {
  continueCta: {
    evidence: 'Static route links are implemented from the reference links with no API dependency.',
    fieldsUsed: ['static link labels', 'static link destinations', 'static call-to-action copy'],
    id: 'about-dej-continue-cta',
    nextAction: verifyAboutDej,
    page: 'About DEJ',
    progress: 'implemented',
    readiness: 'Static-only',
    reference: 'about_dej.html',
    section: 'Continue CTA',
  },
  coreIdeas: {
    evidence: 'Static concept cards are implemented from the visible reference content.',
    fieldsUsed: ['static concept labels', 'static concept descriptions', 'static value summary'],
    id: 'about-dej-core-ideas',
    nextAction: verifyAboutDej,
    page: 'About DEJ',
    progress: 'implemented',
    readiness: 'Static-only',
    reference: 'about_dej.html',
    section: 'Core ideas',
  },
  pipeline: {
    evidence:
      'Static CEJ to DEJ pipeline cards are implemented from the visible reference content.',
    fieldsUsed: ['static step labels', 'static step titles', 'static step descriptions'],
    id: 'about-dej-pipeline',
    nextAction: verifyAboutDej,
    page: 'About DEJ',
    progress: 'implemented',
    readiness: 'Static-only',
    reference: 'about_dej.html',
    section: 'Pipeline',
  },
  staticHero: {
    evidence:
      'Static hero, anchor actions, and CEJ/DEJ visual labels are implemented with no API dependency.',
    fieldsUsed: ['static hero title', 'static hero description', 'static visual labels'],
    id: 'about-dej-static-hero',
    nextAction: verifyAboutDej,
    page: 'About DEJ',
    progress: 'implemented',
    readiness: 'Static-only',
    reference: 'about_dej.html',
    section: 'Static hero',
  },
  timeline: {
    evidence: 'Static narrative entries are implemented from the visible reference content.',
    fieldsUsed: ['static stage labels', 'static narrative titles', 'static narrative descriptions'],
    id: 'about-dej-timeline',
    nextAction: verifyAboutDej,
    page: 'About DEJ',
    progress: 'implemented',
    readiness: 'Static-only',
    reference: 'about_dej.html',
    section: 'Timeline',
  },
} satisfies Record<string, SectionStatusInfo>;
