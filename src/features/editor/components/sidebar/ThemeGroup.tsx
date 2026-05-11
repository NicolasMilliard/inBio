import { useEditorContext } from '@/features/editor/context/editor.context';

import { SidebarGroup, SidebarGroupLabel, Text } from '@/components/ui';
import { BrandingSwitch, PictureController } from './form';

export const ThemeGroup = () => {
  const { account, inBioMetadata } = useEditorContext();
  const coverPicturePath =
    inBioMetadata.profile?.coverPicture ?? account.metadata?.coverPicture;

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="pl-0 tracking-widest uppercase">
        Theme
      </SidebarGroupLabel>
      <div className="flex flex-col gap-4">
        <PictureController
          picturePath={coverPicturePath}
          formValue="coverPicture"
        />
        <BrandingSwitch />
        <Text>Preset</Text>
      </div>
    </SidebarGroup>
  );
};
