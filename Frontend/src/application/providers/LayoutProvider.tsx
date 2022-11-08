import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';
import { LayoutActions, layoutReducer } from '../reducers/layoutReducer';

export interface ILayoutState {
  pageIdx: number;
}

type LayoutProviderProps = {
  children: ReactNode;
};

const initialLayoutState: ILayoutState = {
  pageIdx: 0,
};

export const LayoutContext = createContext<{
  state: ILayoutState;
  dispatch: Dispatch<LayoutActions>;
}>({ state: initialLayoutState, dispatch: () => undefined });

export const useLayout = () => {
  return useContext(LayoutContext);
};

const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [state, dispatch] = useReducer(layoutReducer, initialLayoutState);
  return (
    <LayoutContext.Provider value={{ state, dispatch }}>
      {children}
    </LayoutContext.Provider>
  );
};

export type DataStructurePaint<T> = {
  type: T;
  index?: number;
};

export default LayoutProvider;
