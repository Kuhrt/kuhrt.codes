import { DialogHTMLAttributes, useEffect, useRef, useState } from 'react';

import { Skill, skillColorVariables } from '@/models/skills/Skill';
import { cn } from '@/utils/styles';

import { Card, CardContent, CardTitle } from '../ui/Card';
import SkillProgressBar from './SkillProgressBar';

interface Props extends DialogHTMLAttributes<HTMLDialogElement> {
  skill: Skill | null;
}

const SKILL_LEVEL_MAX = 10;

export default function SkillDialog(props: Props) {
  const { className, open, skill, ...restProps } = props;
  const colorVariable = !!skill
    ? skillColorVariables.get(skill.color)
    : '--primary';

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isAnimating, setIsAnimating] = useState(!!open);

  const get8BitLevel = (level: number) => {
    const clampedLevel = Math.max(0, Math.min(level, SKILL_LEVEL_MAX));
    return Math.round((clampedLevel / SKILL_LEVEL_MAX) * 255);
  };

  const getBinaryRating = (level: number) => {
    const scaled = get8BitLevel(level);
    return scaled.toString(2).padStart(8, '0');
  };

  useEffect(() => {
    if (open && skill) {
      dialogRef.current?.show();

      requestAnimationFrame(() => setIsAnimating(true));
    } else if (!open) {
      setIsAnimating(false);
      // If delay is updated, update the duration in the dialog's className
      const timeout = setTimeout(() => dialogRef.current?.close(), 800);
      return () => clearTimeout(timeout);
    }
  }, [open, skill]);

  return (
    <dialog
      className={cn(
        'bg-transparent max-w-xl w-full',
        `transition-all duration-800`,
        'transform-gpu',
        isAnimating
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 -translate-x-1/2',
        className
      )}
      ref={dialogRef}
      {...restProps}
    >
      <Card className="shadow-card min-h-72">
        <CardTitle
          className={`text-[var(${colorVariable})]`}
          id="skill-dialog-title"
        >
          {skill?.name ?? ' '}
        </CardTitle>
        <CardContent id="skill-dialog-content" className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs lg:text-sm text-primary">Binary Rating</p>
              <p className="text-xs lg:text-sm text-muted font-mono">
                {getBinaryRating(skill?.level ?? 0)}
              </p>
            </div>
            <SkillProgressBar level={skill?.level ?? 0} max={SKILL_LEVEL_MAX} />
            <p className="text-xs text-muted font-mono text-center">
              8-bit representation &middot; {get8BitLevel(skill?.level ?? 0)}
              /255
            </p>
          </div>
          <div>
            <h4 className="text-base text-foreground mb-1">Experience</h4>
            <p className="text-xs lg:text-sm text-muted">
              {skill?.summary ?? ' '}
            </p>
          </div>
        </CardContent>
      </Card>
    </dialog>
  );
}
