import { LinkedList } from '../dataStructures/LinkedList';
import { Node } from '../dataStructures/interfaces/ILinkedList';
import { ILinkedListState } from '../providers/LinkedListProvider';

export enum LinkedListMethod {
  SetHead,
  SetTail,
  Insert,
  Remove,
  Reset,
}

interface SetHead<T> {
  type: LinkedListMethod.SetHead;
  payload: Node<T>;
}

interface SetTail<T> {
  type: LinkedListMethod.SetTail;
  payload: Node<T>;
}

interface Insert<T> {
  type: LinkedListMethod.Insert;
  payload: { index: number; nodeToInsert: Node<T> };
}

interface Remove<T> {
  type: LinkedListMethod.Remove;
  payload: T;
}

interface Reset {
  type: LinkedListMethod.Reset;
}

export type LinkedListActions<T> =
  | SetHead<T>
  | SetTail<T>
  | Insert<T>
  | Remove<T>
  | Reset;

export const linkedListReducer = (
  state: ILinkedListState,
  action: LinkedListActions<string>
): ILinkedListState => {
  let data: LinkedList<string> = new LinkedList<string>();
  let index: number = 0;
  switch (action.type) {
    case LinkedListMethod.SetHead:
      data = state.data;
      data.setHead(action.payload);
      return { ...state, data, paint: { type: action.type, index: 0 } };
    case LinkedListMethod.SetTail:
      data = state.data;
      data.setTail(action.payload);
      index = data.toList().length;
      return { ...state, data, paint: { type: action.type, index } };
    case LinkedListMethod.Insert:
      data = state.data;
      const { index: idx, nodeToInsert } = action.payload;
      data.insertAt(idx, nodeToInsert);
      return { ...state, data, paint: { type: action.type, index: idx } };
    case LinkedListMethod.Remove:
      data = state.data;
      data.removeNodesWithValue(action.payload);
      return { ...state, data, paint: { type: action.type } };
    case LinkedListMethod.Reset:
      data = new LinkedList<string>();
      let paint = { type: LinkedListMethod.Remove };
      return { ...state, data, paint };
    default:
      return state;
  }
};
