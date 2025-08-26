import { Vector3 } from 'three';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Skill } from '@/models/skills/Skill';

import useHoverStore from './hoverStore';

export interface SkillInteractionStore {
  selectedSkill: Skill | null;
  isZoomed: boolean;
  zoomTarget: Vector3 | null;
  zoomLookAt: Vector3 | null;

  // Unified interaction methods
  selectAndZoomToSkill: (skill: Skill, position: Vector3) => void;
  toggleSkillZoom: (skill: Skill, position: Vector3) => void;
  clearZoom: () => void;
}

const useSkillInteractionStore = create<SkillInteractionStore>()(
  devtools((set, get) => ({
    selectedSkill: null,
    isZoomed: false,
    zoomTarget: null,
    zoomLookAt: null,

    selectAndZoomToSkill: (skill: Skill, position: Vector3) => {
      const { selectedSkill, isZoomed } = get();

      // If clicking the same skill that's already selected, toggle zoom
      if (selectedSkill && skill.name === selectedSkill.name) {
        if (isZoomed) {
          // Zoom out - immediately resume animation and clear hover
          set({
            selectedSkill: null,
            isZoomed: false,
            zoomTarget: null,
            zoomLookAt: null
          });
          // Clear hover state to resume animation immediately
          useHoverStore.getState().setHoveredNode(null);
        } else {
          // Zoom in
          const targetPos = new Vector3(
            position.x * 0.3,
            position.y * 0.3 + 2,
            position.z * 0.3 + 15
          );
          set({
            selectedSkill: skill,
            isZoomed: true,
            zoomTarget: targetPos,
            zoomLookAt: position
          });
        }
      } else {
        // Always select and zoom to different skill
        const targetPos = new Vector3(
          position.x * 0.3,
          position.y * 0.3 + 2,
          position.z * 0.3 + 15
        );
        set({
          selectedSkill: skill,
          isZoomed: true,
          zoomTarget: targetPos,
          zoomLookAt: position
        });
      }
    },

    toggleSkillZoom: (skill: Skill, position: Vector3) => {
      const { selectedSkill, isZoomed } = get();

      if (selectedSkill && skill.name === selectedSkill.name && isZoomed) {
        // Zoom out
        set({
          selectedSkill: null,
          isZoomed: false,
          zoomTarget: null,
          zoomLookAt: null
        });
      } else {
        // Zoom in
        const targetPos = new Vector3(
          position.x * 0.3,
          position.y * 0.3 + 2,
          position.z * 0.3 + 15
        );
        set({
          selectedSkill: skill,
          isZoomed: true,
          zoomTarget: targetPos,
          zoomLookAt: position
        });
      }
    },

    clearZoom: () => {
      set({
        selectedSkill: null,
        isZoomed: false,
        zoomTarget: null,
        zoomLookAt: null
      });
    }
  }))
);

export default useSkillInteractionStore;
