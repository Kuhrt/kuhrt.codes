'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh, Vector3 } from 'three';

import { skills } from '@/content/skills';
import useAnimationStore from '@/stores/particles-mesh/animationStore';
import useSkillInteractionStore from '@/stores/particles-mesh/skillInteractionStore';

interface Props {
  nodeRefs: React.MutableRefObject<(Mesh | undefined)[]>;
  skillNodePositions: React.MutableRefObject<Map<string, Vector3>>;
}

export default function NodeAnimationController({
  nodeRefs,
  skillNodePositions
}: Props) {
  const { isAnimating, isPaused } = useAnimationStore();
  const { isZoomed } = useSkillInteractionStore();

  // Store animation state for each node
  const nodeStates = useRef<
    Map<
      number,
      {
        floatOffset: number;
        velocity: Vector3;
        lastPosition: Vector3;
      }
    >
  >(new Map());

  // Initialize node states
  useFrame(() => {
    nodeRefs.current.forEach((node, index) => {
      if (node && !nodeStates.current.has(index)) {
        nodeStates.current.set(index, {
          floatOffset: index * 0.5,
          velocity: new Vector3(
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.008,
            (Math.random() - 0.5) * 0.01
          ),
          lastPosition: node.position.clone()
        });
      }
    });
  });

  useFrame((state, delta) => {
    const shouldAnimate = isAnimating && !isPaused && !isZoomed;

    nodeRefs.current.forEach((node, index) => {
      if (!node) return;

      const nodeState = nodeStates.current.get(index);
      if (!nodeState) return;

      // Always keep rotating
      node.rotation.x += 0.005 * delta * 60;
      node.rotation.y += 0.003 * delta * 60;

      // Apply individual node animations based on type
      if (shouldAnimate) {
        if (index < skills.length) {
          // Skill nodes - floating motion
          const floatY =
            Math.sin(state.clock.elapsedTime * 0.7 + nodeState.floatOffset) *
            1.5;
          const floatX =
            Math.cos(state.clock.elapsedTime * 0.5 + nodeState.floatOffset) *
            0.8;

          node.position.x += floatX * 0.005;
          node.position.y += floatY * 0.005;
          node.position.z +=
            Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.005;

          // Update position map for skill nodes - use skills array directly
          const skill = skills[index];
          if (skill) {
            skillNodePositions.current.set(skill.name, node.position.clone());
          }
        } else {
          // Regular nodes - drift motion
          node.position.add(nodeState.velocity);

          // Boundary bouncing
          if (Math.abs(node.position.x) > 20) {
            nodeState.velocity.x *= -0.8;
            node.position.x = Math.sign(node.position.x) * 20;
          }
          if (Math.abs(node.position.y) > 15) {
            nodeState.velocity.y *= -0.8;
            node.position.y = Math.sign(node.position.y) * 15;
          }
          if (Math.abs(node.position.z) > 20) {
            nodeState.velocity.z *= -0.8;
            node.position.z = Math.sign(node.position.z) * 20;
          }

          // Add slight random movement
          const randomForce = 0.0002;
          nodeState.velocity.add(
            new Vector3(
              (Math.random() - 0.5) * randomForce,
              (Math.random() - 0.5) * randomForce,
              (Math.random() - 0.5) * randomForce
            )
          );

          // Apply gentle friction
          nodeState.velocity.multiplyScalar(0.995);
        }
      }

      // Store last position for smooth resuming
      nodeState.lastPosition.copy(node.position);
    });
  });

  return null;
}
