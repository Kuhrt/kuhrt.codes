export interface CapabilityExample {
  title: string;
  detail: string;
}

export interface CapabilityRelationship {
  target: string;
  strength: number; // 0-1, used for connection opacity
}

export interface Capability {
  name: string;
  color: string;
  tagline: string;
  description: string;
  offer: string; // buyer-facing hook: what hiring this capability gets you
  examples: CapabilityExample[];
  relationships: CapabilityRelationship[];
}

export const capabilityColorVariables = new Map<string, string>([
  ['#3b82f6', '--capability-system-design'],
  ['#61dafb', '--capability-frontend'],
  ['#00ff88', '--capability-devops'],
  ['#f59e0b', '--capability-data'],
  ['#a855f7', '--capability-leadership'],
  ['#ec4899', '--capability-ai']
]);
