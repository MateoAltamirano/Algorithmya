import { Dispatch, SetStateAction } from 'react';
import TextInput from '../../application/components/textInput/TextInput';
import Form from '../layout/Form';

type SignUpPageProps = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  signUp: () => Promise<void>;
  isLoading: boolean;
};

const SignUpPage = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  signUp,
  isLoading,
}: SignUpPageProps) => {
  const Inputs = (
    <>
      <TextInput
        value={name}
        setValue={setName}
        hasButton={false}
        placeholder={'Name'}
        disabled={isLoading}
      />
      <TextInput
        value={email}
        setValue={setEmail}
        hasButton={false}
        placeholder={'Email'}
        disabled={isLoading}
      />
      <TextInput
        value={password}
        setValue={setPassword}
        hasButton={false}
        placeholder={'Password'}
        type="password"
        disabled={isLoading}
      />
    </>
  );

  return (
    <Form
      title={'Create account'}
      inputs={Inputs}
      isLoading={isLoading}
      btnLabel={'Sign Up'}
      onClick={signUp}
      href={'/sign-in'}
      linkDescription={'Already have an account? Sign in!'}
    />
  );
};

export default SignUpPage;
