import { type Vector3 } from 'three';

export interface CameraState {
  isAnimating: boolean;
  isZoomed: boolean;
  pausedPosition: Vector3;
  pausedLookAt: Vector3;
  targetPosition: Vector3;
  targetLookAt: Vector3;
  animationSpeed: number;
}
