import { Button } from '@material-ui/core';
import { RefObject, useRef } from 'react';
import { ArrayIcon } from '../../application/assets/icons/Icons';
import EmptyDS from '../../application/components/EmptyDS';
import TextInput from '../../application/components/textInput/TextInput';
import useArrayHook from '../../application/hooks/ArrayHooks';
import { useArray } from '../../application/providers/ArrayProvider';
import ModulesLayout from '../layout/ModulesLayout';
import { useStyles } from '../theme';
import './Array.css';

const ArrayPage = () => {
  const classes = useStyles();
  const {
    state: { data },
  } = useArray();
  const arrayRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const Array = () => {
    return (
      <div className="ds ds-horizontal" ref={arrayRef}>
        {data.values.length === 0 ? (
          <EmptyDS
            icon={
              <ArrayIcon
                width="10rem"
                height="10rem"
                stroke="lightgray"
                fill="lightgray"
              />
            }
            dsLabel={'array'}
          />
        ) : (
          data.values.map((value, idx) => (
            <div key={idx} className="ds-item array-item">
              <div className="ds-value simple array-value">{value}</div>
              <div className="array-idx">{idx}</div>
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
      setIdx,
      setSetIdx,
      setValue,
      setVal,
      setSetVal,
      insert,
      setInsert,
      insertValue,
      remove,
      setRemove,
      removeValue,
      length,
    } = useArrayHook(arrayRef);

    return (
      <div className="methods">
        <TextInput
          value={get}
          setValue={setGet}
          hasButton={true}
          buttonLabel={'Get'}
          placeholder={'Index'}
          type={'number'}
          buttonAction={getValue}
        />
        <TextInput
          value={setIdx}
          setValue={setSetIdx}
          hasButton={true}
          buttonLabel={'Set'}
          placeholder={'Index'}
          type={'number'}
          buttonAction={setValue}
          isDoubleInput={true}
          secondInputProps={{
            value: setVal,
            setValue: setSetVal,
            placeholder: 'Value',
          }}
        />
        <TextInput
          value={insert}
          setValue={setInsert}
          hasButton={true}
          buttonLabel={'Insert'}
          placeholder={'Value'}
          buttonAction={insertValue}
        />
        <TextInput
          value={remove}
          setValue={setRemove}
          hasButton={true}
          buttonLabel={'Remove'}
          placeholder={'Index'}
          type={'number'}
          buttonAction={removeValue}
        />
        <Button
          style={{ marginTop: '4px' }}
          className={classes.button}
          onClick={length}
        >
          Length
        </Button>
      </div>
    );
  };

  return <ModulesLayout methods={<Methods />} dataStructure={<Array />} />;
};

export default ArrayPage;
