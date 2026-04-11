import { AuthButton } from '../auth/components/AuthButton';
import { Form } from './components/Form';

const EditProfile = () => {
  return (
    <div className="flex h-screen w-screen flex-1 flex-col items-center justify-center gap-6">
      <AuthButton />
      <Form />
    </div>
  );
};

export default EditProfile;
