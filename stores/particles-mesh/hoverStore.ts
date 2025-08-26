import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface HoverStore {
  hoveredNodeId: string | null;
  setHoveredNode: (id: string | null) => void;
}

const useHoverStore = create<HoverStore>()(
  devtools((set) => ({
    hoveredNodeId: null,

    setHoveredNode: (id) => {
      set({ hoveredNodeId: id });
    }
  }))
);

export default useHoverStore;
