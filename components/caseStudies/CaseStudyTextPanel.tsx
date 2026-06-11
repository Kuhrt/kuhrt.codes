'use client';

import { CaseStudy } from '@/models/caseStudies/CaseStudy';
import { cn } from '@/utils/styles';

import CaseStudyTags from './CaseStudyTags';
import ConstraintList from './ConstraintList';
import SectionLabel from './SectionLabel';

interface Props {
  caseStudy: CaseStudy;
  phaseProgress: number; // 0-5
}

export default function CaseStudyTextPanel({
  caseStudy,
  phaseProgress
}: Props) {
  const titleCompact = phaseProgress >= 0.5;
  const titleVisible = phaseProgress >= 0;

  // Only one content block visible at a time
  const problemVisible = phaseProgress >= 0.3 && phaseProgress < 2.0;
  const approachVisible = phaseProgress >= 2.0 && phaseProgress < 3.5;
  const retrospectiveVisible = phaseProgress >= 4.0;

  return (
    <div className="absolute inset-0 flex items-center justify-center px-12 overflow-hidden">
      <div className="w-full max-w-lg">
        {/* Title */}
        <div
          className={cn(
            'transition-all duration-700',
            titleVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          )}
        >
          <CaseStudyTags tags={caseStudy.tags} />
          <h3
            className={cn(
              'font-black font-display text-foreground leading-tight transition-all duration-700',
              titleCompact ? 'text-2xl' : 'text-5xl'
            )}
          >
            {caseStudy.title}
          </h3>
          <p
            className={cn(
              'text-muted mt-1 transition-all duration-500',
              titleCompact ? 'text-sm opacity-70' : 'text-base opacity-100'
            )}
          >
            {caseStudy.subtitle}
          </p>
        </div>

        {/* Content — stacked in the same spot, only one visible at a time */}
        <div className="relative mt-6 min-h-48">
          <div
            className={cn(
              'absolute inset-x-0 top-0 transition-all duration-700',
              problemVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6 pointer-events-none'
            )}
          >
            <SectionLabel>The Problem</SectionLabel>
            <p className="text-sm text-muted leading-relaxed">
              {caseStudy.problem}
            </p>
            <ConstraintList constraints={caseStudy.constraints} />
          </div>

          <div
            className={cn(
              'absolute inset-x-0 top-0 transition-all duration-700',
              approachVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6 pointer-events-none'
            )}
          >
            <SectionLabel>The Approach</SectionLabel>
            <p className="text-sm text-muted leading-relaxed">
              {caseStudy.approach}
            </p>
          </div>

          <div
            className={cn(
              'absolute inset-x-0 top-0 transition-all duration-700',
              retrospectiveVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6 pointer-events-none'
            )}
          >
            <SectionLabel>What I&apos;d Do Differently</SectionLabel>
            <p className="text-sm text-muted leading-relaxed italic border-l-2 border-primary pl-4">
              {caseStudy.retrospective}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
