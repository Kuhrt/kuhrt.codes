'use client';

import { useCallback, useEffect, useRef } from 'react';
import { Group, Mesh, Vector2, Vector3 } from 'three';

import { skills } from '@/content/skills';
import { threeSectionMouseMove } from '@/utils/three';

import ParticleScene, { useCamera } from '../ParticleScene';
import MeshConnections from './MeshConnections';
import MeshNode from './MeshNode';
import MeshSkillNode from './MeshSkillNode';
import MeshSkillSelector from './MeshSkillSelector';
import NodeAnimationController from './NodeAnimationController';
import UnifiedAnimationController from './UnifiedAnimationController';

export const MESH_NODE_COUNT = 40;

export default function MeshParticles() {
  const nodeGroupRef = useRef<Group>(null!);
  const connectionsGroupRef = useRef<{ updateConnections: () => void } | null>(
    null
  );
  const nodeRefs = useRef<(Mesh | undefined)[]>([]);
  const skillNodePositions = useRef<Map<string, Vector3>>(new Map());

  const setSkillNodeRef = useCallback((index: number, mesh: Mesh | null) => {
    if (mesh) {
      nodeRefs.current[index] = mesh;
      // Store the skill name and position for the selector to use
      const skill = skills[index];
      if (skill) {
        // Ensure we have the current position
        const position = mesh.position.clone();
        skillNodePositions.current.set(skill.name, position);
      }
    } else {
      nodeRefs.current[index] = undefined;
      const skill = skills[index];
      if (skill) {
        skillNodePositions.current.delete(skill.name);
      }
    }
  }, []);

  const setNodeRef = useCallback((index: number, mesh: Mesh | null) => {
    const adjustedIndex = index + skills.length; // Offset to store after skill nodes
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
    <>
      <MeshSkillSelector
        className="absolute bottom-4 lg:bottom-auto lg:top-1/2 right-4 lg:right-8 lg:-translate-y-1/2 z-[60] transition-all"
        skillNodePositions={skillNodePositions.current}
      />

      <ParticleScene cameraPosition={new Vector3(0, 0, 30)}>
        <group ref={nodeGroupRef}>
          {skills.map((skill, index) => (
            <MeshSkillNode
              key={`skill-node-${index}`}
              nodeIndex={index}
              skill={skill}
              totalNodes={skills.length}
              onRef={(mesh) => setSkillNodeRef(index, mesh)}
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

        {/* Animation controllers wrapper - uses camera context */}
        <AnimationControllersWrapper
          nodeRefs={nodeRefs}
          skillNodePositions={skillNodePositions}
          connectionsGroupRef={connectionsGroupRef}
        />
      </ParticleScene>
    </>
  );
}

// Wrapper component that uses camera context and renders animation controllers
function AnimationControllersWrapper({
  nodeRefs,
  skillNodePositions,
  connectionsGroupRef
}: {
  nodeRefs: React.MutableRefObject<(Mesh | undefined)[]>;
  skillNodePositions: React.MutableRefObject<Map<string, Vector3>>;
  connectionsGroupRef: React.MutableRefObject<{
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
        skillNodePositions={skillNodePositions}
      />
    </>
  );
}
