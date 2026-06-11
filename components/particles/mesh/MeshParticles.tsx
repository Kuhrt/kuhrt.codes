'use client';

import { useCallback, useEffect, useRef } from 'react';
import { Group, Mesh, Vector2, Vector3 } from 'three';

import { capabilities } from '@/content/capabilities';
import { threeSectionMouseMove } from '@/utils/three';

import RandomBlob from '../../ui/RandomBlob';
import AnimationControllersWrapper from '../AnimationControllersWrapper';
import ParticleScene from '../ParticleScene';
import MeshCapabilityDialog from './MeshCapabilityDialog';
import MeshCapabilityNode from './MeshCapabilityNode';
import MeshCapabilitySelector from './MeshCapabilitySelector';
import MeshConnections from './MeshConnections';
import MeshNode from './MeshNode';

export const MESH_NODE_COUNT = 40;

export default function MeshParticles() {
  const nodeGroupRef = useRef<Group>(null!);
  const connectionsGroupRef = useRef<{ updateConnections: () => void } | null>(
    null
  );
  const nodeRefs = useRef<(Mesh | undefined)[]>([]);
  const capabilityNodePositions = useRef<Map<string, Vector3>>(new Map());

  const setCapabilityNodeRef = useCallback(
    (index: number, mesh: Mesh | null) => {
      if (mesh) {
        nodeRefs.current[index] = mesh;
        const capability = capabilities[index];
        if (capability) {
          const position = mesh.position.clone();
          capabilityNodePositions.current.set(capability.name, position);
        }
      } else {
        nodeRefs.current[index] = undefined;
        const capability = capabilities[index];
        if (capability) {
          capabilityNodePositions.current.delete(capability.name);
        }
      }
    },
    []
  );

  const setNodeRef = useCallback((index: number, mesh: Mesh | null) => {
    const adjustedIndex = index + capabilities.length;
    if (mesh) {
      nodeRefs.current[adjustedIndex] = mesh;
    } else {
      nodeRefs.current[adjustedIndex] = undefined;
    }
  }, []);

  useEffect(() => {
    const mousePosition = new Vector2();

    const handleMouseMove = (event: MouseEvent) => {
      threeSectionMouseMove(event, mousePosition);
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-full">
      <MeshCapabilityDialog />

      <MeshCapabilitySelector
        className="absolute bottom-4 lg:bottom-auto lg:top-1/2 right-4 lg:right-8 lg:-translate-y-1/2 z-60 transition-all"
        capabilityNodePositions={capabilityNodePositions}
      />

      <ParticleScene cameraPosition={new Vector3(0, 0, 30)}>
        <group ref={nodeGroupRef}>
          {capabilities.map((capability, index) => (
            <MeshCapabilityNode
              key={`capability-node-${index}`}
              nodeIndex={index}
              capability={capability}
              totalNodes={capabilities.length}
              onRef={(mesh) => setCapabilityNodeRef(index, mesh)}
            />
          ))}

          {Array.from({ length: MESH_NODE_COUNT }).map((_, index) => (
            <MeshNode
              key={`node-${index}`}
              nodeIndex={index}
              onRef={(mesh) => setNodeRef(index, mesh)}
            />
          ))}

          <MeshConnections nodeRefs={nodeRefs} ref={connectionsGroupRef} />
        </group>

        <AnimationControllersWrapper
          nodeRefs={nodeRefs}
          capabilityNodePositions={capabilityNodePositions}
          connectionsGroupRef={connectionsGroupRef}
        />
      </ParticleScene>
      <div
        aria-hidden="true"
        className="absolute flex items-center justify-end inset-x-0 top-1/6 right-1/12 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <RandomBlob
          className="relative aspect-1155/678 w-150 bg-linear-to-tr from-secondary to-primary opacity-20 will-change-transform"
          centerX={50}
          centerY={50}
          radius={30}
          pointCount={10}
          radiusVariation={15}
          positionVariation={8}
          data-lag="0.1"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-1/6 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <RandomBlob
          className="relative left-0 aspect-1155/678 w-285 rotate-30 bg-linear-to-tr from-secondary to-secondary opacity-12 will-change-transform"
          centerX={50}
          centerY={50}
          radiusY={27}
          radiusX={60}
          pointCount={15}
          radiusVariation={15}
          positionVariation={8}
          data-lag="1"
        />
      </div>
    </div>
  );
}
