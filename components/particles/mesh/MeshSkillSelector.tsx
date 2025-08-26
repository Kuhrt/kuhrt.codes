'use client';

import { Vector3 } from 'three';

import { CURSOR_DATA_HOVER } from '@/constants/cursor';
import { skills } from '@/content/skills';
import { Skill } from '@/models/skills/Skill';
import useSkillInteractionStore from '@/stores/particles-mesh/skillInteractionStore';
import { cn } from '@/utils/styles';

interface Props {
  className?: string;
  onClick?: (skill: Skill) => void;
  skillNodePositions?: Map<string, Vector3>;
}

export default function MeshSkillSelector({
  className,
  onClick,
  skillNodePositions
}: Props) {
  const { selectedSkill, selectAndZoomToSkill } = useSkillInteractionStore();

  const clickHandler = (newSkill: Skill) => {
    if (!!onClick) onClick(newSkill);

    if (skillNodePositions) {
      const nodePosition = skillNodePositions.get(newSkill.name);
      if (nodePosition) {
        // Use unified store method - handles all logic in one place
        selectAndZoomToSkill(newSkill, nodePosition);
      }
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col items-end justify-center gap-4 lg:gap-8',
        className
      )}
    >
      {skills.map((skill) => (
        <button
          key={`mesh-selector-btn-${skill.name}`}
          type="button"
          data-hover={CURSOR_DATA_HOVER}
          onClick={() => clickHandler(skill)}
          className={selectedSkill?.name === skill.name ? 'text-primary' : ''}
        >
          {skill.name}
        </button>
      ))}
    </div>
  );
}
