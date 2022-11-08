import { Stack } from '../dataStructures/Stack';
import { IStackState } from '../providers/StackProvider';

export enum StackMethod {
  Push,
  Pop,
  Peek,
  Reset,
}

interface Push<T> {
  type: StackMethod.Push;
  payload: T;
}

interface Pop {
  type: StackMethod.Pop;
}

interface Peek {
  type: StackMethod.Peek;
}

interface Reset {
  type: StackMethod.Reset;
}

export type StackActions<T> = Push<T> | Pop | Peek | Reset;

export const stackReducer = (
  state: IStackState,
  action: StackActions<string>
): IStackState => {
  let data = new Stack<string>();
  switch (action.type) {
    case StackMethod.Push:
      data = state.data;
      data.push(action.payload);
      return { ...state, data, paint: { type: action.type } };
    case StackMethod.Pop:
      data = state.data;
      data.pop();
      return { ...state, data, paint: { type: action.type } };
    case StackMethod.Peek:
      data = state.data;
      return { ...state, data, paint: { type: action.type } };
    case StackMethod.Reset:
      data = new Stack<string>();
      let paint = { type: StackMethod.Pop };
      return { ...state, data, paint };
    default:
      return state;
  }
};
