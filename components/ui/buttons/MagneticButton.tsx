'use client';

import { HTMLAttributes, RefObject, useEffect, useRef } from 'react';

import { CURSOR_DATA_HOVER } from '@/constants/cursor';
import { cn } from '@/utils/styles';

interface Props extends HTMLAttributes<HTMLElement> {
  href?: string;
}

export default function MagneticButton(props: Props) {
  const elementRef = useRef<HTMLElement>(null);
  const { className, href, ...rest } = props;

  useEffect(() => {
    if (!elementRef.current) return;

    const magneticBtn = elementRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = magneticBtn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Use translate3d for better performance and smoother animation
      // Scale down the effect for subtle movement
      const moveX = x * 0.15;
      const moveY = y * 0.15;

      magneticBtn.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    };

    const handleMouseLeave = () => {
      // Reset to original position with smooth transition
      magneticBtn.style.transform = 'translate3d(0, 0, 0)';
    };

    magneticBtn.addEventListener('mousemove', handleMouseMove);
    magneticBtn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      magneticBtn.removeEventListener('mousemove', handleMouseMove);
      magneticBtn.removeEventListener('mouseleave', handleMouseLeave);
    };
    // The rendered element changes with href (anchor vs button) — re-attach listeners
  }, [href]);

  const sharedProps = {
    className: cn('magnetic-btn', className),
    'data-hover': CURSOR_DATA_HOVER,
    ...rest
  };

  if (href) {
    return (
      <a
        ref={elementRef as RefObject<HTMLAnchorElement>}
        href={href}
        {...sharedProps}
      />
    );
  }

  return (
    <button
      ref={elementRef as RefObject<HTMLButtonElement>}
      type="button"
      {...sharedProps}
    />
  );
}
