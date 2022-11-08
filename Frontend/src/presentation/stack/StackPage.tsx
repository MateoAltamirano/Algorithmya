import { Button } from '@material-ui/core';
import { RefObject, useRef } from 'react';
import { StackIcon } from '../../application/assets/icons/Icons';
import EmptyDS from '../../application/components/EmptyDS';
import TextInput from '../../application/components/textInput/TextInput';
import useStackHook from '../../application/hooks/StackHooks';
import { useStack } from '../../application/providers/StackProvider';
import ModulesLayout from '../layout/ModulesLayout';
import { useStyles } from '../theme';
import './Stack.css';

const StackPage = () => {
  const classes = useStyles();
  const {
    state: { data },
  } = useStack();
  const stackRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const Stack = () => {
    return (
      <div className="ds ds-vertical" ref={stackRef}>
        {data.values.length === 0 ? (
          <EmptyDS
            icon={
              <StackIcon
                width="10rem"
                height="10rem"
                stroke="lightgray"
                fill="lightgray"
              />
            }
            dsLabel={'stack'}
          />
        ) : (
          data.values.map((value, idx) => (
            <div style={{ gridRowStart: -idx }} key={idx} className="ds-item">
              <div className="ds-value simple stack-value">{value}</div>
            </div>
          ))
        )}
      </div>
    );
  };

  const Methods = () => {
    const { push, setPush, pushValue, popValue } = useStackHook(stackRef);

    return (
      <div className="methods">
        <TextInput
          value={push}
          setValue={setPush}
          hasButton={true}
          buttonLabel={'Push'}
          placeholder={'Value'}
          buttonAction={pushValue}
        />
        <Button
          style={{ marginTop: '4px' }}
          className={classes.button}
          onClick={popValue}
        >
          Pop
        </Button>
      </div>
    );
  };

  return <ModulesLayout methods={<Methods />} dataStructure={<Stack />} />;
};

export default StackPage;
