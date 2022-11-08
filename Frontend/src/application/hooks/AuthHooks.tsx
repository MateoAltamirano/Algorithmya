import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authService } from '../../infrastructure/api/services/authService';
import { userService } from '../../infrastructure/api/services/userService';
import { useArray } from '../providers/ArrayProvider';
import { useAuth } from '../providers/AuthProvider';
import { useGraph } from '../providers/GraphProvider';
import { useHashTable } from '../providers/HashTableProvider';
import { useLinkedList } from '../providers/LinkedListProvider';
import { useQueue } from '../providers/QueueProvider';
import { useStack } from '../providers/StackProvider';
import { useUser } from '../providers/UserProvider';

const useAuthHook = () => {
  const {
    dispatch: authDispatch,
    state: { errors },
  } = useAuth();
  const { dispatch: userDispatch } = useUser();
  const { dispatch: arrayDispatch } = useArray();
  const { dispatch: stackDispatch } = useStack();
  const { dispatch: queueDispatch } = useQueue();
  const { dispatch: linkedListDispatch } = useLinkedList();
  const { dispatch: hashTableDispatch } = useHashTable();
  const { dispatch: graphDispatch } = useGraph();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (errors.length > 0) {
      authService.displaySignInErrors(errors, authDispatch, enqueueSnackbar);
    }
  }, [errors, authDispatch, enqueueSnackbar]);

  const signIn = async () => {
    setIsLoading(true);
    const success: boolean = await authService.signIn(
      email.trim(),
      password.trim(),
      authDispatch
    );
    if (success) {
      const success: boolean = await userService.getUser(
        email.trim(),
        userDispatch,
        history
      );
      if (success) {
        localStorage.setItem('email', email.trim());
      }
      setEmail('');
      setPassword('');
    }
    setIsLoading(false);
  };

  const signOut = (handleMoreClose: () => void) => {
    authService.signOut(
      authDispatch,
      userDispatch,
      arrayDispatch,
      stackDispatch,
      queueDispatch,
      linkedListDispatch,
      hashTableDispatch,
      graphDispatch
    );
    handleMoreClose();
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    signIn,
    signOut,
    isLoading,
  };
};

export default useAuthHook;
