import { RefObject, useEffect, useState } from 'react';
import { useStack } from '../providers/StackProvider';
import { StackMethod } from '../reducers/stackReducer';

const useStackHook = (stackRef: RefObject<HTMLDivElement>) => {
  const {
    dispatch,
    state: {
      paint: { type },
    },
  } = useStack();
  const [push, setPush] = useState<string>('');

  useEffect(() => {
    const ref = stackRef.current;
    const isValidPaint: boolean = type !== StackMethod.Pop;
    if (ref && ref.children[0].className === 'ds-item' && isValidPaint) {
      let stackValue: Element;
      const idx: number = ref.children.length - 1;
      stackValue = ref.children[idx].children[0];
      stackValue.setAttribute('class', 'ds-value simple stack-value appear');
      setTimeout(() => {
        stackValue.setAttribute('class', 'ds-value simple stack-value');
      }, 800);
    }
  }, [stackRef, type]);
  const pushValue = (): void => {
    const value: string = push.trim();
    dispatch({ type: StackMethod.Push, payload: value });
  };

  const popValue = (): void => {
    dispatch({ type: StackMethod.Peek });
    setTimeout(() => {
      dispatch({ type: StackMethod.Pop });
    }, 800);
  };

  return {
    push,
    setPush,
    pushValue,
    popValue,
  };
};

export default useStackHook;
