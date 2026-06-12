import type { SvgIconComponent } from '@mui/icons-material';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import DataObjectRoundedIcon from '@mui/icons-material/DataObjectRounded';
import DiamondRoundedIcon from '@mui/icons-material/DiamondRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { SectionStatusBadge } from '@/components/reference-status';
import { SmartLink } from '@/components/SmartLink';
import { routes } from '@/config/routes';
import { aboutDejSectionStatus } from '@/features/about-dej/sectionStatus';

type PipelineStep = {
  desc: string;
  icon: SvgIconComponent;
  iconClass?: 'green' | 'orange' | 'purple';
  sub: string;
  title: string;
};

type NarrativeEntry = {
  desc: string;
  label: string;
  title: string;
};

const pipelineSteps: PipelineStep[] = [
  {
    desc: '고객 접점, 업무 맥락, 서비스 사용 흐름에서 경험 신호를 발견합니다.',
    icon: GroupsRoundedIcon,
    sub: 'CEJ',
    title: 'Customer Experience Journey',
  },
  {
    desc: 'Connectivity, Customization, Care, Servitization, Sustainability 관점으로 신호를 분류합니다.',
    icon: DataObjectRoundedIcon,
    iconClass: 'green',
    sub: '3C 2S',
    title: '고객경험 영역 데이터',
  },
  {
    desc: '발견된 고객 신호를 개발자가 이해하고 설계하고 구현할 수 있는 작업 흐름으로 바꿉니다.',
    icon: CodeRoundedIcon,
    sub: 'DEJ',
    title: 'Development Experience Journey',
  },
  {
    desc: 'App Gallery, AI Gallery, 프로젝트 허브와 연결해 필요한 도구를 바로 선택하게 합니다.',
    icon: WidgetsRoundedIcon,
    iconClass: 'purple',
    sub: 'AX Studio',
    title: 'Apps · AI · Projects',
  },
  {
    desc: '빠른 의사결정과 품질무결성을 바탕으로 필요한 순간에 필요한 기능을 제공합니다.',
    icon: RocketLaunchRoundedIcon,
    iconClass: 'orange',
    sub: 'Core Value',
    title: '제때개발과 품질 개선',
  },
];

const narrativeEntries: NarrativeEntry[] = [
  {
    desc: '고객 접점과 서비스 사용 흐름을 관찰하고, 3C 2S 고객경험 영역의 데이터로 개선 신호를 찾는 관점에서 시작했습니다.',
    label: 'CEJ',
    title: '고객경험 여정에서 출발',
  },
  {
    desc: 'Development Experience Journey라는 이름 아래 CEJ와 DEJ를 인피니티 루프로 연결하고, Connectivity부터 Core Value까지 핵심 키워드를 소개했습니다.',
    label: 'Portal',
    title: 'DEJ Portal 인트로로 철학을 시각화',
  },
  {
    desc: '별도 포털의 설명 페이지가 아니라 App Gallery, AI Gallery, 프로젝트 허브, 챗봇으로 바로 이어지는 업무 진입점으로 전환합니다.',
    label: 'AX',
    title: 'AX Studio 안의 실행형 경험으로 통합',
  },
  {
    desc: '빠른 의사결정, 품질무결성, 구성원만족도를 함께 높이며 고객 경험 개선 결과가 다시 CEJ 데이터로 돌아오게 합니다.',
    label: 'Value',
    title: '신속한 탐지와 제때개발로 환류',
  },
];

