import type { ReactNode } from 'react';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { cn } from '@/lib/utils';

type DashboardCardProps = {
  title: string;
  description?: string;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function DashboardCard({
  title,
  description,
  footer,
  children,
  className,
}: DashboardCardProps) {
  return (
    <Card
      className={cn(
        'border-border bg-background border shadow-none backdrop-blur-md',

        'relative overflow-hidden',
        'before:absolute before:inset-0 before:rounded-lg',
        'before:from-primary/5 before:bg-linear-to-br before:via-transparent before:to-transparent',
        'before:opacity-60',

        // animation
        'transition-all duration-300',
        'hover:border-primary/30 hover:shadow-primary/5 hover:-translate-y-1 hover:shadow-md',

        className,
      )}
    >
      <CardHeader>
        <CardTitle className="text-base font-medium tracking-tight">
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-muted-foreground text-sm">
            {description}
          </CardDescription>
        )}
      </CardHeader>

      {children}

      {footer && (
        <CardFooter className="relative flex justify-end">{footer}</CardFooter>
      )}
    </Card>
  );
}
