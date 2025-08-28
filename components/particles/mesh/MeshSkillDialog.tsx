'use client';

import SkillDialog from '@/components/skills/SkillDialog';
import useSkillInteractionStore from '@/stores/particles/mesh/skillInteractionStore';
import { cn } from '@/utils/styles';

interface Props {
  className?: string;
}

/**
 * A dialog that shows the currently selected skill.
 * Needed to keep state out of the MeshParticles component to avoid re-renders of the animation
 */
export default function MeshSkillDialog(props: Props) {
  const { className } = props;

  const { selectedSkill } = useSkillInteractionStore();

  return (
    <SkillDialog
      skill={selectedSkill}
      open={!!selectedSkill}
      className={cn(
        'absolute top-16 lg:top-1/6 left-0 lg:left-1/12 px-4 lg:mx-0 z-60',
        className
      )}
      aria-labelledby="skill-dialog-title"
      aria-describedby="skill-dialog-content"
      role="dialog"
      aria-modal="false"
    />
  );
}