const coreIdeas = [
  {
    desc: '데이터, 도구, 팀, 서비스가 끊기지 않게 연결되는 구조',
    title: 'Connectivity',
  },
  {
    desc: '업무 맥락과 사용자 목적에 맞게 경험을 조정하는 방식',
    title: 'Customization',
  },
  {
    desc: '고객과 구성원이 느끼는 불편을 빠르게 발견하고 돌보는 관점',
    title: 'Care',
  },
  {
    desc: '개발 결과를 기능이 아닌 지속 가능한 서비스 경험으로 연결',
    title: 'Servitization',
  },
  {
    desc: '반복 가능한 개선 체계를 만들어 품질과 운영을 함께 유지',
    title: 'Sustainability',
  },
  {
    desc: '신속한 탐지, 빠른 의사결정, 품질무결성, 제때개발, 구성원만족도',
    title: 'Core Value',
  },
];

const quickLinks = [
  { href: routes.appGallery, label: 'App Gallery' },
  { href: routes.aiGallery, label: 'AI Gallery' },
  { href: routes.projects, label: 'Project / Publish' },
  { href: routes.supportChatbot, label: '지원 챗봇' },
];

export function AboutDejPageContent() {
  return (
    <AboutPage>
      <HeroPanel>
        <HeroCopy>
          <StatusRow>
            <Eyebrow>
              <TimelineRoundedIcon />
              About DEJ
            </Eyebrow>
            <SectionStatusBadge status={aboutDejSectionStatus.staticHero} />
          </StatusRow>
          <HeroTitle variant="h1">Development Experience Journey</HeroTitle>
          <HeroDesc>
            고객중심의 개발 플랫폼 / 고객경험 혁신을 위한 일하는 방식의 변화. DEJ는 CEJ에서 발견한
            3C 2S 고객경험 데이터를 개발자가 바로 실행할 수 있는 과제·도구·프로젝트 흐름으로
            전환하는 AX Studio의 개발 경험 여정입니다.
          </HeroDesc>
          <HeroActions>
            <HeroAction className="primary" href={routes.launchpad}>
              <RocketLaunchRoundedIcon />
              Get Started
            </HeroAction>
            <HeroAction href="#pipeline">
              <AccountTreeRoundedIcon />
              CEJ·DEJ 파이프라인
            </HeroAction>
            <HeroAction href="#history">
              <HistoryRoundedIcon />
              히스토리
            </HeroAction>
          </HeroActions>
        </HeroCopy>

        <JourneyStage aria-label="CEJ DEJ 인피니티 파이프라인">
          <span className="map-side data">3C 2S 고객경험 영역의 데이터</span>
          <span className="map-side value">Core Value</span>
          <span className="map-side connectivity">Connectivity</span>
          <span className="map-side customization">Customization</span>
          <span className="map-side care">Care</span>
          <span className="map-side servitization">Servitization</span>
          <span className="map-side sustainability">Sustainability</span>
          <span className="map-side speed">신속한 탐지</span>
          <span className="map-side decision">빠른의사결정</span>
          <span className="map-side quality">품질무결성</span>
          <span className="map-side just">제때개발</span>
          <span className="map-side member">구성원만족도</span>
          <div aria-hidden="true" className="infinity-map">
            <span className="loop left" />
            <span className="loop right" />
            <span className="loop-knot" />
            <span className="map-label cej">
              <strong>CEJ</strong>
              <span>Customer Experience Journey</span>
            </span>
            <span className="map-label dej">
              <strong>DEJ</strong>
              <span>Development Experience Journey</span>
            </span>
          </div>
        </JourneyStage>
      </HeroPanel>

      <Section id="pipeline">
        <SectionHead>
          <Box>
            <SectionKicker>
              <AccountTreeRoundedIcon />
              Pipeline
              <SectionStatusBadge status={aboutDejSectionStatus.pipeline} />
            </SectionKicker>
            <SectionTitle variant="h2">CEJ 데이터가 DEJ 실행으로 바뀌는 흐름</SectionTitle>
          </Box>
          <SectionDesc>
            포털 인트로의 CEJ·DEJ 인피니티 구조를 서비스 관점으로 다시 풀었습니다. 3C 2S 고객경험
            영역의 데이터가 신속한 탐지, 빠른 의사결정, 품질무결성, 제때개발, 구성원 만족도로
            이어지는 파이프라인입니다.
          </SectionDesc>
        </SectionHead>
        <GlassPanel>
          <PipelineGrid>
            {pipelineSteps.map((step) => {
              const Icon = step.icon;

              return (
                <PipeStep key={step.title}>
                  <PipeIcon className={step.iconClass}>
                    <Icon />
                  </PipeIcon>
                  <Box>
                    <PipeSub>{step.sub}</PipeSub>
                    <PipeTitle>{step.title}</PipeTitle>
                  </Box>
                  <PipeDesc>{step.desc}</PipeDesc>
                </PipeStep>
              );
            })}
          </PipelineGrid>
        </GlassPanel>
      </Section>

      <ContentGrid className="section" id="history">
        <Box>
          <SectionHead className="single">
            <Box>
              <SectionKicker>
                <HistoryRoundedIcon />
                History
                <SectionStatusBadge status={aboutDejSectionStatus.timeline} />
              </SectionKicker>
              <SectionTitle variant="h2">DEJ 콘셉트의 변화</SectionTitle>
            </Box>
          </SectionHead>
          <GlassPanel>
            <NarrativeList>
              {narrativeEntries.map((entry) => (
                <NarrativeItem key={entry.label}>
                  <NarrativeLabel>{entry.label}</NarrativeLabel>
                  <NarrativeCopy>
                    <NarrativeTitle>{entry.title}</NarrativeTitle>
                    <NarrativeDesc>{entry.desc}</NarrativeDesc>
                  </NarrativeCopy>
                </NarrativeItem>
              ))}
            </NarrativeList>
          </GlassPanel>
        </Box>

        <CardStack>
          <InfoCard>
            <CardTitle>
              <DiamondRoundedIcon />
              Core Ideas
              <SectionStatusBadge status={aboutDejSectionStatus.coreIdeas} />
            </CardTitle>
            <CardDesc>
              포털 인트로의 키워드는 3C 2S 데이터와 Core Value 흐름으로 압축해 남깁니다.
            </CardDesc>
            <ValueGrid>
              {coreIdeas.map((idea) => (
                <ValueChip key={idea.title}>
                  <strong>{idea.title}</strong>
                  <span>{idea.desc}</span>
                </ValueChip>
              ))}
            </ValueGrid>
          </InfoCard>

          <InfoCard>
            <CardTitle>
              <OpenInNewRoundedIcon />
              Continue in AX Studio
              <SectionStatusBadge status={aboutDejSectionStatus.continueCta} />
            </CardTitle>
            <CardDesc>
              DEJ는 소개에서 끝나지 않고 AX Studio의 실제 기능으로 이어집니다. 필요한 도구를 고르고,
              AI 도움을 받고, 프로젝트로 실행하세요.
            </CardDesc>
            <LinkList>
              {quickLinks.map((link) => (
                <QuickLink href={link.href} key={link.href}>
                  {link.label}
                  <KeyboardArrowRightRoundedIcon />
                </QuickLink>
              ))}
            </LinkList>
          </InfoCard>
        </CardStack>
      </ContentGrid>
    </AboutPage>
  );
}

