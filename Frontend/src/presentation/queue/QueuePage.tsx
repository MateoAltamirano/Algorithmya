import { Button } from '@material-ui/core';
import { RefObject, useRef } from 'react';
import { QueueIcon } from '../../application/assets/icons/Icons';
import EmptyDS from '../../application/components/EmptyDS';
import TextInput from '../../application/components/textInput/TextInput';
import useQueueHook from '../../application/hooks/QueueHooks';
import { useQueue } from '../../application/providers/QueueProvider';
import ModulesLayout from '../layout/ModulesLayout';
import { useStyles } from '../theme';
import './Queue.css';

const QueuePage = () => {
  const classes = useStyles();
  const {
    state: { data },
  } = useQueue();
  const queueRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const Queue = () => {
    return (
      <div className="ds ds-horizontal" ref={queueRef}>
        {data.values.length === 0 ? (
          <EmptyDS
            icon={
              <QueueIcon
                width="10rem"
                height="10rem"
                stroke="lightgray"
                fill="lightgray"
              />
            }
            dsLabel={'queue'}
          />
        ) : (
          data.values.map((value, idx) => (
            <div key={idx} className="ds-item">
              <div className="ds-value simple queue-value">{value}</div>
            </div>
          ))
        )}
      </div>
    );
  };

  const Methods = () => {
    const { enqueue, setEnqueue, enqueueValue, dequeueValue } =
      useQueueHook(queueRef);

    return (
      <div className="methods">
        <TextInput
          value={enqueue}
          setValue={setEnqueue}
          hasButton={true}
          buttonLabel={'Enqueue'}
          placeholder={'Value'}
          buttonAction={enqueueValue}
        />
        <Button
          style={{ marginTop: '4px' }}
          className={classes.button}
          onClick={dequeueValue}
        >
          Dequeue
        </Button>
      </div>
    );
  };

  return <ModulesLayout methods={<Methods />} dataStructure={<Queue />} />;
};

export default QueuePage;
