import { DialogHTMLAttributes, useEffect, useRef, useState } from 'react';

import {
  Capability,
  capabilityColorVariables
} from '@/models/capabilities/Capability';
import { cn } from '@/utils/styles';

import { Card, CardContent, CardTitle } from '../ui/Card';

interface Props extends DialogHTMLAttributes<HTMLDialogElement> {
  capability: Capability | null;
}

export default function CapabilityDialog(props: Props) {
  const { className, open, capability, ...restProps } = props;
  const colorVariable = capability
    ? capabilityColorVariables.get(capability.color)
    : '--primary';

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isAnimating, setIsAnimating] = useState(!!open);

  useEffect(() => {
    if (open && capability) {
      dialogRef.current?.show();
      const frame = requestAnimationFrame(() => setIsAnimating(true));
      return () => cancelAnimationFrame(frame);
    } else if (!open) {
      const frame = requestAnimationFrame(() => setIsAnimating(false));
      const timeout = setTimeout(() => dialogRef.current?.close(), 800);
      return () => {
        cancelAnimationFrame(frame);
        clearTimeout(timeout);
      };
    }
  }, [open, capability]);

  return (
    <dialog
      className={cn(
        'bg-transparent max-w-xl w-full',
        'transition-all duration-800',
        'transform-gpu',
        isAnimating
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 -translate-x-1/2',
        className
      )}
      ref={dialogRef}
      {...restProps}
    >
      <Card className="shadow-card min-h-72">
        <CardTitle
          className={`text-[var(${colorVariable})]`}
          id="capability-dialog-title"
        >
          {capability?.name ?? ' '}
        </CardTitle>
        <CardContent id="capability-dialog-content" className="space-y-4">
          <p className="text-sm text-primary font-mono italic">
            {capability?.tagline ?? ' '}
          </p>
          <p className="text-xs lg:text-sm text-muted">
            {capability?.description ?? ' '}
          </p>
          {capability?.examples && capability.examples.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs text-foreground font-mono uppercase tracking-wider">
                Applied
              </h4>
              {capability.examples.map((example) => (
                <div
                  key={example.title}
                  className="border-l-2 pl-3"
                  style={{
                    borderColor: capability.color
                  }}
                >
                  <p className="text-xs lg:text-sm text-foreground font-semibold">
                    {example.title}
                  </p>
                  <p className="text-xs text-muted">{example.detail}</p>
                </div>
              ))}
            </div>
          )}
          {capability?.offer && (
            <div className="pt-3 border-t border-border">
              <h4 className="text-xs text-foreground font-mono uppercase tracking-wider mb-1">
                The Bottom Line
              </h4>
              <p className="text-xs lg:text-sm text-foreground">
                {capability.offer}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </dialog>
  );
}
