'use client';

import { useCallback, useEffect, useRef } from 'react';
import { type Mesh } from 'three';

import { MESH_NETWORK_SPHERE } from '@/constants/particles/mesh';
import { Skill } from '@/models/skills/Skill';
import useMeshHoverStore from '@/stores/particles/mesh/meshHoverStore';
import useSkillInteractionStore from '@/stores/particles/mesh/skillInteractionStore';

interface Props {
  nodeIndex: number;
  onClick?: (skill: Skill) => void;
  onHover?: (skill: Skill) => void;
  onRef: (mesh: Mesh | null) => void;
  skill: Skill;
  totalNodes: number;
}

export default function MeshSkillNode({
  nodeIndex,
  onClick,
  onHover,
  onRef,
  skill,
  totalNodes
}: Props) {
  const { selectAndZoomToSkill, isZoomed } = useSkillInteractionStore();
  const { hoveredNodeId, setHoveredNode } = useMeshHoverStore();

  const meshRef = useRef<Mesh>(null!);
  const isHovered = hoveredNodeId === skill.name;
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const renderGeometry = () => {
    const geometry = MESH_NETWORK_SPHERE.clone();
    if (nodeIndex % 3 === 0) {
      geometry.scale(skill.size * 0.5, skill.size * 0.5, skill.size * 0.5);
    } else if (nodeIndex % 3 === 1) {
      geometry.scale(skill.size * 0.4, skill.size * 0.4, skill.size * 0.4);
    } else {
      geometry.scale(skill.size * 0.6, skill.size * 0.6, skill.size * 0.6);
    }
    return <primitive object={geometry} />;
  };

  // Set initial position
  useEffect(() => {
    const angle = (nodeIndex / totalNodes) * Math.PI * 2;
    const radius = 10;

    const initialX = Math.cos(angle) * radius + (Math.random() - 0.5) * 4;
    const initialY = Math.sin(nodeIndex * 0.7) * 6 + (Math.random() - 0.5) * 3;
    const initialZ = Math.sin(angle) * radius + (Math.random() - 0.5) * 4;

    meshRef.current.position.set(initialX, initialY, initialZ);
  }, [nodeIndex, totalNodes]);

  // Update outside ref pattern
  useEffect(() => {
    if (meshRef.current) {
      onRef(meshRef.current);
    }

    return () => {
      onRef(null);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [onRef]);

  const handlePointerEnter = useCallback(() => {
    if (!!onHover) onHover(skill);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredNode(skill.name);
    }, 100);
  }, [onHover, skill, setHoveredNode]);

  const handlePointerLeave = useCallback(() => {
    if (!!onHover) onHover(skill);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredNode(null);
    }, 150);
  }, [onHover, skill, setHoveredNode]);

  const handlePointerDown = useCallback(() => {
    if (!!onClick) onClick(skill);

    selectAndZoomToSkill(skill, meshRef.current.position);
  }, [onClick, skill, selectAndZoomToSkill]);

  // Add hover effect - scale up slightly when hovered
  useEffect(() => {
    const hoverScale = isHovered || isZoomed ? 1.2 : 1.0;
    if (meshRef.current) {
      meshRef.current.scale.setScalar(hoverScale);
    }
  }, [isHovered, isZoomed]);

  return (
    <mesh
      ref={meshRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      userData={{ skillName: skill.name }}
      castShadow
      receiveShadow
      visible
    >
      {renderGeometry()}
      <meshBasicMaterial
        color={skill.color}
        transparent
        opacity={isHovered ? 1.0 : 0.9}
      />
    </mesh>
  );
}
