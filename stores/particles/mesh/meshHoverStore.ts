import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface MeshHoverStore {
  hoveredNodeId: string | null;
  setHoveredNode: (id: string | null) => void;
}

const useMeshHoverStore = create<MeshHoverStore>()(
  devtools((set) => ({
    hoveredNodeId: null,

    setHoveredNode: (id) => {
      set({ hoveredNodeId: id });
    }
  }))
);

export default useMeshHoverStore;
