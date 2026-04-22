import {
  Button,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';

export const SocialLinkForm = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          role="button"
          className="text-primary hover:text-chart-2 cursor-pointer transition"
        >
          {icon}
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-8">
        <Label>Edit your {label} link:</Label>
        <Input defaultValue={value} />
        <Button role="button" variant="destructive">
          Remove
        </Button>
      </PopoverContent>
    </Popover>
  );
};
