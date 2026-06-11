'use client';

import { useGSAP } from '@gsap/react';
import { useEffect, useRef } from 'react';

import { ScrollSection } from '@/models/animations/ScrollSection';
import useScrollStore from '@/stores/scrollStore';
import { ScrollSmoother, ScrollTrigger } from '@/utils/gsap';

export interface UseScrollTriggerOptions {
  sections: ScrollSection[];
  onSectionChange?: (sectionId: string) => void;
}

export function useScrollTrigger({
  sections,
  onSectionChange
}: UseScrollTriggerOptions) {
  const smoother = useRef<ScrollSmoother | null>(null);
  const { setCurrentSection } = useScrollStore();
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const isInitializedRef = useRef(false);
  const currentSectionRef = useRef<string>('');
  const sectionsRef = useRef(sections);

  // Update ref when sections change
  useEffect(() => {
    sectionsRef.current = sections;
  }, [sections]);

  useGSAP(() => {
    if (typeof window === 'undefined' || isInitializedRef.current) return;

    // Plain closures are enough here: the triggers are created inside the GSAP
    // context, and their callbacks only touch the store — no tweens
    const updateCurrentSection = (section: ScrollSection) => {
      if (currentSectionRef.current !== section.id) {
        currentSectionRef.current = section.id;
        setCurrentSection(section.title);
        onSectionChange?.(section.id);
      }
    };

    const createSectionTrigger = (section: ScrollSection) => {
      const element = document.getElementById(section.id);
      if (!element) return null;

      return ScrollTrigger.create({
        trigger: element,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          updateCurrentSection(section);
        },
        onEnterBack: () => {
          updateCurrentSection(section);
        }
      });
    };

    smoother.current = ScrollSmoother.create({
      smooth: 1.2,
      effects: true
    });

    sectionsRef.current.forEach((section) => {
      const trigger = createSectionTrigger(section);
      if (trigger) {
        triggersRef.current.push(trigger);
      }
    });

    isInitializedRef.current = true;
  });

  // Returned as refs — unwrap .current in handlers or effects, not during render
  return {
    smoother,
    triggers: triggersRef
  };
}
