import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';
import IDataStructure from '../dataStructures/interfaces/IDataStructure';
import { UserActions, userReducer } from '../reducers/userReducer';

export interface IUserState {
  name: string;
  dataStructures: IDataStructure[];
  errors: string[];
}

type UserProviderProps = {
  children: ReactNode;
};

const initialUserState: IUserState = {
  name: '',
  errors: [],
  dataStructures: [],
};

export const UserContext = createContext<{
  state: IUserState;
  dispatch: Dispatch<UserActions>;
}>({ state: initialUserState, dispatch: () => undefined });

export const useUser = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }: UserProviderProps) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
