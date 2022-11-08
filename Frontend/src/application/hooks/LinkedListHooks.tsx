import { useSnackbar, VariantType } from 'notistack';
import { RefObject, useEffect, useState } from 'react';
import { Node } from '../../application/dataStructures/interfaces/ILinkedList';
import { useLinkedList } from '../providers/LinkedListProvider';
import { LinkedListMethod } from '../reducers/linkedListReducer';

const useLinkedListHook = (linkedListRef: RefObject<HTMLDivElement>) => {
  const {
    dispatch,
    state: {
      data,
      paint: { type, index },
    },
  } = useLinkedList();
  const [setHead, setSetHead] = useState<string>('');
  const [setTail, setSetTail] = useState<string>('');
  const [insertVal, setInsertVal] = useState<string>('');
  const [insertIdx, setInsertIdx] = useState<string>('');
  const [remove, setRemove] = useState<string>('');
  const [contains, setContains] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const ref = linkedListRef.current;
    const isValidPaint: boolean = [
      LinkedListMethod.SetHead,
      LinkedListMethod.SetTail,
      LinkedListMethod.Insert,
    ].includes(type);
    if (
      ref &&
      ref.children[0].className === 'ds-item linked-list-item' &&
      isValidPaint
    ) {
      let linkedListValue: Element;
      let linkedListNext: Element;
      let idx: number;
      const secondClass: string = 'appear';
      if (type === LinkedListMethod.SetHead) {
        idx = 0;
      } else if (type === LinkedListMethod.SetTail) {
        idx = ref.children.length - 1;
      } else {
        idx = index!;
      }
      linkedListValue = ref.children[idx].children[0];
      linkedListNext = ref.children[idx].children[1].children[0];
      linkedListValue.setAttribute(
        'class',
        `ds-value linked-list-value ${secondClass}`
      );
      linkedListNext.setAttribute('class', `linked-list-next ${secondClass}`);
      setTimeout(() => {
        linkedListValue.setAttribute('class', 'ds-value linked-list-value');
        linkedListNext.setAttribute('class', 'linked-list-next');
      }, 800);
    }
  }, [linkedListRef, type, index]);

  const setHeadValue = (): void => {
    const value: string = setHead.trim();
    dispatch({
      type: LinkedListMethod.SetHead,
      payload: new Node(value),
    });
  };

  const setTailValue = (): void => {
    const value: string = setTail.trim();
    dispatch({
      type: LinkedListMethod.SetTail,
      payload: new Node(value),
    });
  };

  const insertValue = (): void => {
    const idx: string = insertIdx.trim();
    if (idx !== '') {
      const index: number = parseInt(idx);
      if (index >= 0 && index < data.toList().length) {
        const value: string = insertVal.trim();
        const nodeToInsert: Node<string> = new Node(value);
        dispatch({
          type: LinkedListMethod.Insert,
          payload: { index, nodeToInsert },
        });
      }
    }
  };

  const removeValue = (): void => {
    const value: string = remove.trim();
    if (data.contains(value)) {
      dispatch({
        type: LinkedListMethod.Remove,
        payload: value,
      });
    } else {
      enqueueSnackbar(`The value is not in the linked list!`, {
        variant: 'error',
      });
    }
  };

  const containsValue = (): void => {
    const value: string = contains.trim();
    const variantType: VariantType = data.contains(value) ? 'success' : 'error';
    const message: string = `Contains: ${data.contains(value).toString()}`;
    enqueueSnackbar(message, { variant: variantType });
    setContains('');
  };

  return {
    setHead,
    setSetHead,
    setHeadValue,
    setTail,
    setSetTail,
    setTailValue,
    insertIdx,
    setInsertIdx,
    insertVal,
    setInsertVal,
    insertValue,
    remove,
    setRemove,
    removeValue,
    contains,
    setContains,
    containsValue,
  };
};

export default useLinkedListHook;
