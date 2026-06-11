'use client';

import { useCallback, useEffect, useRef } from 'react';
import { type Mesh } from 'three';

import { MESH_NETWORK_SPHERE } from '@/constants/particles/mesh';
import { Capability } from '@/models/capabilities/Capability';
import useCapabilityInteractionStore from '@/stores/particles/mesh/capabilityInteractionStore';
import useMeshHoverStore from '@/stores/particles/mesh/meshHoverStore';
import { tagCapabilityClick } from '@/utils/tagManager';

interface Props {
  nodeIndex: number;
  onClick?: (capability: Capability) => void;
  onHover?: (capability: Capability) => void;
  onRef: (mesh: Mesh | null) => void;
  capability: Capability;
  totalNodes: number;
}

const CAPABILITY_NODE_SIZE = 1.8;

export default function MeshCapabilityNode({
  nodeIndex,
  onClick,
  onHover,
  onRef,
  capability,
  totalNodes
}: Props) {
  const { selectAndZoomToCapability, isZoomed } =
    useCapabilityInteractionStore();
  const { hoveredNodeId, setHoveredNode } = useMeshHoverStore();

  const meshRef = useRef<Mesh>(null!);
  const isHovered = hoveredNodeId === capability.name;
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const renderGeometry = () => {
    const geometry = MESH_NETWORK_SPHERE.clone();
    const scale = CAPABILITY_NODE_SIZE * 0.5;
    geometry.scale(scale, scale, scale);
    return <primitive object={geometry} />;
  };

  useEffect(() => {
    const angle = (nodeIndex / totalNodes) * Math.PI * 2;
    const radius = 10;

    const initialX = Math.cos(angle) * radius + (Math.random() - 0.5) * 4;
    const initialY = Math.sin(nodeIndex * 0.7) * 6 + (Math.random() - 0.5) * 3;
    const initialZ = Math.sin(angle) * radius + (Math.random() - 0.5) * 4;

    meshRef.current.position.set(initialX, initialY, initialZ);
  }, [nodeIndex, totalNodes]);

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
    if (onHover) onHover(capability);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredNode(capability.name);
    }, 100);
  }, [onHover, capability, setHoveredNode]);

  const handlePointerLeave = useCallback(() => {
    if (onHover) onHover(capability);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredNode(null);
    }, 150);
  }, [onHover, capability, setHoveredNode]);

  const handlePointerDown = useCallback(() => {
    if (onClick) onClick(capability);
    tagCapabilityClick(capability.name);

    selectAndZoomToCapability(capability, meshRef.current.position);
  }, [onClick, capability, selectAndZoomToCapability]);

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
      userData={{ capabilityName: capability.name }}
      castShadow
      receiveShadow
      visible
    >
      {renderGeometry()}
      <meshBasicMaterial
        color={capability.color}
        transparent
        opacity={isHovered ? 1.0 : 0.9}
      />
    </mesh>
  );
}
