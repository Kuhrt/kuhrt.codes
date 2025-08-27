import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Skill } from '@/models/skills/Skill';

export interface MeshSkillStore {
  skill: Skill | null;
  setSkill: (value: MeshSkillStore['skill']) => void;
}

const useMeshSkillStore = create<MeshSkillStore>()(
  devtools((set) => ({
    skill: null,

    setSkill: (skill) => set({ skill })
  }))
);

export default useMeshSkillStore;
