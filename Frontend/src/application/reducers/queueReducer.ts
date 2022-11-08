import { Queue } from '../dataStructures/Queue';
import { IQueueState } from '../providers/QueueProvider';

export enum QueueMethod {
  Enqueue,
  Dequeue,
  Peek,
  Reset,
}

interface Enqueue<T> {
  type: QueueMethod.Enqueue;
  payload: T;
}

interface Dequeue {
  type: QueueMethod.Dequeue;
}

interface Peek {
  type: QueueMethod.Peek;
}

interface Reset {
  type: QueueMethod.Reset;
}

export type QueueActions<T> = Enqueue<T> | Dequeue | Peek | Reset;

export const queueReducer = (
  state: IQueueState,
  action: QueueActions<string>
): IQueueState => {
  let data = new Queue<string>();
  switch (action.type) {
    case QueueMethod.Enqueue:
      data = state.data;
      data.enqueue(action.payload);
      return { ...state, data, paint: { type: action.type } };
    case QueueMethod.Dequeue:
      data = state.data;
      data.dequeue();
      return { ...state, data, paint: { type: action.type } };
    case QueueMethod.Peek:
      data = state.data;
      return { ...state, data, paint: { type: action.type } };
    case QueueMethod.Reset:
      data = new Queue<string>();
      let paint = { type: QueueMethod.Dequeue };
      return { ...state, data, paint };
    default:
      return state;
  }
};