const AboutPage = styled(Box)(({ theme }) => ({
  background:
    'radial-gradient(circle at 12% 16%, rgba(56,189,248,.18), transparent 26%), radial-gradient(circle at 84% 20%, rgba(14,165,233,.18), transparent 28%), radial-gradient(circle at 68% 80%, rgba(34,211,238,.12), transparent 28%), linear-gradient(135deg, #020b17 0%, #031426 42%, #04182d 100%)',
  color: '#f8fbff',
  isolation: 'isolate',
  minHeight: '100vh',
  overflow: 'hidden',
  padding: theme.spacing(3.5, 3, 9),
  position: 'relative',
  width: '100%',
  '&::before': {
    background:
      'linear-gradient(28deg, transparent 0 22%, rgba(125,211,252,.13) 22.2%, transparent 22.7% 42%, rgba(125,211,252,.07) 42.2%, transparent 42.7%), linear-gradient(147deg, transparent 0 30%, rgba(255,255,255,.08) 30.2%, transparent 30.7% 58%, rgba(34,211,238,.08) 58.2%, transparent 58.8%), radial-gradient(circle at 5% 28%, rgba(125,211,252,.8) 0 1.4px, transparent 2.8px), radial-gradient(circle at 18% 78%, rgba(255,255,255,.62) 0 1.3px, transparent 2.8px), radial-gradient(circle at 31% 18%, rgba(125,211,252,.62) 0 1.3px, transparent 2.8px), radial-gradient(circle at 47% 62%, rgba(255,255,255,.62) 0 1.4px, transparent 2.8px), radial-gradient(circle at 67% 32%, rgba(125,211,252,.58) 0 1.4px, transparent 2.8px), radial-gradient(circle at 86% 78%, rgba(255,255,255,.5) 0 1.2px, transparent 2.8px)',
    content: '""',
    inset: 0,
    opacity: 0.38,
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: -1,
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2.5, 2, 7),
  },
}));

