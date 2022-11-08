import { RefObject, useEffect, useState } from 'react';
import { useQueue } from '../providers/QueueProvider';
import { QueueMethod } from '../reducers/queueReducer';

const useQueueHook = (queueRef: RefObject<HTMLDivElement>) => {
  const {
    dispatch,
    state: {
      paint: { type },
    },
  } = useQueue();
  const [enqueue, setEnqueue] = useState<string>('');

  useEffect(() => {
    const ref = queueRef.current;
    const isValidPaint: boolean = type !== QueueMethod.Dequeue;
    if (ref && ref.children[0].className === 'ds-item' && isValidPaint) {
      let queueValue: Element;
      const idx: number =
        type === QueueMethod.Peek ? 0 : ref.children.length - 1;
      queueValue = ref.children[idx].children[0];
      queueValue.setAttribute('class', 'ds-value simple queue-value appear');
      setTimeout(() => {
        queueValue.setAttribute('class', 'ds-value simple queue-value');
      }, 800);
    }
  }, [queueRef, type]);

  const enqueueValue = (): void => {
    const value: string = enqueue.trim();
    dispatch({ type: QueueMethod.Enqueue, payload: value });
  };

  const dequeueValue = (): void => {
    dispatch({ type: QueueMethod.Peek });
    setTimeout(() => {
      dispatch({ type: QueueMethod.Dequeue });
    }, 800);
  };

  return {
    enqueue,
    setEnqueue,
    enqueueValue,
    dequeueValue,
  };
};

export default useQueueHook;
