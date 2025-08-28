'use client';

import { HTMLAttributes, useEffect, useRef } from 'react';

import { CURSOR_DATA_HOVER } from '@/constants/cursor';
import { cn } from '@/utils/styles';

export default function MagneticButton(
  props: HTMLAttributes<HTMLButtonElement>
) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { className, ...rest } = props;

  useEffect(() => {
    if (!buttonRef.current) return;

    const magneticBtn = buttonRef.current;

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
  }, []);

  return (
    <button
      ref={buttonRef}
      className={cn('magnetic-btn', className)}
      type="button"
      data-hover={CURSOR_DATA_HOVER}
      {...rest}
    />
  );
}