const HeroPanel = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  background:
    'radial-gradient(circle at 50% 48%, rgba(125,211,252,.14), transparent 36%), radial-gradient(circle at 16% 72%, rgba(34,211,238,.14), transparent 25%), radial-gradient(circle at 82% 30%, rgba(59,130,246,.18), transparent 27%), linear-gradient(135deg, rgba(2,14,28,.96) 0%, rgba(5,43,69,.92) 48%, rgba(4,24,45,.96) 100%)',
  border: '1px solid rgba(255,255,255,.14)',
  borderRadius: 28,
  boxShadow: '0 24px 70px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.08)',
  display: 'grid',
  marginBottom: theme.spacing(2.75),
  minHeight: 520,
  overflow: 'hidden',
  padding: theme.spacing(5.75, 5.5, 5),
  position: 'relative',
  '&::before': {
    background:
      'radial-gradient(circle at 12% 20%, rgba(255,255,255,.52) 0 1.3px, transparent 2.8px), radial-gradient(circle at 26% 63%, rgba(125,211,252,.66) 0 1.5px, transparent 3px), radial-gradient(circle at 44% 18%, rgba(255,255,255,.48) 0 1.2px, transparent 3px), radial-gradient(circle at 63% 70%, rgba(125,211,252,.56) 0 1.3px, transparent 3px), radial-gradient(circle at 82% 22%, rgba(255,255,255,.42) 0 1.2px, transparent 3px), linear-gradient(35deg, transparent 0 25%, rgba(125,211,252,.14) 25.2%, transparent 25.7% 44%, rgba(125,211,252,.08) 44.2%, transparent 44.7%), linear-gradient(145deg, transparent 0 35%, rgba(255,255,255,.1) 35.2%, transparent 35.7% 68%, rgba(34,211,238,.08) 68.2%, transparent 68.8%)',
    content: '""',
    inset: 0,
    opacity: 0.56,
    position: 'absolute',
  },
  [theme.breakpoints.down('md')]: {
    minHeight: 'auto',
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: 20,
    padding: theme.spacing(3.5, 2.5),
  },
}));

const HeroCopy = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: theme.spacing(1.75),
  marginBottom: theme.spacing(3.5),
  position: 'relative',
  textAlign: 'center',
  zIndex: 2,
}));

const StatusRow = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  gap: theme.spacing(0.75),
  justifyContent: 'center',
}));

