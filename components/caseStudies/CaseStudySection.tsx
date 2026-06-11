'use client';

import { useGSAP } from '@gsap/react';
import { useCallback, useEffect, useRef } from 'react';

import Container from '@/components/layouts/Container';
import { SECTION_IDS } from '@/constants/sections';
import { useCaseStudyScroll } from '@/hooks/caseStudies/useCaseStudyScroll';
import { useIsDesktop } from '@/hooks/scroll/useIsDesktop';
import { CaseStudy } from '@/models/caseStudies/CaseStudy';
import useCaseStudyStore from '@/stores/caseStudies/caseStudyStore';
import { ScrollSmoother, ScrollTrigger } from '@/utils/gsap';
import { cn } from '@/utils/styles';

import CaseStudyMobile from './CaseStudyMobile';
import CaseStudyStage from './CaseStudyStage';

interface Props {
  caseStudies: CaseStudy[];
}

const SCROLL_DISTANCE_PER_STUDY = 2500; // px of scroll per case study

export default function CaseStudySection({ caseStudies }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const { masterProgress, setMasterProgress } = useCaseStudyStore();
  const isDesktop = useIsDesktop();
  const totalScrollDistance = caseStudies.length * SCROLL_DISTANCE_PER_STUDY;

  // Set up the pinned ScrollTrigger (desktop only — mobile is a normal flow)
  useGSAP(() => {
    if (!isDesktop || typeof window === 'undefined' || !containerRef.current)
      return;

    triggerRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: `+=${totalScrollDistance}`,
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        setMasterProgress(self.progress);
      }
    });

    return () => {
      triggerRef.current = null;
    };
  }, [totalScrollDistance, setMasterProgress, isDesktop]);

  // Content mounts a cycle after the viewport is known, shifting everything
  // below it — re-measure the page's other ScrollTriggers once that happens
  useEffect(() => {
    if (isDesktop === null) return;
    ScrollTrigger.refresh();
  }, [isDesktop]);

  const { activeCaseStudyIndex, phaseProgress, diagramProgress, isTransitioning, transitionProgress } =
    useCaseStudyScroll(masterProgress, caseStudies.length);

  const activeCaseStudy = caseStudies[activeCaseStudyIndex];
  const nextCaseStudy = caseStudies[activeCaseStudyIndex + 1];

  // Jump past the pinned section, straight to the philosophy section
  const handleSkip = useCallback(() => {
    const smoother = ScrollSmoother.get();
    const philosophy = document.getElementById(SECTION_IDS.philosophy);
    if (!philosophy) return;

    if (smoother) {
      smoother.scrollTo(philosophy, true);
    } else {
      philosophy.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Jump to the start of a specific case study within the pinned scroll
  const handleDotClick = useCallback((index: number) => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const target = trigger.start + index * SCROLL_DISTANCE_PER_STUDY + 1;
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(target, true);
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  }, []);

  // Until the viewport is known, render nothing — avoids building the pinned
  // ScrollTrigger layout on a phone (or vice versa) and tearing it down a frame later
  if (isDesktop === null) return null;

  if (!isDesktop) {
    return (
      <div className="bg-background py-16">
        <Container>
          <h2 className="text-5xl font-black mb-12">Case Studies</h2>
          <div className="space-y-20">
            {caseStudies.map((caseStudy) => (
              <CaseStudyMobile key={caseStudy.slug} caseStudy={caseStudy} />
            ))}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen -ml-[calc((100vw-100%)/2)] overflow-hidden bg-background"
    >
      <h2 className="sr-only">Case Studies</h2>

      {/* Top bar: progress dots */}
      <div className="absolute top-6 left-0 right-0 flex items-center justify-center z-20 px-6">
        <div className="flex items-center gap-3">
          {caseStudies.map((cs, i) => (
            <button
              key={cs.slug}
              onClick={() => handleDotClick(i)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300 cursor-none',
                i === activeCaseStudyIndex
                  ? 'bg-primary w-6'
                  : i < activeCaseStudyIndex
                    ? 'bg-primary/50'
                    : 'bg-border'
              )}
              aria-label={`Go to case study ${i + 1}: ${cs.title}`}
              aria-current={i === activeCaseStudyIndex}
            />
          ))}
        </div>

      </div>

      {/* Skip button — bottom right */}
      <button
        onClick={handleSkip}
        className="absolute bottom-6 right-6 text-xs font-mono text-muted hover:text-primary transition-colors cursor-none flex items-center gap-1.5 z-20"
        aria-label="Skip case studies"
      >
        Skip
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="opacity-60"
        >
          <path
            d="M2 2L10 6L2 10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Active case study */}
      {activeCaseStudy && (
        <CaseStudyStage
          key={activeCaseStudy.slug}
          caseStudy={activeCaseStudy}
          phaseProgress={phaseProgress}
          diagramProgress={diagramProgress}
          stageOpacity={isTransitioning ? 1 - transitionProgress : 1}
        />
      )}

      {/* Next case study fading in during transition */}
      {isTransitioning && nextCaseStudy && (
        <CaseStudyStage
          key={nextCaseStudy.slug}
          caseStudy={nextCaseStudy}
          phaseProgress={0}
          diagramProgress={0}
          stageOpacity={transitionProgress}
        />
      )}

      {/* Scroll hint at bottom */}
      <div
        className={cn(
          'absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono text-muted transition-opacity duration-500 z-20',
          masterProgress < 0.02 ? 'opacity-100' : 'opacity-0'
        )}
      >
        Scroll to explore
      </div>
    </div>
  );
}
