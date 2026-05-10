import type { ReactNode } from 'react';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Text,
} from '@/components/ui';
import { cn } from '@/lib/utils';

type DashboardCardProps = {
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
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
    <Card className={cn('bg-muted/40 ring-0', className)}>
      <CardHeader>
        <CardTitle>
          <Text variant="h3" className="text-foreground">
            {title}
          </Text>
        </CardTitle>
        {description && (
          <CardDescription className="text-foreground">
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
