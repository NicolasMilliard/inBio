import { formatUrlLabel } from '@/helpers';
import { useFormContext, useWatch } from 'react-hook-form';

import { Button } from '@/components/ui';
import { WebsiteLink } from '@/features/profile/components';
import { Plus } from 'lucide-react';

export const LinksSection = () => {
  const { control } = useFormContext<{ links: string[] }>();
  const links = useWatch({ control, name: 'links' });
  return (
    <>
      {links.map((link) => (
        <WebsiteLink key={link} href={link} label={formatUrlLabel(link)} />
      ))}
      <Button type="button" variant="outline">
        Add link <Plus size={24} />
      </Button>
    </>
  );
};
