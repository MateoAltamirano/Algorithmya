import { IAuthState } from '../providers/AuthProvider';

export enum AuthActionType {
  SignIn,
  SignOut,
  Errors,
}

interface SignIn {
  type: AuthActionType.SignIn;
  payload: { isAuth: boolean; errors: string[] };
}

interface SignOut {
  type: AuthActionType.SignOut;
}

interface Errors {
  type: AuthActionType.Errors;
}

export type AuthActions = SignIn | SignOut | Errors;

export const authReducer = (
  state: IAuthState,
  action: AuthActions
): IAuthState => {
  switch (action.type) {
    case AuthActionType.SignIn:
      const { isAuth, errors } = action.payload;
      return { ...state, isAuth, errors };
    case AuthActionType.SignOut:
      return { ...state, isAuth: false, errors: [] };
    case AuthActionType.Errors:
      return { ...state, errors: [] };
    default:
      return state;
  }
};
