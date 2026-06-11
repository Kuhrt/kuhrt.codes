import { cn } from '@/utils/styles';

interface Props {
  children: string;
  className?: string;
}

export default function SectionLabel({ children, className }: Props) {
  return (
    <p
      className={cn(
        'text-xs font-mono text-primary uppercase tracking-wider mb-2',
        className
      )}
    >
      {children}
    </p>
  );
}
