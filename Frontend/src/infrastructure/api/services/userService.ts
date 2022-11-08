import axios from 'axios';
import { History } from 'history';
import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';
import { Dispatch } from 'react';
import {
  UserActions,
  UserActionType,
} from '../../../application/reducers/userReducer';

const getUser = async (
  email: string,
  dispatch: Dispatch<UserActions>,
  history: History<unknown>
) => {
  try {
    const { data, status } = await axios.get(
      `${process.env.REACT_APP_ALGORITHMYA_API_BASE_URL}${process.env.REACT_APP_ALGORITHMYA_API_USER_URL}${email}`,
      { withCredentials: true }
    );
    if (status === 200) {
      const { data: dataStructures, errors } = await getDataStructures();
      if (errors !== null) {
        throw new Error(errors);
      }
      const { name }: any = data.data;
      dispatch({
        type: UserActionType.SetUser,
        payload: { name, errors: [], dataStructures },
      });
      localStorage.setItem('email', email.trim());
      history.push('/', 0);
      return true;
    }
  } catch (error: any) {
    let errors: string[] = [];
    if (error.message) {
      errors.push(error.message);
    }
    if (error.response) {
      if (error.response.status === 401) {
        errors = ['Your session expired.'];
      } else if (error.response.data && error.response.data.error) {
        errors = error.response.data.error.details;
      }
      dispatch({
        type: UserActionType.SetUser,
        payload: { name: '', errors, dataStructures: [] },
      });
      history.push('/sign-in', 0);
    }
  }
  return false;
};

const getDataStructures = async () => {
  let errors: string = '';
  try {
    const { data, status } = await axios.get(
      `${process.env.REACT_APP_ALGORITHMYA_API_BASE_URL}${process.env.REACT_APP_ALGORITHMYA_API_DS_URL}`,
      { withCredentials: true }
    );
    if (status === 200) {
      const dataStructures: any = data.data;
      return { data: dataStructures, errors: null };
    }
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 401) {
        errors = 'Your session expired.';
      } else if (error.response.data && error.response.data.error) {
        errors = 'Something went wrong.';
      }
    }
  }
  return { data: null, errors: errors };
};

const signUp = async (
  name: string,
  email: string,
  password: string,
  dispatch: Dispatch<UserActions>,
  history: History<unknown>,
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey
) => {
  try {
    const { status } = await axios.post(
      `${process.env.REACT_APP_ALGORITHMYA_API_BASE_URL}${process.env.REACT_APP_ALGORITHMYA_API_USER_URL}`,

      { name, email, password }
    );
    if (status === 201) {
      enqueueSnackbar('Account created successfully.', { variant: 'success' });
      history.push('/sign-in', 0);
    }
  } catch (error: any) {
    let errors: string[] = [];
    if (error.response) {
      if (error.response.data && error.response.data.error) {
        errors = error.response.data.error.details;
      }
      dispatch({
        type: UserActionType.SignUp,
        payload: errors,
      });
    }
  }
};

const displayUserErrors = (
  errors: string[],
  dispatch: Dispatch<UserActions>,
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey
) => {
  errors.forEach((error) => {
    enqueueSnackbar(error, { variant: 'error' });
  });
  dispatch({ type: UserActionType.Errors });
};

export const userService = {
  getUser,
  signUp,
  displayUserErrors,
};
