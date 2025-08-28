import React from 'react';

import { CURSOR_DATA_GLOW } from '@/constants/cursor';
import { HeadingLevel } from '@/models/text/HeadingLevel';
import { cn } from '@/utils/styles';

interface Props {
  className?: string;
  level: HeadingLevel;
  text: string;
}

export default function GradientHeading({ className, level, text }: Props) {
  const HeadingTag = level;
  const baseClasses = 'font-display text-gradient transition-all';

  return (
    <HeadingTag
      className={cn(baseClasses, className)}
      data-hover={CURSOR_DATA_GLOW}
    >
      {text}
    </HeadingTag>
  );
}
