import IDataStructure from '../dataStructures/interfaces/IDataStructure';
import { IUserState } from '../providers/UserProvider';

export enum UserActionType {
  SetUser,
  SignUp,
  Errors,
}

interface SetUser {
  type: UserActionType.SetUser;
  payload: { name: string; errors: string[]; dataStructures: IDataStructure[] };
}

interface SignUp {
  type: UserActionType.SignUp;
  payload: string[];
}

interface Errors {
  type: UserActionType.Errors;
}

export type UserActions = SetUser | SignUp | Errors;

export const userReducer = (
  state: IUserState,
  action: UserActions
): IUserState => {
  switch (action.type) {
    case UserActionType.SetUser:
      const { name, errors, dataStructures } = action.payload;
      return { ...state, name, errors, dataStructures };
    case UserActionType.SignUp:
      return { ...state, errors: action.payload };
    case UserActionType.Errors:
      return { ...state, errors: [] };
    default:
      return state;
  }
};
