import { Vector3 } from 'three';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Capability } from '@/models/capabilities/Capability';

import useMeshHoverStore from './meshHoverStore';

export interface CapabilityInteractionStore {
  selectedCapability: Capability | null;
  isZoomed: boolean;
  zoomTarget: Vector3 | null;
  zoomLookAt: Vector3 | null;

  selectAndZoomToCapability: (
    capability: Capability,
    position: Vector3
  ) => void;
  toggleCapabilityZoom: (capability: Capability, position: Vector3) => void;
  clearZoom: () => void;
}

const useCapabilityInteractionStore = create<CapabilityInteractionStore>()(
  devtools((set, get) => ({
    selectedCapability: null,
    isZoomed: false,
    zoomTarget: null,
    zoomLookAt: null,

    selectAndZoomToCapability: (
      capability: Capability,
      position: Vector3
    ) => {
      const { selectedCapability, isZoomed } = get();

      if (selectedCapability && capability.name === selectedCapability.name) {
        if (isZoomed) {
          set({
            selectedCapability: null,
            isZoomed: false,
            zoomTarget: null,
            zoomLookAt: null
          });
          useMeshHoverStore.getState().setHoveredNode(null);
        } else {
          const targetPos = new Vector3(
            position.x * 0.3,
            position.y * 0.3 + 2,
            position.z * 0.3 + 15
          );
          set({
            selectedCapability: capability,
            isZoomed: true,
            zoomTarget: targetPos,
            zoomLookAt: position
          });
        }
      } else {
        const targetPos = new Vector3(
          position.x * 0.3,
          position.y * 0.3 + 2,
          position.z * 0.3 + 15
        );
        set({
          selectedCapability: capability,
          isZoomed: true,
          zoomTarget: targetPos,
          zoomLookAt: position
        });
      }
    },

    toggleCapabilityZoom: (capability: Capability, position: Vector3) => {
      const { selectedCapability, isZoomed } = get();

      if (
        selectedCapability &&
        capability.name === selectedCapability.name &&
        isZoomed
      ) {
        set({
          selectedCapability: null,
          isZoomed: false,
          zoomTarget: null,
          zoomLookAt: null
        });
      } else {
        const targetPos = new Vector3(
          position.x * 0.3,
          position.y * 0.3 + 2,
          position.z * 0.3 + 15
        );
        set({
          selectedCapability: capability,
          isZoomed: true,
          zoomTarget: targetPos,
          zoomLookAt: position
        });
      }
    },

    clearZoom: () => {
      set({
        selectedCapability: null,
        isZoomed: false,
        zoomTarget: null,
        zoomLookAt: null
      });
    }
  }))
);

export default useCapabilityInteractionStore;
