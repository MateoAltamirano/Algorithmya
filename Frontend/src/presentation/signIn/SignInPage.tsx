import { Dispatch, SetStateAction } from 'react';
import TextInput from '../../application/components/textInput/TextInput';
import Form from '../layout/Form';

type SignInPageProps = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  signIn: () => Promise<void>;
  isLoading: boolean;
};

const SignInPage = ({
  email,
  setEmail,
  password,
  setPassword,
  signIn,
  isLoading,
}: SignInPageProps) => {
  const Inputs = (
    <>
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
      title={'Welcome!'}
      inputs={Inputs}
      isLoading={isLoading}
      btnLabel={'Sign In'}
      onClick={signIn}
      href={'/sign-up'}
      linkDescription={"Don't have an account? Create one!"}
    />
  );
};

export default SignInPage;
