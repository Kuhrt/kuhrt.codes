import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface AnimationStore {
  isAnimating: boolean;
  isPaused: boolean;
  pauseAnimation: () => void;
  resumeAnimation: () => void;
  togglePause: () => void;
}

const useAnimationStore = create<AnimationStore>()(
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

export default useAnimationStore;
