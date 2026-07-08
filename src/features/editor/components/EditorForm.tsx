import { useEditorContext } from '../context/editor.context';
import { usePreventNavigation } from '../hooks';
import { useEditorForm } from '../hooks/useEditorForm';

import { FormProvider } from 'react-hook-form';
import { UnsavedChangesDialog } from './UnsavedChangesDialog';

export const EditorForm = ({ children }: { children: React.ReactNode }) => {
  const { account, threeBioMetadata } = useEditorContext();
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
        <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
      </FormProvider>
      <UnsavedChangesDialog
        open={navigation.open}
        onCancel={navigation.cancelNavigation}
        onConfirm={navigation.confirmNavigation}
      />
    </>
  );
};
