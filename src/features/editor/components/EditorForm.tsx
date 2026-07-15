import type { ThreeBioMetadata } from '@/schemas/threeBioMetadata.schema';
import type { Account } from '@lens-protocol/react';
import { usePreventNavigation } from '../hooks';
import { useEditorForm } from '../hooks/useEditorForm';

import { FormProvider } from 'react-hook-form';
import { UnsavedChangesDialog } from './UnsavedChangesDialog';

export const EditorForm = ({
  account,
  threeBioMetadata,
  children,
}: {
  account: Account;
  threeBioMetadata: ThreeBioMetadata;
  children: React.ReactNode;
}) => {
  const { methods, onSubmit } = useEditorForm(account, threeBioMetadata);

  const {
    formState: { isDirty },
  } = methods;
  const navigation = usePreventNavigation({
    enabled: isDirty,
  });

  return (
    <>
      <FormProvider {...methods}>
        <form
          id="profile-editor-form"
          className="min-h-dvh w-full"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {children}
        </form>
      </FormProvider>
      <UnsavedChangesDialog
        open={navigation.open}
        onCancel={navigation.cancelNavigation}
        onConfirm={navigation.confirmNavigation}
      />
    </>
  );
};
