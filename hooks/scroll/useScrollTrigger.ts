'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

import { ScrollSection } from '@/models/animations/ScrollSection';
import useScrollStore from '@/stores/scrollStore';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

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

  // Helper function to update current section
  const updateCurrentSection = (
    section: { id: string; title: string },
    element: HTMLElement
  ) => {
    if (currentSectionRef.current !== section.id) {
      currentSectionRef.current = section.id;
      setCurrentSection({
        id: section.id,
        title: section.title,
        element
      });
      onSectionChange?.(section.id);
    }
  };

  const createSectionTrigger = (section: { id: string; title: string }) => {
    const element = document.getElementById(section.id);
    if (!element) return null;

    return ScrollTrigger.create({
      trigger: element,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        updateCurrentSection(section, element);
      },
      onEnterBack: () => {
        updateCurrentSection(section, element);
      }
    });
  };

  useGSAP(() => {
    if (typeof window === 'undefined' || isInitializedRef.current) return;

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
  }, [createSectionTrigger]);

  return {
    smoother,
    triggers: triggersRef.current
  };
}
