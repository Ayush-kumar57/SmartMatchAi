export type ActiveScreen = 'public-platform' | 'job-seeker-feed' | 'recruiter-portal' | 'admin-console';

export type UserRole = 'recruiter-admin' | 'job-seeker' | 'system-admin';

export interface SemanticCluster {
  name: string;
  percentage: number;
  color?: 'secondary' | 'primary' | 'tertiary';
}

export interface JobMatch {
  id: string;
  title: string;
  company: string;
  department: string;
  location: string;
  avatarLetter: string;
  avatarLetterColor: string;
  score: number;
  matchTier: 'Deep Match' | 'High Semantic' | 'Target Range' | 'Moderate Fit';
  skillVector: number;
  experienceMatch: number;
  domainAlignment: number;
  highAffinityTokens: string[];
  exactTokenCount: number;
  resumeGap?: {
    skill: string;
    boost: string;
  };
  compensation: string;
  equity: string;
  postedAgo: string;
  companyImage: string;
  rationale: string;
  cosineDistance: number;
  vectorSkills: {
    name: string;
    proximity: number;
    isGap?: boolean;
  }[];
  totalRewards: string;
  equityType: string;
  teamTopology: string;
  reportingTo: string;
  bookmarked?: boolean;
}

export interface CandidateProfile {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  matchScore: number;
  badgeLabel: string;
  badgeType: 'emerald' | 'indigo' | 'amber';
  companyPast: string;
  currentRole: string;
  education: string;
  keyInsight: string;
  insightHighlight?: string;
  semanticPills: string[];
  nlpVectorOverlaps: number;
  researchAlign: number;
  codeVector: number;
  publicationRel: number;
  noticePeriod: string;
  targetComp: string;
  notes?: string;
  shortlisted?: boolean;
  systemDesign?: number;
  nlpTooling?: number;
  alignmentExp?: number;
  embeddingSpec?: number;
  attentionTuning?: number;
  clusterSharding?: number;
  pytorchCore?: number;
  pureNlpTheory?: number;
  yearsExp: number;
}

export interface QueryLogItem {
  id: string;
  timestamp: string;
  source: string;
  status: 'SUCCESS • RE-RANKED' | 'VECTOR DIRECT' | 'FALLBACK BERT-V4' | 'CROSS-ENCODER LIVE';
  statusType: 'success' | 'direct' | 'fallback';
  query: string;
  cosineTheta: number;
  rankInfo: string;
  matchesCount: number;
  matchesEntity: 'Candidates' | 'Jobs';
  latencyMs: number;
}

export interface SemanticTraitWeight {
  id: string;
  label: string;
  weight: number;
  category: 'core' | 'infra' | 'modeling' | 'alignment';
}
