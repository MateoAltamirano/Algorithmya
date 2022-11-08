import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';
import { StackIcon } from '../assets/icons/Icons';
import IStack from '../dataStructures/interfaces/IStack';
import { Stack } from '../dataStructures/Stack';
import {
  StackActions,
  StackMethod,
  stackReducer,
} from '../reducers/stackReducer';
import { DataStructurePaint } from './LayoutProvider';

export interface IStackState {
  data: IStack<string>;
  paint: DataStructurePaint<StackMethod>;
  icon: ReactNode;
}

type StackProviderProps = {
  children: ReactNode;
};

const initialStackState: IStackState = {
  data: new Stack<string>(),
  paint: { type: StackMethod.Pop },
  icon: <StackIcon width="5rem" height="5rem" fill="white" stroke="white" />,
};

export const StackContext = createContext<{
  state: IStackState;
  dispatch: Dispatch<StackActions<string>>;
}>({ state: initialStackState, dispatch: () => undefined });

export const useStack = () => {
  return useContext(StackContext);
};

const StackProvider = ({ children }: StackProviderProps) => {
  const [state, dispatch] = useReducer(stackReducer, initialStackState);
  return (
    <StackContext.Provider value={{ state, dispatch }}>
      {children}
    </StackContext.Provider>
  );
};

export default StackProvider;
