import { RefObject } from 'react';
import { Mesh, Vector3 } from 'three';

import { useCamera } from '@/contexts/ParticleCameraContext';

import NodeAnimationController from './mesh/NodeAnimationController';
import UnifiedAnimationController from './mesh/UnifiedAnimationController';

export default function AnimationControllersWrapper({
  nodeRefs,
  capabilityNodePositions,
  connectionsGroupRef
}: {
  nodeRefs: RefObject<(Mesh | undefined)[]>;
  capabilityNodePositions: RefObject<Map<string, Vector3>>;
  connectionsGroupRef: RefObject<{
    updateConnections: () => void;
  } | null>;
}) {
  const camera = useCamera();

  return (
    <>
      <UnifiedAnimationController
        camera={camera}
        connectionsGroupRef={connectionsGroupRef}
      />
      <NodeAnimationController
        nodeRefs={nodeRefs}
        capabilityNodePositions={capabilityNodePositions}
      />
    </>
  );
}
