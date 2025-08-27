import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface MeshAnimationStore {
  isAnimating: boolean;
  isPaused: boolean;
  pauseAnimation: () => void;
  resumeAnimation: () => void;
  togglePause: () => void;
}

const useMeshAnimationStore = create<MeshAnimationStore>()(
  devtools((set, get) => ({
    isAnimating: true,
    isPaused: false,

    pauseAnimation: () => {
      set({ isPaused: true, isAnimating: false });
    },

    resumeAnimation: () => {
      set({ isPaused: false, isAnimating: true });
    },

    togglePause: () => {
      const { isPaused } = get();
      if (isPaused) {
        get().resumeAnimation();
      } else {
        get().pauseAnimation();
      }
    }
  }))
);

export default useMeshAnimationStore;
