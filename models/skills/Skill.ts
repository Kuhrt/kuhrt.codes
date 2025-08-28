export interface Skill {
  name: string;
  color: string;
  level: number;
  size: number;
  summary?: string;
}

export const skillColorVariables = new Map<string, string>([
  ['#3178c6', '--skill-typescript'],
  ['#61dafb', '--skill-react'],
  ['#339933', '--skill-nodejs'],
  ['#4fc08d', '--skill-vue'],
  ['#3776ab', '--skill-python'],
  ['#512bd4', '--skill-dotnet'],
  ['#00ff88', '--skill-devops'],
  ['#00ccff', '--skill-sql']
]);
