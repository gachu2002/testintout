import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { SectionStatusBadge } from '@/components/reference-status';
import { SmartLink } from '@/components/SmartLink';
import { focusVisibleStyles, Panel } from '@/components/workspace';
import { launchpadSectionStatus } from '@/features/launchpad/sectionStatus';
import type { Article, ArticleTab } from '@/features/launchpad/types';
import { formatLaunchpadDate } from '@/features/launchpad/utils/referenceFormatters';
import { getArticleGradient } from '@/features/launchpad/utils/visuals';

import { ListSkeleton, PanelMoreLink } from './LaunchpadPrimitives';

const ArticlesPanelRoot = styled(Panel)({
  alignSelf: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const HeaderRow = styled(Stack)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
}));

const SectionLabel = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  color: theme.palette.text.disabled,
  flexDirection: 'row',
  fontSize: 11,
  fontWeight: 700,
  gap: theme.spacing(0.75),
  letterSpacing: '.8px',
  textTransform: 'uppercase',
}));

const TabList = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
}));

const ArticleTabButton = styled('button')(({ theme }) => ({
  backgroundColor: 'rgba(255,255,255,.82)',
  border: `1px solid ${theme.workspace.colors.border}`,
  borderRadius: theme.workspace.radii.pill,
  color: theme.palette.text.secondary,
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: 11,
  fontWeight: 700,
  height: 28,
  padding: theme.spacing(0, 1.5),
  transition: theme.transitions.create(['background-color', 'border-color', 'color'], {
    duration: theme.transitions.duration.shortest,
  }),
  '&[data-active="true"]': {
    backgroundColor: theme.workspace.colors.brandBackground,
    borderColor: 'rgba(180,14,77,.2)',
    color: theme.palette.primary.main,
  },
  ...focusVisibleStyles(theme),
}));

const ArticleList = styled(Stack)({
  flex: 1,
});

const ArticleRowLink = styled(SmartLink)(({ theme }) => ({
  alignItems: 'flex-start',
  borderBottom: `1px solid ${theme.workspace.colors.border}`,
  borderRadius: theme.workspace.radii.sm,
  color: theme.palette.text.primary,
  display: 'flex',
  flex: '0 0 78px',
  gap: theme.spacing(1.5),
  height: 78,
  padding: '9px 6px',
  textDecoration: 'none',
  transition: theme.transitions.create('background-color', {
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': { backgroundColor: theme.palette.background.default },
}));

const ArticleThumb = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'articleGradient',
})<{ articleGradient: string }>(({ articleGradient }) => ({
  alignItems: 'center',
  background: articleGradient,
  borderRadius: 7,
  color: '#fff',
  display: 'flex',
  flexShrink: 0,
  height: 42,
  justifyContent: 'center',
  width: 58,
}));

const ArticleTitle = styled(Typography)({
  display: '-webkit-box',
  fontSize: 12,
  fontWeight: 600,
  lineHeight: 1.45,
  marginBottom: 4,
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
});

const ArticleMeta = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  color: theme.palette.text.disabled,
  flexDirection: 'row',
  fontSize: 10,
  gap: theme.spacing(0.625),
}));

const ArticleTag = styled('span', {
  shouldForwardProp: (prop) => !['tagBackground', 'tagColor'].includes(String(prop)),
})<{ tagBackground: string; tagColor: string }>(({ tagBackground, tagColor, theme }) => ({
  backgroundColor: tagBackground,
  borderRadius: theme.workspace.radii.sm / 2,
  color: tagColor,
  fontSize: 10,
  fontWeight: 600,
  padding: '1px 6px',
}));

export function ArticlesPanel({
  activeTab,
  articles,
  isLoading,
  onTabChange,
  tabs,
}: {
  activeTab: string;
  articles: Article[];
  isLoading: boolean;
  onTabChange: (value: string) => void;
  tabs: ArticleTab[];
}) {
  const resolvedTabs = tabs.length ? tabs : [{ id: 'all', label: 'All' }];

  return (
    <ArticlesPanelRoot>
      <HeaderRow
        alignItems="flex-start"
        direction="row"
        flexWrap="wrap"
        justifyContent="space-between"
        spacing={1.5}
      >
        <SectionLabel>
          <Box sx={{ display: 'inline-flex', flexShrink: 0 }}>
            <ArticleRoundedIcon sx={{ fontSize: 14 }} />
          </Box>
          <Box component="span" sx={{ lineHeight: 1 }}>
            아티클
          </Box>
          <SectionStatusBadge status={launchpadSectionStatus.articles} />
          <PanelMoreLink href="/docs/articles" label="더보기" />
        </SectionLabel>
        <TabList aria-label="Article categories" role="group">
          {resolvedTabs.map((tab) => {
            const isActive = tab.id === activeTab;

            return (
              <ArticleTabButton
                aria-pressed={isActive}
                data-active={isActive ? 'true' : undefined}
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                type="button"
              >
                {tab.label}
              </ArticleTabButton>
            );
          })}
        </TabList>
      </HeaderRow>

      {isLoading ? <ListSkeleton count={4} /> : null}
      {!isLoading && articles.length === 0 ? (
        <Typography color="text.secondary" fontSize={13}>
          No articles are available.
        </Typography>
      ) : null}
      {!isLoading ? (
        <ArticleList>
          {articles.map((article) => (
            <ArticleRow article={article} key={article.id} />
          ))}
        </ArticleList>
      ) : null}
    </ArticlesPanelRoot>
  );
}

function ArticleRow({ article }: { article: Article }) {
  const tagTone = getArticleTagTone(article.category);

  return (
    <ArticleRowLink href={article.href}>
      <ArticleThumb articleGradient={getArticleGradient(article.category)}>
        <ArticleRoundedIcon sx={{ fontSize: 18 }} />
      </ArticleThumb>
      <Box minWidth={0}>
        <ArticleTitle>{article.title}</ArticleTitle>
        <ArticleMeta>
          <ArticleTag tagBackground={tagTone.background} tagColor={tagTone.color}>
            {article.categoryLabel}
          </ArticleTag>
          <Box component="span">{formatLaunchpadDate(article.publishedAt)}</Box>
        </ArticleMeta>
      </Box>
    </ArticleRowLink>
  );
}

function getArticleTagTone(category: string) {
  if (category === 'development') return { background: '#e0edff', color: '#3157b7' };
  if (category === 'security') return { background: '#fee2e2', color: '#b91c1c' };

  return { background: '#f3f4f6', color: '#475569' };
}
