import { useSnackbar } from 'notistack';
import { RefObject, useEffect, useState } from 'react';
import { useArray } from '../providers/ArrayProvider';
import { ArrayMethod } from '../reducers/arrayReducer';

const useArrayHook = (arrayRef: RefObject<HTMLDivElement>) => {
  const {
    dispatch,
    state: {
      data,
      paint: { type, index },
    },
  } = useArray();
  const [get, setGet] = useState<string>('');
  const [setIdx, setSetIdx] = useState<string>('');
  const [setVal, setSetVal] = useState<string>('');
  const [insert, setInsert] = useState<string>('');
  const [remove, setRemove] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const ref = arrayRef.current;
    const isValidPaint: boolean = type !== ArrayMethod.Remove;
    if (
      ref &&
      ref.children[0].className === 'ds-item array-item' &&
      isValidPaint
    ) {
      let arrayValue: Element;
      let idx: number;
      let secondClass: string;

      if (type === ArrayMethod.Insert) {
        idx = ref.children.length - 1;
        secondClass = 'appear';
      } else {
        idx = index!;
        secondClass = 'select';
      }
      arrayValue = ref.children[idx].children[0];
      arrayValue.setAttribute(
        'class',
        `ds-value simple array-value ${secondClass}`
      );
      setTimeout(() => {
        arrayValue.setAttribute('class', 'ds-value simple array-value');
      }, 800);
    }
  }, [arrayRef, type, index]);

  const getValue = (): void => {
    const idx: string = get.trim();
    if (idx !== '') {
      const index: number = parseInt(idx);
      if (index >= 0 && index < data.values.length) {
        dispatch({
          type: ArrayMethod.Get,
          payload: index,
        });
      }
    }
  };

  const setValue = (): void => {
    const idx: string = setIdx.trim();
    if (idx !== '') {
      const index: number = parseInt(idx);
      if (index >= 0 && index < data.values.length) {
        const value: string = setVal.trim();
        dispatch({
          type: ArrayMethod.Set,
          payload: { index, value },
        });
      }
    }
  };

  const insertValue = (): void => {
    const value: string = insert.trim();
    dispatch({ type: ArrayMethod.Insert, payload: value });
  };

  const removeValue = (): void => {
    const idx: string = remove.trim();
    if (idx !== '') {
      const index: number = parseInt(idx);
      if (index >= 0 && index < data.values.length) {
        dispatch({
          type: ArrayMethod.Get,
          payload: index,
        });
        setTimeout(() => {
          dispatch({ type: ArrayMethod.Remove, payload: index });
        }, 800);
      } else {
        enqueueSnackbar('The index is out of bounds!', { variant: 'error' });
      }
    }
  };

  const length = (): void => {
    let message: string = `Length: ${data.values.length}`;
    enqueueSnackbar(message, { variant: 'success' });
  };

  return {
    get,
    setGet,
    getValue,
    setIdx,
    setSetIdx,
    setVal,
    setSetVal,
    setValue,
    insert,
    setInsert,
    insertValue,
    remove,
    setRemove,
    removeValue,
    length,
  };
};

export default useArrayHook;
