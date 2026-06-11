'use client';

import '@/utils/gsap'; // Ensure GSAP plugins are registered early

import { ReactNode, useMemo } from 'react';

import { SECTION_IDS } from '@/constants/sections';
import { useScrollTrigger } from '@/hooks/scroll/useScrollTrigger';

interface ScrollTriggerProviderProps {
  children: ReactNode;
}

export default function ScrollTriggerProvider({
  children
}: ScrollTriggerProviderProps) {
  const sections = useMemo(
    () => [
      { id: SECTION_IDS.intro, title: '' },
      { id: SECTION_IDS.capabilities, title: 'Capabilities' },
      // TODO: Re-enable once the case studies are filled in with real projects
      // { id: SECTION_IDS.caseStudies, title: 'Case Studies' },
      { id: SECTION_IDS.philosophy, title: 'Philosophy' },
      { id: SECTION_IDS.footer, title: 'Contact' }
    ],
    []
  );

  useScrollTrigger({
    sections,
    onSectionChange: () => {
      // Optional: Add any additional logic when sections change
    }
  });

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
