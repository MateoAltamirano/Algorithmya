import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';
import { QueueIcon } from '../assets/icons/Icons';
import IQueue from '../dataStructures/interfaces/IQueue';
import { Queue } from '../dataStructures/Queue';
import {
  QueueActions,
  QueueMethod,
  queueReducer,
} from '../reducers/queueReducer';
import { DataStructurePaint } from './LayoutProvider';

export interface IQueueState {
  data: IQueue<string>;
  paint: DataStructurePaint<QueueMethod>;
  icon: ReactNode;
}

type QueueProviderProps = {
  children: ReactNode;
};

const initialQueueState: IQueueState = {
  data: new Queue<string>(),
  paint: { type: QueueMethod.Dequeue },
  icon: <QueueIcon width="5rem" height="5rem" fill="white" stroke="white" />,
};

export const QueueContext = createContext<{
  state: IQueueState;
  dispatch: Dispatch<QueueActions<string>>;
}>({ state: initialQueueState, dispatch: () => undefined });

export const useQueue = () => {
  return useContext(QueueContext);
};

const QueueProvider = ({ children }: QueueProviderProps) => {
  const [state, dispatch] = useReducer(queueReducer, initialQueueState);
  return (
    <QueueContext.Provider value={{ state, dispatch }}>
      {children}
    </QueueContext.Provider>
  );
};

export default QueueProvider;
