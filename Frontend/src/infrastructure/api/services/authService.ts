import axios from 'axios';
import { OptionsObject, SnackbarMessage, SnackbarKey } from 'notistack';
import { Dispatch } from 'react';
import {
  ArrayActions,
  ArrayMethod,
} from '../../../application/reducers/arrayReducer';
import {
  AuthActions,
  AuthActionType,
} from '../../../application/reducers/authReducer';
import {
  GraphActions,
  GraphMethod,
} from '../../../application/reducers/graphReducer';
import {
  HashTableActions,
  HashTableMethod,
} from '../../../application/reducers/hashTableReducer';
import {
  LinkedListActions,
  LinkedListMethod,
} from '../../../application/reducers/linkedListReducer';
import {
  QueueActions,
  QueueMethod,
} from '../../../application/reducers/queueReducer';
import {
  StackActions,
  StackMethod,
} from '../../../application/reducers/stackReducer';
import {
  UserActions,
  UserActionType,
} from '../../../application/reducers/userReducer';

const signIn = async (
  email: string,
  password: string,
  dispatch: Dispatch<AuthActions>
) => {
  try {
    const { status } = await axios.post(
      `${process.env.REACT_APP_ALGORITHMYA_API_BASE_URL}${process.env.REACT_APP_ALGORITHMYA_API_AUTH_URL}`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    if (status === 200) {
      dispatch({
        type: AuthActionType.SignIn,
        payload: { isAuth: true, errors: [] },
      });
      return true;
    }
  } catch (error: any) {
    let errors: string[] = ['Something went wrong. Please try again.'];
    if (error.response && error.response.data && error.response.data.error) {
      errors = error.response.data.error.details;
    }
    dispatch({
      type: AuthActionType.SignIn,
      payload: { isAuth: false, errors },
    });
    return false;
  }
  return false;
};

const signOut = (
  authDispatch: Dispatch<AuthActions>,
  userDispatch: Dispatch<UserActions>,
  arrayDispatch: Dispatch<ArrayActions<string>>,
  stackDispatch: Dispatch<StackActions<string>>,
  queueDispatch: Dispatch<QueueActions<string>>,
  linkedListDispatch: Dispatch<LinkedListActions<string>>,
  hashTableDispatch: Dispatch<HashTableActions<string, string>>,
  graphDispatch: Dispatch<GraphActions<string>>
) => {
  arrayDispatch({
    type: ArrayMethod.Reset,
  });
  stackDispatch({
    type: StackMethod.Reset,
  });
  queueDispatch({
    type: QueueMethod.Reset,
  });
  linkedListDispatch({
    type: LinkedListMethod.Reset,
  });
  hashTableDispatch({
    type: HashTableMethod.Reset,
  });
  graphDispatch({
    type: GraphMethod.Reset,
  });
  authDispatch({
    type: AuthActionType.SignOut,
  });
  userDispatch({
    type: UserActionType.SetUser,
    payload: { name: '', errors: [], dataStructures: [] },
  });
  localStorage.clear();
};

const displaySignInErrors = (
  errors: string[],
  dispatch: Dispatch<AuthActions>,
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey
) => {
  errors.forEach((error) => {
    enqueueSnackbar(error, { variant: 'error' });
  });
  dispatch({ type: AuthActionType.Errors });
};

export const authService = {
  signIn,
  signOut,
  displaySignInErrors,
};
