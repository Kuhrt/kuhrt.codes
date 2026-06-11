'use client';

import { CaseStudy } from '@/models/caseStudies/CaseStudy';
import { cn } from '@/utils/styles';

import ArchitectureDiagram from './architecture/ArchitectureDiagram';
import CaseStudyMetrics from './CaseStudyMetrics';
import CaseStudyTextPanel from './CaseStudyTextPanel';

interface Props {
  caseStudy: CaseStudy;
  phaseProgress: number; // 0-5
  diagramProgress: number; // 0-1
  stageOpacity: number; // for enter/exit transitions
}

export default function CaseStudyStage({
  caseStudy,
  phaseProgress,
  diagramProgress,
  stageOpacity
}: Props) {
  // Diagram is visible from phase 1 onward
  const diagramVisible = phaseProgress >= 1;
  // Metrics visible in phase 3-4
  const metricsVisible = phaseProgress >= 3 && phaseProgress < 4.5;
  const metricsProgress = metricsVisible
    ? Math.min((phaseProgress - 3) / 0.5, 1)
    : 0;

  return (
    <div
      className={cn('absolute inset-0 flex transition-opacity duration-500')}
      style={{ opacity: stageOpacity }}
    >
      {/* Left: text content */}
      <div className="relative w-[35%] h-full shrink-0">
        <CaseStudyTextPanel
          caseStudy={caseStudy}
          phaseProgress={phaseProgress}
        />
        <CaseStudyMetrics
          outcomes={caseStudy.outcomes}
          visible={metricsVisible}
          progress={metricsProgress}
        />
      </div>

      {/* Right: architecture diagram */}
      <div
        className={cn(
          'relative flex-1 transition-opacity duration-700',
          diagramVisible ? 'opacity-100' : 'opacity-0'
        )}
      >
        <ArchitectureDiagram
          architecture={caseStudy.architecture}
          diagramProgress={diagramProgress}
          visible={diagramVisible}
          className="w-full h-full"
        />

        {/* Before/After label */}
        <div className="absolute top-4 right-4 flex items-center gap-2 text-xs font-mono text-muted z-10">
          <span
            className={cn(
              'transition-opacity duration-300',
              diagramProgress < 0.5 ? 'text-primary' : 'text-muted'
            )}
          >
            BEFORE
          </span>
          <div className="w-16 h-0.5 bg-border relative rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-primary transition-all duration-300 rounded-full"
              style={{ width: `${diagramProgress * 100}%` }}
            />
          </div>
          <span
            className={cn(
              'transition-opacity duration-300',
              diagramProgress >= 1 ? 'text-primary' : 'text-muted'
            )}
          >
            AFTER
          </span>
        </div>
      </div>
    </div>
  );
}
