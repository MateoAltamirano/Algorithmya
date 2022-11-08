import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';
import { GraphIcon } from '../assets/icons/Icons';
import { Graph } from '../dataStructures/Graph';
import IGraph from '../dataStructures/interfaces/IGraph';
import { GraphActions, graphReducer } from '../reducers/graphReducer';
import { DataStructurePaint } from './LayoutProvider';

export enum GraphPaintTo {
  Node,
  None,
}

export interface IGraphState {
  data: IGraph<string>;
  paint: DataStructurePaint<GraphPaintTo>;
  icon: ReactNode;
}

type GraphProviderProps = {
  children: ReactNode;
};

const initialGraphState: IGraphState = {
  data: new Graph<string>(),
  paint: { type: GraphPaintTo.None },
  icon: <GraphIcon width="5rem" height="5rem" fill="white" stroke="white" />,
};

export const GraphContext = createContext<{
  state: IGraphState;
  dispatch: Dispatch<GraphActions<string>>;
}>({ state: initialGraphState, dispatch: () => undefined });

export const useGraph = () => {
  return useContext(GraphContext);
};

const GraphProvider = ({ children }: GraphProviderProps) => {
  const [state, dispatch] = useReducer(graphReducer, initialGraphState);
  return (
    <GraphContext.Provider value={{ state, dispatch }}>
      {children}
    </GraphContext.Provider>
  );
};

export default GraphProvider;
