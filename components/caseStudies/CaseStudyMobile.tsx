'use client';

import { useEffect, useRef, useState } from 'react';

import { CURSOR_DATA_HOVER } from '@/constants/cursor';
import { CaseStudy } from '@/models/caseStudies/CaseStudy';
import { gsap } from '@/utils/gsap';
import { cn } from '@/utils/styles';

import ArchitectureDiagram from './architecture/ArchitectureDiagram';
import CaseStudyMetricCard from './CaseStudyMetricCard';
import CaseStudyTags from './CaseStudyTags';
import ConstraintList from './ConstraintList';
import SectionLabel from './SectionLabel';

interface Props {
  caseStudy: CaseStudy;
}

const TOGGLE_DURATION_SECONDS = 0.8;

/**
 * Stacked, tap-driven case study for small screens. Replaces the pinned
 * scroll-scrubbed stage, which doesn't have room to breathe below lg.
 */
export default function CaseStudyMobile({ caseStudy }: Props) {
  const [showAfter, setShowAfter] = useState(false);
  const [diagramProgress, setDiagramProgress] = useState(0);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const progressRef = useRef({ value: 0 });

  useEffect(() => {
    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  const toggleDiagram = (after: boolean) => {
    if (after === showAfter) return;
    setShowAfter(after);

    tweenRef.current?.kill();
    tweenRef.current = gsap.to(progressRef.current, {
      value: after ? 1 : 0,
      duration: TOGGLE_DURATION_SECONDS,
      ease: 'power2.inOut',
      onUpdate: () => setDiagramProgress(progressRef.current.value)
    });
  };

  const toggleButtonClasses = (active: boolean) =>
    cn(
      'px-2.5 py-1 rounded font-mono text-xs transition-colors cursor-none',
      active ? 'bg-primary text-background font-bold' : 'text-muted'
    );

  return (
    <article className="space-y-8">
      <header>
        <CaseStudyTags tags={caseStudy.tags} />
        <h3 className="font-black font-display text-foreground leading-tight text-3xl">
          {caseStudy.title}
        </h3>
        <p className="text-muted mt-2 text-sm">{caseStudy.subtitle}</p>
      </header>

      <div>
        <SectionLabel>The Problem</SectionLabel>
        <p className="text-sm text-muted leading-relaxed">
          {caseStudy.problem}
        </p>
        <ConstraintList constraints={caseStudy.constraints} />
      </div>

      <div>
        <SectionLabel>The Approach</SectionLabel>
        <p className="text-sm text-muted leading-relaxed">
          {caseStudy.approach}
        </p>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <SectionLabel className="mb-0">Architecture</SectionLabel>
          <div
            className="flex items-center gap-1"
            role="group"
            aria-label="Toggle architecture state"
          >
            <button
              onClick={() => toggleDiagram(false)}
              className={toggleButtonClasses(!showAfter)}
              data-hover={CURSOR_DATA_HOVER}
              aria-pressed={!showAfter}
            >
              BEFORE
            </button>
            <button
              onClick={() => toggleDiagram(true)}
              className={toggleButtonClasses(showAfter)}
              data-hover={CURSOR_DATA_HOVER}
              aria-pressed={showAfter}
            >
              AFTER
            </button>
          </div>
        </div>
        <div
          className="overflow-x-auto"
          tabIndex={0}
          role="region"
          aria-label={`${caseStudy.title} architecture diagram, scrolls sideways`}
        >
          {/* Fixed-width inner canvas keeps node labels readable; the strip scrolls sideways */}
          <div className="w-256 h-96">
            <ArchitectureDiagram
              architecture={caseStudy.architecture}
              diagramProgress={diagramProgress}
              visible
              fitViewPadding={0.1}
              className="w-full h-full"
            />
          </div>
        </div>
        <p className="px-4 py-2 text-[10px] font-mono text-muted border-t border-border">
          Swipe sideways to explore the diagram
        </p>
      </div>

      <div>
        <SectionLabel>The Outcome</SectionLabel>
        <div className="grid grid-cols-2 gap-3">
          {caseStudy.outcomes.map((outcome) => (
            <CaseStudyMetricCard key={outcome.metric} outcome={outcome} />
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>What I&apos;d Do Differently</SectionLabel>
        <p className="text-sm text-muted leading-relaxed italic border-l-2 border-primary pl-4">
          {caseStudy.retrospective}
        </p>
      </div>
    </article>
  );
}
