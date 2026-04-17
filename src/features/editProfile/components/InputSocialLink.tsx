import {
  Field,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui';

export const InputSocialLink = ({
  label,
  placeholer,
  icon,
  ...props
}: {
  label: string;
  placeholer: string;
  icon: React.ReactNode;
} & React.ComponentPropsWithoutRef<'input'>) => {
  return (
    <Field>
      <InputGroup>
        <InputGroupInput
          id="input-group-url"
          placeholder={placeholer}
          {...props}
        />
        <InputGroupAddon>
          <Tooltip>
            <TooltipTrigger>
              <span className="text-primary hover:text-chart-2 size-6 transition">
                {icon}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
};
