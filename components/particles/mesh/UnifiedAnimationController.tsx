'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { PerspectiveCamera } from 'three';

import useAnimationStore from '@/stores/particles-mesh/animationStore';
import useHoverStore from '@/stores/particles-mesh/hoverStore';
import useSkillInteractionStore from '@/stores/particles-mesh/skillInteractionStore';

interface Props {
  camera: PerspectiveCamera;
  connectionsGroupRef: React.MutableRefObject<{
    updateConnections: () => void;
  } | null>;
}

export default function UnifiedAnimationController({
  camera,
  connectionsGroupRef
}: Props) {
  const { isAnimating, isPaused } = useAnimationStore();
  const { isZoomed, zoomTarget, zoomLookAt } = useSkillInteractionStore();
  const { hoveredNodeId } = useHoverStore();

  const timeRef = useRef(0);
  const isInitialized = useRef(false);

  // Initialize camera position
  useEffect(() => {
    if (!isInitialized.current) {
      camera.position.set(0, 0, 30);
      camera.lookAt(0, 0, 0);
      isInitialized.current = true;
    }
  }, [camera]);

  // Handle hover state changes - pause animation when hovering
  useEffect(() => {
    if (hoveredNodeId && !isZoomed) {
      useAnimationStore.getState().pauseAnimation();
    } else if (!hoveredNodeId && !isZoomed && !isAnimating) {
      useAnimationStore.getState().resumeAnimation();
    }
  }, [hoveredNodeId, isZoomed, isAnimating]);

  useFrame((state, delta) => {
    // Handle camera animation
    if (isZoomed && zoomTarget && zoomLookAt) {
      // Zoom to target
      camera.position.lerp(zoomTarget, 0.08);
      camera.lookAt(zoomLookAt);
    } else if (!isZoomed && !isPaused) {
      // Always animate when not zoomed and not paused
      timeRef.current += delta;
      const cameraTime = timeRef.current * 0.2;
      camera.position.x = Math.sin(cameraTime) * 28;
      camera.position.z = Math.cos(cameraTime) * 28;
      camera.position.y = 8 + Math.sin(cameraTime * 0.7) * 4;
      camera.lookAt(0, 0, 0);

      // Update connection lines to follow nodes
      if (connectionsGroupRef.current?.updateConnections) {
        connectionsGroupRef.current.updateConnections();
      }
    }
  });

  return null;
}
