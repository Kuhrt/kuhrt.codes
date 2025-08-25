import { HTMLAttributes } from 'react';

import { HeadingLevel } from '@/models/text/HeadingLevel';
import { cn } from '@/utils/styles';

function Card(props: HTMLAttributes<HTMLDivElement>) {
  const { className, ...restProps } = props;

  return <div className={cn('card', className)} {...restProps} />;
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
}
function CardTitle(props: CardTitleProps) {
  const { className, children, level = 'h3', ...restProps } = props;

  const HeadingTag = level;

  return (
    <HeadingTag
      {...restProps}
      className={cn('font-mono text-primary text-2xl mb-4', className)}
    >
      {typeof children === 'string' ? (
        <>./{children.toLowerCase()}</>
      ) : (
        children
      )}
    </HeadingTag>
  );
}

function CardContent(props: HTMLAttributes<HTMLDivElement>) {
  const { className, children, ...restProps } = props;

  return (
    <div className={cn('text-muted leading-[1.6]', className)} {...restProps}>
      {children}
    </div>
  );
}

export { Card, CardContent, CardTitle };
