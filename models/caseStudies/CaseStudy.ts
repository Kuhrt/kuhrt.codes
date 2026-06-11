export type ArchitectureNodeType =
  | 'service'
  | 'database'
  | 'frontend'
  | 'api'
  | 'queue'
  | 'cache'
  | 'external';

export interface ArchitectureNodePosition {
  x: number;
  y: number;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  type: ArchitectureNodeType;
  position: ArchitectureNodePosition;
  positionAfter?: ArchitectureNodePosition;
  addedInAfter?: boolean;
  removedInAfter?: boolean;
  color?: string;
}

export interface ArchitectureConnection {
  from: string;
  to: string;
  label?: string;
  animated?: boolean;
  addedInAfter?: boolean;
  removedInAfter?: boolean;
}

export interface Architecture {
  nodes: ArchitectureNode[];
  connections: ArchitectureConnection[];
}

export interface CaseStudyOutcome {
  metric: string;
  value: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  problem: string;
  constraints: string[];
  approach: string;
  outcomes: CaseStudyOutcome[];
  retrospective: string;
  architecture: {
    before: Architecture;
    after: Architecture;
  };
  tags: string[];
}
