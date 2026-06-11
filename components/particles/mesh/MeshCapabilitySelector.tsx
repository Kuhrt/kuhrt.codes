'use client';

import { RefObject } from 'react';
import { Vector3 } from 'three';

import MagneticButton from '@/components/ui/buttons/MagneticButton';
import { capabilities } from '@/content/capabilities';
import {
  Capability,
  capabilityColorVariables
} from '@/models/capabilities/Capability';
import useCapabilityInteractionStore from '@/stores/particles/mesh/capabilityInteractionStore';
import { cn } from '@/utils/styles';
import { tagCapabilityClick } from '@/utils/tagManager';

interface Props {
  className?: string;
  onClick?: (capability: Capability) => void;
  // Passed as a ref — node positions mutate as the mesh animates,
  // and refs must not be read during render
  capabilityNodePositions?: RefObject<Map<string, Vector3>>;
}

export default function MeshCapabilitySelector({
  className,
  onClick,
  capabilityNodePositions
}: Props) {
  const { selectedCapability, selectAndZoomToCapability } =
    useCapabilityInteractionStore();

  const getColorVariable = (capability: Capability) =>
    capabilityColorVariables.get(capability.color) ?? '--primary';

  const getClassNames = (capability: Capability) => {
    const colorVariable = getColorVariable(capability);
    return `border-[var(${colorVariable})]! text-[var(${colorVariable})]! hover:text-background! [&.magnetic-btn--active]:text-background! before:bg-[var(${colorVariable})]!`;
  };

  const clickHandler = (newCapability: Capability) => {
    if (onClick) onClick(newCapability);
    tagCapabilityClick(newCapability.name);

    const nodePosition = capabilityNodePositions?.current.get(
      newCapability.name
    );
    if (nodePosition) {
      selectAndZoomToCapability(newCapability, nodePosition);
    }
  };

  return (
    <div
      className={cn(
        'flex flex-wrap lg:flex-nowrap lg:flex-col items-center lg:items-end justify-center gap-0 lg:gap-4',
        className
      )}
    >
      {capabilities.map((capability) => (
        <MagneticButton
          key={`mesh-selector-btn-${capability.name}`}
          onClick={() => clickHandler(capability)}
          className={`${getClassNames(capability)} ${
            selectedCapability?.name === capability.name
              ? 'magnetic-btn--active'
              : ''
          }`}
        >
          {capability.name}
        </MagneticButton>
      ))}
    </div>
  );
}
