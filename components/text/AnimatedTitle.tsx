'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useRef } from 'react';

import { cn } from '@/utils/styles';

gsap.registerPlugin(SplitText);

interface Props {
  className?: string;
  fallbackText?: string;
  title: string;
}

export default function AnimatedTitle({
  className = '',
  fallbackText = '',
  title
}: Props) {
  const textRef = useRef<HTMLSpanElement>(null);
  const lastTitleRef = useRef<string>('');

  useGSAP(() => {
    if (!textRef.current) return;

    const currentText = title || fallbackText;
    const moveHeight = 30;
    const duration = 0.3;
    const stagger = 0.03;

    if (lastTitleRef.current === currentText) return;

    lastTitleRef.current = currentText;

    const oldLetters = new SplitText(textRef.current, { type: 'chars' }).chars;

    gsap.to(!oldLetters.length ? textRef.current : oldLetters, {
      y: -moveHeight,
      duration,
      stagger,
      onComplete: () => {
        if (!textRef.current) return;

        textRef.current.textContent = currentText;
        gsap.set(textRef.current, { y: moveHeight });

        const newLetters = new SplitText(textRef.current, { type: 'chars' })
          .chars;
        if (!newLetters.length) return;

        gsap.to(newLetters, {
          y: -moveHeight,
          duration,
          stagger
        });
      }
    });
  }, [fallbackText, title]);

  return (
    <div className={cn('inline-block overflow-hidden', className)}>
      <span ref={textRef} className="inline-block">
        {fallbackText}
      </span>
    </div>
  );
}
