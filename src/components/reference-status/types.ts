export type SectionProgress =
  | 'not-assessed'
  | 'planned'
  | 'in-progress'
  | 'implemented'
  | 'verified'
  | 'blocked';

export type SectionReadiness = 'Already implemented' | 'Blocked' | 'Ready' | 'Static-only';

export type ApiContractStatus =
  | 'accepted'
  | 'deferred'
  | 'fixture-backed'
  | 'missing'
  | 'none'
  | 'overlay-only';

export type SectionApiUsage = {
  contract?: ApiContractStatus;
  method: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT' | 'WS';
  path: string;
};

export type SectionStatusInfo = {
  apis?: SectionApiUsage[];
  blockers?: string[];
  evidence?: string;
  fieldsUsed?: string[];
  id: string;
  nextAction?: string;
  page: string;
  progress: SectionProgress;
  readiness?: SectionReadiness;
  reference: string;
  section: string;
};
