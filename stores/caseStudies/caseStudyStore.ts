import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface CaseStudyStore {
  masterProgress: number;
  setMasterProgress: (progress: number) => void;
}

const useCaseStudyStore = create<CaseStudyStore>()(
  devtools((set) => ({
    masterProgress: 0,

    setMasterProgress: (progress) => {
      set({ masterProgress: progress });
    }
  }))
);

export default useCaseStudyStore;
