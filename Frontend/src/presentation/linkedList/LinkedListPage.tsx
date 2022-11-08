import { RefObject, useRef } from 'react';
import {
  ArrowIcon,
  LinkedListIcon,
} from '../../application/assets/icons/Icons';
import EmptyDS from '../../application/components/EmptyDS';
import TextInput from '../../application/components/textInput/TextInput';
import useLinkedListHook from '../../application/hooks/LinkedListHooks';
import { useLinkedList } from '../../application/providers/LinkedListProvider';
import ModulesLayout from '../layout/ModulesLayout';
import './LinkedList.css';

const LinkedListPage = () => {
  const {
    state: { data },
  } = useLinkedList();
  const linkedListRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const LinkedList = () => {
    return (
      <div className="ds ds-horizontal" ref={linkedListRef}>
        {data.toList().length === 0 ? (
          <EmptyDS
            icon={
              <LinkedListIcon
                width="10rem"
                height="10rem"
                stroke="lightgray"
                fill="lightgray"
              />
            }
            dsLabel={'linked list'}
          />
        ) : (
          data.toList().map((node, idx) => (
            <div key={idx} className="ds-item linked-list-item">
              <div className="ds-value linked-list-value">{node.value}</div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div className="linked-list-next"></div>
                <div className="linked-list-next-pointer">
                  {idx < data.toList().length - 1 ? (
                    <ArrowIcon
                      fill="var(--color-secondary)"
                      stroke="var(--color-secondary)"
                      height="1rem"
                      width="1rem"
                    />
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  const Methods = () => {
    const {
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
    } = useLinkedListHook(linkedListRef);

    return (
      <div className="methods">
        <TextInput
          value={setHead}
          setValue={setSetHead}
          hasButton={true}
          buttonLabel={'Set Head'}
          placeholder={'Value'}
          buttonAction={setHeadValue}
        />
        <TextInput
          value={setTail}
          setValue={setSetTail}
          hasButton={true}
          buttonLabel={'Set Tail'}
          placeholder={'Value'}
          buttonAction={setTailValue}
        />
        <TextInput
          value={insertIdx}
          setValue={setInsertIdx}
          hasButton={true}
          buttonLabel={'Insert'}
          placeholder={'Index'}
          type={'number'}
          buttonAction={insertValue}
          isDoubleInput={true}
          secondInputProps={{
            value: insertVal,
            setValue: setInsertVal,
            placeholder: 'Value',
          }}
        />
        <TextInput
          value={remove}
          setValue={setRemove}
          hasButton={true}
          buttonLabel={'Remove'}
          placeholder={'Value'}
          buttonAction={removeValue}
        />
        <TextInput
          value={contains}
          setValue={setContains}
          hasButton={true}
          buttonLabel={'Contains'}
          placeholder={'Value'}
          buttonAction={containsValue}
        />
      </div>
    );
  };

  return <ModulesLayout methods={<Methods />} dataStructure={<LinkedList />} />;
};

export default LinkedListPage;
