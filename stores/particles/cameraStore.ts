import { Vector3 } from 'three';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface CameraStore {
  isZoomed: boolean;
  zoomTarget: Vector3 | null;
  zoomLookAt: Vector3 | null;
  setZoomState: (isZoomed: boolean, target?: Vector3, lookAt?: Vector3) => void;
  clearZoom: () => void;
}

const useCameraStore = create<CameraStore>()(
  devtools((set) => ({
    isZoomed: false,
    zoomTarget: null,
    zoomLookAt: null,

    setZoomState: (isZoomed, target, lookAt) => {
      set({
        isZoomed,
        zoomTarget: target || null,
        zoomLookAt: lookAt || null
      });
    },

    clearZoom: () => {
      set({
        isZoomed: false,
        zoomTarget: null,
        zoomLookAt: null
      });
    }
  }))
);

export default useCameraStore;
