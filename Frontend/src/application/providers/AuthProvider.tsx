import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';
import { AuthActions, authReducer } from '../reducers/authReducer';

export interface IAuthState {
  isAuth: boolean;
  errors: string[];
}

type AuthProviderProps = {
  children: ReactNode;
};

const initialAuthState: IAuthState = {
  isAuth: false,
  errors: [],
};

export const AuthContext = createContext<{
  state: IAuthState;
  dispatch: Dispatch<AuthActions>;
}>({ state: initialAuthState, dispatch: () => undefined });

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