const Eyebrow = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  background: 'rgba(255,255,255,.11)',
  border: '1px solid rgba(255,255,255,.12)',
  borderRadius: 999,
  color: '#d9f4ff',
  display: 'inline-flex',
  fontSize: 11,
  fontWeight: 800,
  gap: theme.spacing(0.9),
  letterSpacing: '.12em',
  padding: theme.spacing(0.85, 1.4),
  textTransform: 'uppercase',
  '& svg': {
    color: '#7dd3fc',
    fontSize: 15,
  },
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  color: '#f8fbff',
  fontSize: 42,
  fontWeight: 800,
  letterSpacing: '-.055em',
  lineHeight: 1.1,
  maxWidth: 900,
  textShadow: '0 10px 34px rgba(0,0,0,.34)',
  [theme.breakpoints.down('sm')]: {
    fontSize: 30,
  },
}));

const HeroDesc = styled(Typography)(({ theme }) => ({
  color: 'rgba(232,244,255,.74)',
  fontSize: 14,
  lineHeight: 1.75,
  maxWidth: 760,
  [theme.breakpoints.down('sm')]: {
    fontSize: 13,
  },
}));

const HeroActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1.25),
  justifyContent: 'center',
  marginTop: theme.spacing(0.5),
}));

const HeroAction = styled(SmartLink)(({ theme }) => ({
  alignItems: 'center',
  backdropFilter: 'blur(8px)',
  background: 'rgba(255,255,255,.1)',
  border: '1px solid rgba(255,255,255,.16)',
  borderRadius: 12,
  color: '#fff',
  display: 'inline-flex',
  fontSize: 13,
  fontWeight: 800,
  gap: theme.spacing(0.75),
  justifyContent: 'center',
  minHeight: 40,
  padding: theme.spacing(0, 1.9),
  transition: 'all .15s ease',
  '&.primary': {
    background: 'linear-gradient(135deg, #0284c7, #22d3ee)',
    borderColor: 'rgba(125,211,252,.5)',
  },
  '& svg': {
    fontSize: 18,
  },
  '&:hover': {
    boxShadow: '0 14px 28px rgba(0,0,0,.22)',
    transform: 'translateY(-1px)',
  },
  [theme.breakpoints.down('sm')]: {
    flex: 1,
    minWidth: 180,
  },
}));

