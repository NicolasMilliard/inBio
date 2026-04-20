import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { Pencil } from 'lucide-react';

type EditableFieldProps = {
  children: React.ReactNode;
  onEdit: () => void;
  label?: string;
  asChild?: boolean;
  className?: string;
};

export function EditableField({
  children,
  onEdit,
  label,
  asChild = false,
  className,
}: EditableFieldProps) {
  const Comp = asChild ? Slot : 'div';

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onEdit();
    }
  };

  return (
    <div
      onClick={onEdit}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={label}
      className="group relative w-full cursor-pointer"
    >
      <Comp className={cn('relative block w-full', className)}>{children}</Comp>

      <div className="pointer-events-none absolute top-1 right-1 flex items-center justify-center opacity-100 group-hover:opacity-0">
        <div className="bg-foreground/10 text-foreground flex items-center gap-1.5 rounded-full px-3 py-1.5 backdrop-blur-xs">
          <Pencil size={14} />
        </div>
      </div>

      <div className="bg-foreground/30 pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <div className="bg-foreground/50 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-white backdrop-blur-sm">
          <Pencil size={14} />
          <span className="text-xs font-medium">{label}</span>
        </div>
      </div>
    </div>
  );
}
