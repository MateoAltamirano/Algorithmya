import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';
import { HashTableIcon } from '../assets/icons/Icons';
import { HashTable } from '../dataStructures/HashTable';
import IHashTable from '../dataStructures/interfaces/IHashTable';
import {
  HashTableActions,
  HashTableMethod,
  hashTableReducer,
} from '../reducers/hashTableReducer';
import { DataStructurePaint } from './LayoutProvider';

export interface IHashTableState {
  data: IHashTable<string, string>;
  paint: DataStructurePaint<HashTableMethod>;
  icon: ReactNode;
}

type HashTableProviderProps = {
  children: ReactNode;
};

const initialHashTableState: IHashTableState = {
  data: new HashTable<string, string>(),
  paint: { type: HashTableMethod.Remove },
  icon: (
    <HashTableIcon width="5rem" height="5rem" fill="white" stroke="white" />
  ),
};

export const HashTableContext = createContext<{
  state: IHashTableState;
  dispatch: Dispatch<HashTableActions<string, string>>;
}>({ state: initialHashTableState, dispatch: () => undefined });

export const useHashTable = () => {
  return useContext(HashTableContext);
};

const HashTableProvider = ({ children }: HashTableProviderProps) => {
  const [state, dispatch] = useReducer(hashTableReducer, initialHashTableState);
  return (
    <HashTableContext.Provider value={{ state, dispatch }}>
      {children}
    </HashTableContext.Provider>
  );
};

export default HashTableProvider;
