import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { ScrollSection } from '@/models/animations/ScrollSection';

export interface ScrollStore {
  sections: ScrollSection[];
  currentSection: ScrollSection | null;
  addSection: (section: ScrollSection) => void;
  setCurrentSection: (section: ScrollSection | null) => void;
  getSectionById: (id: string) => ScrollSection | undefined;
}

const useScrollStore = create<ScrollStore>()(
  devtools((set, get) => ({
    sections: [],
    currentSection: null,

    addSection: (section) => {
      set((state) => ({
        sections: [
          ...state.sections.filter((s) => s.id !== section.id),
          section
        ]
      }));
    },

    setCurrentSection: (section) => {
      set({ currentSection: section });
    },

    getSectionById: (id) => {
      return get().sections.find((s) => s.id === id);
    }
  }))
);

export default useScrollStore;
