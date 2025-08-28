import { HTMLAttributes, RefObject } from 'react';

import { CURSOR_DATA_GLOW } from '@/constants/cursor';
import { Philosophy } from '@/models/philosophy/Philosophy';
import { HeadingLevel } from '@/models/text/HeadingLevel';
import { cn } from '@/utils/styles';

import { Card, CardContent, CardTitle } from '../ui/Card';

interface Props extends HTMLAttributes<HTMLDivElement> {
  headingLevel?: HeadingLevel;
  philosophy: Philosophy;
  ref?: RefObject<HTMLDivElement | null>;
}

export default function PhilosophyCard(props: Props) {
  const { className, headingLevel, philosophy, ref, ...restProps } = props;

  const { title, quote, points } = philosophy;

  return (
    <Card
      data-hover={CURSOR_DATA_GLOW}
      ref={ref}
      className={cn('philosophy-card', className)}
      {...restProps}
    >
      <CardTitle level={headingLevel}>{title}</CardTitle>
      <CardContent>
        <p className="text-lg text-foreground font-bold mb-4">{quote}</p>
        <ol className="list-disc list-outside ms-4">
          {points.map(([point, description]) => (
            <li key={`${title}-${point}`}>
              <span className="font-extrabold">{point}</span> &ndash;&nbsp;
              {description}
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