const JourneyStage = styled(Box)(({ theme }) => ({
  display: 'grid',
  minHeight: 270,
  placeItems: 'center',
  position: 'relative',
  zIndex: 1,
  '.infinity-map': {
    filter: 'drop-shadow(0 0 24px rgba(125,211,252,.18))',
    height: 240,
    opacity: 0.9,
    position: 'relative',
    width: 'min(720px, 78vw)',
  },
  '.loop': {
    border: '24px solid rgba(188,218,232,.28)',
    borderRadius: '50%',
    boxShadow:
      'inset 0 0 0 9px rgba(255,255,255,.08), 0 0 0 1px rgba(255,255,255,.12), 0 0 36px rgba(125,211,252,.16)',
    height: 166,
    position: 'absolute',
    top: 42,
    width: 272,
  },
  '.loop.left': {
    left: 84,
    transform: 'rotate(31deg)',
  },
  '.loop.right': {
    right: 84,
    transform: 'rotate(-31deg)',
  },
  '.loop::before, .loop::after': {
    borderRadius: 6,
    borderRight: '10px solid rgba(218,239,249,.58)',
    borderTop: '10px solid rgba(218,239,249,.58)',
    content: '""',
    height: 28,
    position: 'absolute',
    width: 28,
  },
  '.loop.left::before': { left: 22, top: 26, transform: 'rotate(-12deg)' },
  '.loop.left::after': { bottom: 20, right: 26, transform: 'rotate(162deg)' },
  '.loop.right::before': { bottom: 20, left: 26, transform: 'rotate(-18deg)' },
  '.loop.right::after': { right: 22, top: 26, transform: 'rotate(102deg)' },
  '.loop-knot': {
    border: '20px solid rgba(188,218,232,.24)',
    borderLeftColor: 'rgba(188,218,232,.14)',
    borderRadius: 24,
    borderRightColor: 'rgba(188,218,232,.14)',
    height: 62,
    left: '50%',
    position: 'absolute',
    top: '51%',
    transform: 'translate(-50%, -50%) rotate(-8deg)',
    width: 132,
  },
  '.map-label': {
    display: 'grid',
    gap: 3,
    justifyItems: 'center',
    minWidth: 110,
    position: 'absolute',
    textAlign: 'center',
    textShadow: '0 5px 18px rgba(0,0,0,.42)',
    top: 94,
  },
  '.map-label.cej': { left: 162 },
  '.map-label.dej': { right: 162 },
  '.map-label strong': { fontSize: 28, fontWeight: 500, lineHeight: 1 },
  '.map-label span': {
    color: 'rgba(255,255,255,.72)',
    fontSize: 10,
    lineHeight: 1.14,
    maxWidth: 86,
  },
  '.map-side': {
    alignItems: 'center',
    color: 'rgba(255,255,255,.76)',
    display: 'flex',
    fontSize: 14,
    fontWeight: 600,
    gap: theme.spacing(1.25),
    position: 'absolute',
    textShadow: '0 5px 18px rgba(0,0,0,.35)',
    zIndex: 2,
  },
  '.map-side::before': {
    background: 'rgba(255,255,255,.11)',
    border: '1px solid rgba(255,255,255,.12)',
    borderRadius: '50%',
    boxShadow: 'inset 0 0 0 10px rgba(255,255,255,.08), 0 0 20px rgba(125,211,252,.1)',
    content: '""',
    height: 44,
    width: 44,
  },
  '.map-side.connectivity': { left: '24%', top: '27%' },
  '.map-side.customization': { left: '16%', top: '41%' },
  '.map-side.care': { left: '18%', top: '55%' },
  '.map-side.servitization': { left: '22%', top: '69%' },
  '.map-side.sustainability': { left: '32%', top: '82%' },
  '.map-side.speed': { right: '22%', top: '27%' },
  '.map-side.decision': { right: '13%', top: '41%' },
  '.map-side.quality': { right: '15%', top: '55%' },
  '.map-side.just': { right: '21%', top: '69%' },
  '.map-side.member': { right: '30%', top: '82%' },
  '.map-side.data, .map-side.value': {
    color: 'rgba(255,255,255,.86)',
    display: 'block',
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.35,
    maxWidth: 150,
  },
  '.map-side.data': { left: '4%', top: '56%' },
  '.map-side.value': { right: '3%', top: '56%' },
  '.map-side.data::before, .map-side.value::before': { display: 'none' },
  [theme.breakpoints.down('md')]: {
    minHeight: 260,
    '.map-side': { display: 'none' },
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: 190,
    '.infinity-map': {
      height: 190,
      transform: 'scale(.74)',
      width: '100%',
    },
  },
}));

const Section = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2.75),
}));

const SectionHead = styled(Box)(({ theme }) => ({
  alignItems: 'flex-end',
  display: 'flex',
  gap: theme.spacing(2.5),
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1.75),
  '&.single': {
    alignItems: 'flex-start',
  },
  [theme.breakpoints.down('sm')]: {
    alignItems: 'flex-start',
    display: 'grid',
  },
}));

const SectionKicker = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  color: '#7dd3fc',
  display: 'flex',
  fontSize: 11,
  fontWeight: 800,
  gap: theme.spacing(0.75),
  letterSpacing: '.1em',
  textTransform: 'uppercase',
  '& svg': {
    fontSize: 15,
  },
}));

const SectionTitle = styled(Typography)({
  color: '#f8fbff',
  fontSize: 25,
  fontWeight: 800,
  letterSpacing: '-.045em',
  lineHeight: 1.2,
  marginTop: 8,
});

const SectionDesc = styled(Typography)({
  color: 'rgba(232,244,255,.74)',
  fontSize: 13,
  lineHeight: 1.7,
  maxWidth: 670,
});

