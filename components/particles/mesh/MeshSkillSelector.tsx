'use client';

import { Vector3 } from 'three';

import MagneticButton from '@/components/ui/buttons/MagneticButton';
import { skills } from '@/content/skills';
import { Skill, skillColorVariables } from '@/models/skills/Skill';
import useSkillInteractionStore from '@/stores/particles/mesh/skillInteractionStore';
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

  const getSkillColorVariable = (skill: Skill) =>
    skillColorVariables.get(skill.color) ?? '--primary';

  const getSkillClassNames = (skill: Skill) => {
    const colorVariable = getSkillColorVariable(skill);
    return `border-[var(${colorVariable})]! text-[var(${colorVariable})]! hover:text-background! [&.magnetic-btn--active]:text-background! before:bg-[var(${colorVariable})]!`;
  };

  const clickHandler = (newSkill: Skill) => {
    if (!!onClick) onClick(newSkill);

    if (skillNodePositions) {
      const nodePosition = skillNodePositions.get(newSkill.name);
      if (nodePosition) {
        selectAndZoomToSkill(newSkill, nodePosition);
      }
    }
  };

  return (
    <div
      className={cn(
        'flex flex-wrap lg:flex-nowrap lg:flex-col items-center lg:items-end justify-center gap-0 lg:gap-4',
        className
      )}
    >
      {skills.map((skill) => (
        <MagneticButton
          key={`mesh-selector-btn-${skill.name}`}
          onClick={() => clickHandler(skill)}
          className={`${getSkillClassNames(skill)} ${
            selectedSkill?.name === skill.name ? 'magnetic-btn--active' : ''
          }`}
        >
          {skill.name}
        </MagneticButton>
      ))}
    </div>
  );
}
