import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';
import { LinkedListIcon } from '../assets/icons/Icons';
import ILinkedList from '../dataStructures/interfaces/ILinkedList';
import { LinkedList } from '../dataStructures/LinkedList';
import {
  LinkedListActions,
  LinkedListMethod,
  linkedListReducer,
} from '../reducers/linkedListReducer';
import { DataStructurePaint } from './LayoutProvider';

export interface ILinkedListState {
  data: ILinkedList<string>;
  paint: DataStructurePaint<LinkedListMethod>;
  icon: ReactNode;
}

type LinkedListProviderProps = {
  children: ReactNode;
};

const initialLinkedListState: ILinkedListState = {
  data: new LinkedList<string>(),
  paint: { type: LinkedListMethod.Remove },
  icon: (
    <LinkedListIcon width="5rem" height="5rem" fill="white" stroke="white" />
  ),
};

export const LinkedListContext = createContext<{
  state: ILinkedListState;
  dispatch: Dispatch<LinkedListActions<string>>;
}>({ state: initialLinkedListState, dispatch: () => undefined });

export const useLinkedList = () => {
  return useContext(LinkedListContext);
};

const LinkedListProvider = ({ children }: LinkedListProviderProps) => {
  const [state, dispatch] = useReducer(
    linkedListReducer,
    initialLinkedListState
  );
  return (
    <LinkedListContext.Provider value={{ state, dispatch }}>
      {children}
    </LinkedListContext.Provider>
  );
};

export default LinkedListProvider;
