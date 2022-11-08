import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { userService } from '../../infrastructure/api/services/userService';
import { useUser } from '../providers/UserProvider';

const useUserHook = (email: string, password: string) => {
  const {
    dispatch,
    state: { errors },
  } = useUser();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (errors.length > 0) {
      userService.displayUserErrors(errors, dispatch, enqueueSnackbar);
    }
  }, [errors, dispatch, enqueueSnackbar]);

  const signUp = async () => {
    setIsLoading(true);
    await userService.signUp(
      name.trim(),
      email.trim(),
      password.trim(),
      dispatch,
      history,
      enqueueSnackbar
    );
    setIsLoading(false);
  };
  return { name, setName, signUp, isLoading };
};

export default useUserHook;
