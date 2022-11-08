import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';
import { ArrayIcon } from '../assets/icons/Icons';
import { Array } from '../dataStructures/Array';
import IArray from '../dataStructures/interfaces/IArray';
import {
  ArrayActions,
  ArrayMethod,
  arrayReducer,
} from '../reducers/arrayReducer';
import { DataStructurePaint } from './LayoutProvider';

export interface IArrayState {
  data: IArray<string>;
  paint: DataStructurePaint<ArrayMethod>;
  icon: ReactNode;
}

type ArrayProviderProps = {
  children: ReactNode;
};

const initialArrayState: IArrayState = {
  data: new Array<string>(),
  paint: { type: ArrayMethod.Remove },
  icon: <ArrayIcon width="5rem" height="5rem" fill="white" stroke="white" />,
};

export const ArrayContext = createContext<{
  state: IArrayState;
  dispatch: Dispatch<ArrayActions<string>>;
}>({ state: initialArrayState, dispatch: () => undefined });

export const useArray = () => {
  return useContext(ArrayContext);
};

const ArrayProvider = ({ children }: ArrayProviderProps) => {
  const [state, dispatch] = useReducer(arrayReducer, initialArrayState);
  return (
    <ArrayContext.Provider value={{ state, dispatch }}>
      {children}
    </ArrayContext.Provider>
  );
};

export default ArrayProvider;
