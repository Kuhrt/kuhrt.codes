'use client';

import { type Vector2 } from 'three';

export const getCameraAspect = () => {
  return typeof window === 'undefined'
    ? 1
    : window.innerWidth / window.innerHeight;
};

// TODO: Only do this with the section this is in
export const threeSectionMouseMove = (
  event: MouseEvent,
  mousePosition: Vector2
) => {
  const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
  const normalizedY = -(event.clientY / window.innerHeight) * 2 + 1;
  mousePosition.set(normalizedX, normalizedY);
};
