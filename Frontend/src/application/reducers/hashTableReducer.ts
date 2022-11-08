import { HashTable } from '../dataStructures/HashTable';
import { IHashTableState } from '../providers/HashTableProvider';

export enum HashTableMethod {
  Get,
  Set,
  Remove,
  Reset,
}

interface Get<K> {
  type: HashTableMethod.Get;
  payload: K;
}

interface Set<K, V> {
  type: HashTableMethod.Set;
  payload: { key: K; value: V };
}

interface Remove<K> {
  type: HashTableMethod.Remove;
  payload: K;
}

interface Reset {
  type: HashTableMethod.Reset;
}

export type HashTableActions<K, V> = Get<K> | Set<K, V> | Remove<K> | Reset;

export const hashTableReducer = (
  state: IHashTableState,
  action: HashTableActions<string, string>
): IHashTableState => {
  let data: HashTable<string, string> = new HashTable<string, string>();
  let index: number = 0;
  switch (action.type) {
    case HashTableMethod.Get:
      data = state.data;
      index = getIdxFromKey(data, action.payload);
      return { ...state, paint: { type: action.type, index } };
    case HashTableMethod.Set:
      data = state.data;
      const key: string = action.payload.key;
      const value: string = action.payload.value;
      data.set(key, value);
      index = getIdxFromKey(data, key);
      return { ...state, data, paint: { type: action.type, index } };
    case HashTableMethod.Remove:
      data = state.data;
      data.remove(action.payload);
      index = getIdxFromKey(data, action.payload);
      return { ...state, data, paint: { type: action.type, index } };
    case HashTableMethod.Reset:
      data = new HashTable<string, string>();
      let paint = { type: HashTableMethod.Remove };
      return { ...state, data, paint };
    default:
      return state;
  }
};

const getIdxFromKey = (data: HashTable<string, string>, keyToFind: string) => {
  let idx = 0;
  for (const key of data.values.keys()) {
    if (key === keyToFind) break;
    idx++;
  }
  return idx;
};
