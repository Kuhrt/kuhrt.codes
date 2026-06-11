import { useMemo } from 'react';

const PHASES_PER_STUDY = 5;
const TRANSITION_RATIO = 0.15; // 15% of a study's scroll for transitions

interface CaseStudyScrollState {
  activeCaseStudyIndex: number;
  phaseProgress: number; // 0 to PHASES_PER_STUDY (continuous)
  diagramProgress: number; // 0 to 1 for before→after
  isTransitioning: boolean;
  transitionProgress: number; // 0 to 1 during transitions
}

export function useCaseStudyScroll(
  masterProgress: number,
  totalCaseStudies: number
): CaseStudyScrollState {
  return useMemo(() => {
    if (totalCaseStudies === 0) {
      return {
        activeCaseStudyIndex: 0,
        phaseProgress: 0,
        diagramProgress: 0,
        isTransitioning: false,
        transitionProgress: 0
      };
    }

    // Each case study gets an equal slice of the master progress
    const sliceSize = 1 / totalCaseStudies;
    const rawIndex = masterProgress / sliceSize;
    const activeCaseStudyIndex = Math.min(
      Math.floor(rawIndex),
      totalCaseStudies - 1
    );

    // Progress within the current case study (0 to 1)
    const localProgress =
      (masterProgress - activeCaseStudyIndex * sliceSize) / sliceSize;

    // Check if we're in a transition zone (last 15% of a study)
    const transitionStart = 1 - TRANSITION_RATIO;
    const isTransitioning =
      localProgress > transitionStart &&
      activeCaseStudyIndex < totalCaseStudies - 1;
    const transitionProgress = isTransitioning
      ? (localProgress - transitionStart) / TRANSITION_RATIO
      : 0;

    // Phase progress: 0 to 5 across the non-transition portion
    const contentProgress = Math.min(localProgress / transitionStart, 1);
    const phaseProgress = contentProgress * PHASES_PER_STUDY;

    // Diagram progress: maps phases 1-3 (before → approach → after)
    // Phase 0-1: diagram not yet visible (0)
    // Phase 1-2: before state (0)
    // Phase 2-3: morphing to after (0→1)
    // Phase 3+: after state (1)
    let diagramProgress = 0;
    if (phaseProgress >= 3) {
      diagramProgress = 1;
    } else if (phaseProgress >= 2) {
      diagramProgress = phaseProgress - 2;
    }

    return {
      activeCaseStudyIndex,
      phaseProgress,
      diagramProgress,
      isTransitioning,
      transitionProgress
    };
  }, [masterProgress, totalCaseStudies]);
}
