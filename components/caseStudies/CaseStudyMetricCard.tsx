import { CSSProperties } from 'react';

import { CaseStudyOutcome } from '@/models/caseStudies/CaseStudy';
import { cn } from '@/utils/styles';

interface Props {
  outcome: CaseStudyOutcome;
  className?: string;
  style?: CSSProperties;
}

export default function CaseStudyMetricCard({
  outcome,
  className,
  style
}: Props) {
  return (
    <div
      className={cn(
        'bg-surface/90 backdrop-blur border border-border rounded-lg px-4 py-3',
        className
      )}
      style={style}
    >
      <p className="text-[10px] font-mono text-muted uppercase tracking-wider">
        {outcome.metric}
      </p>
      <p className="text-lg font-bold text-primary font-display">
        {outcome.value}
      </p>
    </div>
  );
}
