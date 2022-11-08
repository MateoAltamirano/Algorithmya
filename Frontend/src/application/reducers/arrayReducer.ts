import { Array } from '../dataStructures/Array';
import { IArrayState } from '../providers/ArrayProvider';

export enum ArrayMethod {
  Get,
  Set,
  Insert,
  Remove,
  Reset,
}

interface Get {
  type: ArrayMethod.Get;
  payload: number;
}

interface Set<T> {
  type: ArrayMethod.Set;
  payload: { index: number; value: T };
}

interface Insert<T> {
  type: ArrayMethod.Insert;
  payload: T;
}

interface Remove {
  type: ArrayMethod.Remove;
  payload: number;
}

interface Reset {
  type: ArrayMethod.Reset;
}

export type ArrayActions<T> = Get | Set<T> | Insert<T> | Remove | Reset;

export const arrayReducer = (
  state: IArrayState,
  action: ArrayActions<string>
): IArrayState => {
  let data: Array<string> = new Array<string>();
  let index: number = 0;
  switch (action.type) {
    case ArrayMethod.Get:
      index = action.payload;
      return { ...state, paint: { type: action.type, index } };
    case ArrayMethod.Set:
      data = state.data;
      index = action.payload.index;
      data.set(index, action.payload.value);
      return { ...state, data, paint: { type: action.type, index } };
    case ArrayMethod.Insert:
      data = state.data;
      index = state.data.values.length;
      data.insert(action.payload);
      return { ...state, data, paint: { type: action.type, index } };
    case ArrayMethod.Remove:
      data = state.data;
      data.remove(action.payload);
      return { ...state, data, paint: { type: action.type, index } };
    case ArrayMethod.Reset:
      data = new Array<string>();
      let paint = { type: ArrayMethod.Remove };
      return { ...state, data, paint };
    default:
      return state;
  }
};