const GlassPanel = styled(Box)(({ theme }) => ({
  backdropFilter: 'blur(12px)',
  background: 'linear-gradient(180deg, rgba(255,255,255,.09), rgba(255,255,255,.055))',
  border: '1px solid rgba(255,255,255,.12)',
  borderRadius: 18,
  boxShadow: '0 18px 44px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.08)',
  overflow: 'hidden',
  padding: theme.spacing(3),
}));

const PipelineGrid = styled(Box)(({ theme }) => ({
  alignItems: 'stretch',
  display: 'grid',
  gap: theme.spacing(1.5),
  gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

const PipeStep = styled(Box)(({ theme }) => ({
  alignContent: 'start',
  background: 'rgba(3,20,38,.62)',
  border: '1px solid rgba(255,255,255,.12)',
  borderRadius: 18,
  display: 'grid',
  gap: theme.spacing(1.5),
  minHeight: 164,
  overflow: 'hidden',
  padding: theme.spacing(2.25),
  position: 'relative',
  '&::before': {
    background: 'radial-gradient(circle, rgba(125,211,252,.16), transparent 62%)',
    borderRadius: '50%',
    bottom: -40,
    content: '""',
    height: 100,
    pointerEvents: 'none',
    position: 'absolute',
    right: -20,
    width: 100,
  },
  '&:not(:last-child)::after': {
    alignItems: 'center',
    background: 'rgba(3,20,38,.9)',
    border: '1px solid rgba(125,211,252,.24)',
    borderRadius: 999,
    boxShadow: '0 0 18px rgba(125,211,252,.14)',
    color: '#7dd3fc',
    content: '"›"',
    display: 'flex',
    fontSize: 24,
    height: 32,
    justifyContent: 'center',
    lineHeight: 1,
    position: 'absolute',
    right: -22,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 32,
    zIndex: 2,
  },
  [theme.breakpoints.down('md')]: {
    minHeight: 'auto',
    '&:not(:last-child)::after': {
      bottom: -23,
      right: '50%',
      top: 'auto',
      transform: 'translateX(50%) rotate(90deg)',
    },
  },
}));

const PipeIcon = styled(Box)({
  alignItems: 'center',
  background: 'rgba(255,255,255,.12)',
  border: '1px solid rgba(255,255,255,.12)',
  borderRadius: '50%',
  boxShadow: 'inset 0 0 0 10px rgba(255,255,255,.07)',
  color: '#d9f4ff',
  display: 'flex',
  height: 44,
  justifyContent: 'center',
  position: 'relative',
  width: 44,
  zIndex: 1,
  '&.green': { color: '#d1fae5' },
  '&.purple': { color: '#ede9fe' },
  '&.orange': { color: '#ffedd5' },
  '& svg': {
    fontSize: 21,
  },
});

const PipeSub = styled(Typography)({
  color: '#7dd3fc',
  fontSize: 11,
  fontWeight: 800,
  letterSpacing: '.08em',
  position: 'relative',
  textTransform: 'uppercase',
  zIndex: 1,
});

const PipeTitle = styled(Typography)({
  color: '#fff',
  fontSize: 16,
  fontWeight: 800,
  letterSpacing: '-.03em',
  position: 'relative',
  zIndex: 1,
});

const PipeDesc = styled(Typography)({
  color: 'rgba(232,244,255,.74)',
  fontSize: 12,
  lineHeight: 1.6,
  position: 'relative',
  zIndex: 1,
});

const ContentGrid = styled(Box)(({ theme }) => ({
  alignItems: 'start',
  display: 'grid',
  gap: theme.spacing(2.75),
  gridTemplateColumns: 'minmax(0, 1.1fr) minmax(320px, .9fr)',
  marginTop: theme.spacing(2.75),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

const NarrativeList = styled(Box)({
  display: 'grid',
});

const NarrativeItem = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2.25),
  gridTemplateColumns: '92px minmax(0, 1fr)',
  padding: theme.spacing(0, 0, 2.75),
  position: 'relative',
  '&:last-child': {
    paddingBottom: 0,
  },
  '&:not(:last-child)::before': {
    background: 'linear-gradient(180deg, rgba(125,211,252,.45), rgba(125,211,252,.08))',
    bottom: 0,
    content: '""',
    left: 110,
    position: 'absolute',
    top: 28,
    width: 1,
  },
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1),
    gridTemplateColumns: '1fr',
    '&:not(:last-child)::before': {
      left: 6,
      top: 52,
    },
  },
}));

