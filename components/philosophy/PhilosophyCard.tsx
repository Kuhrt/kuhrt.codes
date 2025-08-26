import { CURSOR_DATA_GLOW } from '@/constants/cursor';
import { Philosophy } from '@/models/philosophy/Philosophy';
import { HeadingLevel } from '@/models/text/HeadingLevel';

import { Card, CardContent, CardTitle } from '../ui/Card';

interface Props {
  headingLevel?: HeadingLevel;
  philosophy: Philosophy;
}

export default function PhilosophyCard({ headingLevel, philosophy }: Props) {
  const { title, quote, points } = philosophy;

  return (
    <Card data-hover={CURSOR_DATA_GLOW}>
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
