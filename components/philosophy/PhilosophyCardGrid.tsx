'use client';

import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

import { Philosophy } from '@/models/philosophy/Philosophy';
import { gsap } from '@/utils/gsap';

import PhilosophyCard from './PhilosophyCard';

const CONTAINER_CLASS = 'philosophy-container';

interface Props {
  philosophies: Philosophy[];
}

export default function PhilosophyCardGrid({ philosophies }: Props) {
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardsRef.current) return;

      // Set initial state - cards are invisible and moved down from 50px
      gsap.set(`.${CONTAINER_CLASS}`, {
        opacity: 0,
        y: 50
      });

      // Create staggered animation for each card to fade in and move up from the bottom of the screen
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.to(`.${CONTAINER_CLASS}`, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2
      });
    },
    { scope: cardsRef }
  );

  return (
    <div
      ref={cardsRef}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 xl:gap-16"
    >
      {philosophies.map((philosophy) => (
        <div key={philosophy.title} className={CONTAINER_CLASS}>
          <PhilosophyCard philosophy={philosophy} className="h-full" />
        </div>
      ))}
    </div>
  );
}