const NarrativeLabel = styled(Typography)({
  color: '#7dd3fc',
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: '.03em',
});

const NarrativeCopy = styled(Box)({
  paddingLeft: 28,
  position: 'relative',
  '&::before': {
    background: '#031426',
    border: '4px solid #7dd3fc',
    borderRadius: '50%',
    boxShadow: '0 0 0 4px rgba(125,211,252,.12), 0 0 18px rgba(125,211,252,.24)',
    content: '""',
    height: 13,
    left: 0,
    position: 'absolute',
    top: 2,
    width: 13,
  },
});

const NarrativeTitle = styled(Typography)({
  color: '#fff',
  fontSize: 15,
  fontWeight: 800,
  letterSpacing: '-.025em',
});

const NarrativeDesc = styled(Typography)({
  color: 'rgba(232,244,255,.74)',
  fontSize: 13,
  lineHeight: 1.65,
  marginTop: 6,
});

const CardStack = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2.75),
}));

const InfoCard = styled(Box)(({ theme }) => ({
  backdropFilter: 'blur(12px)',
  background: 'linear-gradient(180deg, rgba(255,255,255,.09), rgba(255,255,255,.055))',
  border: '1px solid rgba(255,255,255,.12)',
  borderRadius: 18,
  boxShadow: '0 18px 44px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.08)',
  padding: theme.spacing(2.5),
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  alignItems: 'center',
  color: '#fff',
  display: 'flex',
  fontSize: 16,
  fontWeight: 800,
  gap: theme.spacing(1),
  letterSpacing: '-.03em',
  '& svg': {
    color: '#7dd3fc',
    fontSize: 20,
  },
}));

const CardDesc = styled(Typography)({
  color: 'rgba(232,244,255,.74)',
  fontSize: 13,
  lineHeight: 1.7,
  marginTop: 10,
});

const ValueGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1.25),
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  marginTop: theme.spacing(1.75),
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

const ValueChip = styled(Box)(({ theme }) => ({
  background: 'rgba(3,20,38,.58)',
  border: '1px solid rgba(255,255,255,.12)',
  borderRadius: 14,
  minHeight: 78,
  padding: theme.spacing(1.6),
  '& strong': {
    color: '#fff',
    display: 'block',
    fontSize: 13,
    letterSpacing: '-.02em',
  },
  '& span': {
    color: 'rgba(232,244,255,.74)',
    display: 'block',
    fontSize: 11,
    lineHeight: 1.45,
    marginTop: 5,
  },
}));

const LinkList = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1.25),
  marginTop: theme.spacing(1.75),
}));

const QuickLink = styled(SmartLink)(({ theme }) => ({
  alignItems: 'center',
  background: 'rgba(3,20,38,.58)',
  border: '1px solid rgba(255,255,255,.12)',
  borderRadius: 14,
  color: '#fff',
  display: 'flex',
  fontSize: 13,
  fontWeight: 800,
  gap: theme.spacing(1.25),
  justifyContent: 'space-between',
  padding: theme.spacing(1.6, 1.75),
  transition: 'all .15s ease',
  '& svg': {
    color: '#7dd3fc',
    fontSize: 18,
  },
  '&:hover': {
    background: 'rgba(255,255,255,.08)',
    boxShadow: '0 14px 28px rgba(0,0,0,.16)',
    color: '#7dd3fc',
  },
}));
