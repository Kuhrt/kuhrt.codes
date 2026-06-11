'use client';

import { CaseStudyOutcome } from '@/models/caseStudies/CaseStudy';
import { cn } from '@/utils/styles';

import CaseStudyMetricCard from './CaseStudyMetricCard';
import SectionLabel from './SectionLabel';

interface Props {
  outcomes: CaseStudyOutcome[];
  visible: boolean; // true when phase >= 3
  progress: number; // 0-1 for stagger animation
}

export default function CaseStudyMetrics({
  outcomes,
  visible,
  progress
}: Props) {
  return (
    <div
      className={cn(
        'absolute bottom-8 left-12 transition-all duration-700 z-10',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'
      )}
    >
      <SectionLabel className="mb-3">The Outcome</SectionLabel>
      <div className="grid grid-cols-2 gap-3 max-w-md">
        {outcomes.map((outcome, i) => {
          const staggerDelay = i * 0.15;
          const itemVisible = visible && progress > staggerDelay;

          return (
            <CaseStudyMetricCard
              key={outcome.metric}
              outcome={outcome}
              className={cn(
                'transition-all duration-500',
                itemVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              )}
              style={{
                transitionDelay: `${staggerDelay * 300}ms`
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
