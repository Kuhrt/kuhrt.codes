'use client';

import CapabilityDialog from '@/components/capabilities/CapabilityDialog';
import useCapabilityInteractionStore from '@/stores/particles/mesh/capabilityInteractionStore';
import { cn } from '@/utils/styles';

interface Props {
  className?: string;
}

/**
 * A dialog that shows the currently selected capability.
 * Kept separate from MeshParticles to avoid re-renders of the animation.
 */
export default function MeshCapabilityDialog(props: Props) {
  const { className } = props;

  const { selectedCapability } = useCapabilityInteractionStore();

  return (
    <CapabilityDialog
      capability={selectedCapability}
      open={!!selectedCapability}
      className={cn(
        'absolute top-16 lg:top-1/6 left-0 lg:left-1/12 px-4 lg:mx-0 z-60',
        className
      )}
      aria-labelledby="capability-dialog-title"
      aria-describedby="capability-dialog-content"
      role="dialog"
      aria-modal="false"
    />
  );
}
