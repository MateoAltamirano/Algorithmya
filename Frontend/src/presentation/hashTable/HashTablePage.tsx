import { RefObject, useRef } from 'react';
import { ArrowIcon, HashTableIcon } from '../../application/assets/icons/Icons';
import EmptyDS from '../../application/components/EmptyDS';
import TextInput from '../../application/components/textInput/TextInput';
import useHashTableHook from '../../application/hooks/HashTableHooks';
import { useHashTable } from '../../application/providers/HashTableProvider';
import ModulesLayout from '../layout/ModulesLayout';
import './HashTable.css';

const HashTablePage = () => {
  const {
    state: { data },
  } = useHashTable();
  const hashTableRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const HashTable = () => {
    return (
      <div className="ds ds-vertical" ref={hashTableRef}>
        {data.values.size === 0 ? (
          <EmptyDS
            icon={
              <HashTableIcon
                width="10rem"
                height="10rem"
                stroke="lightgray"
                fill="lightgray"
              />
            }
            dsLabel={'hash table'}
          />
        ) : (
          Array.from(data.values).map(([key, value], idx) => (
            <div key={idx} className="ds-item">
              <div className="ds-value hash-table-key">{key}</div>
              <ArrowIcon
                fill="var(--color-secondary)"
                stroke="var(--color-secondary)"
                height="1rem"
                width="1rem"
              />
              <div className="hash-table-idx"></div>
              <div className="ds-value hash-table-value">{value}</div>
            </div>
          ))
        )}
      </div>
    );
  };

  const Methods = () => {
    const {
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
    } = useHashTableHook(hashTableRef);

    return (
      <div className="methods">
        <TextInput
          value={get}
          setValue={setGet}
          hasButton={true}
          buttonLabel={'Get'}
          placeholder={'Key'}
          buttonAction={getValue}
        />
        <TextInput
          value={setKey}
          setValue={setSetKey}
          hasButton={true}
          buttonLabel={'Set'}
          placeholder={'Key'}
          buttonAction={setValue}
          isDoubleInput={true}
          secondInputProps={{
            value: setVal,
            setValue: setSetVal,
            placeholder: 'Value',
          }}
        />
        <TextInput
          value={remove}
          setValue={setRemove}
          hasButton={true}
          buttonLabel={'Remove'}
          placeholder={'Key'}
          buttonAction={removeValue}
        />
      </div>
    );
  };

  return <ModulesLayout methods={<Methods />} dataStructure={<HashTable />} />;
};

export default HashTablePage;
