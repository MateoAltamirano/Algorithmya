import { useSnackbar } from 'notistack';
import { RefObject, useEffect, useState } from 'react';
import { useHashTable } from '../providers/HashTableProvider';
import { HashTableMethod } from '../reducers/hashTableReducer';

const useHashTableHook = (hashTableRef: RefObject<HTMLDivElement>) => {
  const {
    dispatch,
    state: {
      data,
      paint: { type, index },
    },
  } = useHashTable();
  const [get, setGet] = useState<string>('');
  const [setKey, setSetKey] = useState<string>('');
  const [setVal, setSetVal] = useState<string>('');
  const [remove, setRemove] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const ref = hashTableRef.current;
    const isValidPaint: boolean = [
      HashTableMethod.Get,
      HashTableMethod.Set,
    ].includes(type);
    if (ref && ref.children[0].className === 'ds-item' && isValidPaint) {
      let hashTableKey: Element;
      let hashTableIdx: Element;
      let hashTableValue: Element;
      let secondClass: string;
      let idx: number = index!;
      if (type === HashTableMethod.Set) {
        secondClass = 'appear';
      } else {
        secondClass = 'select';
      }
      hashTableKey = ref.children[idx].children[0];
      hashTableIdx = ref.children[idx].children[2];
      hashTableValue = ref.children[idx].children[3];
      hashTableKey.setAttribute(
        'class',
        `ds-value hash-table-key ${secondClass}`
      );
      hashTableIdx.setAttribute('class', `hash-table-idx ${secondClass}`);
      hashTableValue.setAttribute(
        'class',
        `ds-value hash-table-value ${secondClass}`
      );
      setTimeout(() => {
        hashTableKey.setAttribute('class', 'ds-value hash-table-key');
        hashTableIdx.setAttribute('class', 'hash-table-idx');
        hashTableValue.setAttribute('class', 'ds-value hash-table-value');
      }, 800);
    }
  }, [hashTableRef, type, index]);

  const getValue = (): void => {
    const key: string = get.trim();
    if (data.values.has(key)) {
      dispatch({
        type: HashTableMethod.Get,
        payload: key,
      });
    }
  };

  const setValue = (): void => {
    const key: string = setKey.trim();
    const value: string = setVal.trim();
    dispatch({ type: HashTableMethod.Set, payload: { key, value } });
  };

  const removeValue = (): void => {
    const key: string = remove.trim();
    if (data.values.has(key)) {
      dispatch({
        type: HashTableMethod.Get,
        payload: key,
      });
      setTimeout(() => {
        dispatch({ type: HashTableMethod.Remove, payload: key });
      }, 800);
    } else {
      enqueueSnackbar('The key is not in the hash table!', {
        variant: 'error',
      });
    }
  };

  return {
    get,
    setGet,
    getValue,
    setKey,
    setSetKey,
    setVal,
    setSetVal,
    setValue,
    remove,
    setRemove,
    removeValue,
  };
};

export default useHashTableHook;
