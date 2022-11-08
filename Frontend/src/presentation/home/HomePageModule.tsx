import { Button } from '@material-ui/core';
import { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { useArray } from '../../application/providers/ArrayProvider';
import { useGraph } from '../../application/providers/GraphProvider';
import { useHashTable } from '../../application/providers/HashTableProvider';
import { useLinkedList } from '../../application/providers/LinkedListProvider';
import { useQueue } from '../../application/providers/QueueProvider';
import { useStack } from '../../application/providers/StackProvider';
import { useUser } from '../../application/providers/UserProvider';
import { useStyles } from '../theme';

type HomePageModuleProps = {
  label: string;
  color: string;
  route: string;
  idx: number;
};

const HomePageModuleIcons = (key: string): ReactNode => {
  const {
    state: { icon: arrayIcon },
  } = useArray();
  const {
    state: { icon: stackIcon },
  } = useStack();
  const {
    state: { icon: queueIcon },
  } = useQueue();
  const {
    state: { icon: linkedListIcon },
  } = useLinkedList();
  const {
    state: { icon: hashTableIcon },
  } = useHashTable();
  const {
    state: { icon: graphIcon },
  } = useGraph();
  const icons: { [key: string]: ReactNode } = {
    Array: arrayIcon,
    Stack: stackIcon,
    Queue: queueIcon,
    LinkedList: linkedListIcon,
    HashTable: hashTableIcon,
    Graph: graphIcon,
  };
  return icons[key];
};

const HomePageModuleDescription = (key: string): ReactNode => {
  const {
    state: { dataStructures },
  } = useUser();
  const descriptions: { [key: string]: string } = {};
  dataStructures.forEach((dataStructure) => {
    const { name, description } = dataStructure;
    descriptions[name] = description;
  });
  return descriptions[key];
};

const HomePageModule = ({ color, label, route, idx }: HomePageModuleProps) => {
  const classes = useStyles();
  const history = useHistory();

  const handleTryItClick = (route: string, idx: number): void => {
    history.push(route, idx);
  };

  return (
    <div className="home-page-module">
      <div className="module-content">
        <div className="module-front">
          <div
            style={{ backgroundColor: `var(--color-${color})` }}
            className="module-front-icon"
          >
            {HomePageModuleIcons(label)}
          </div>
          <div className="module-label">{label}</div>
        </div>
        <div className="module-back">
          <div
            style={{ backgroundColor: `var(--color-${color})` }}
            className="module-back-summary"
          >
            {HomePageModuleDescription(label)}
          </div>
          <Button
            className={classes.button}
            onClick={() => handleTryItClick(route, idx)}
          >
            Try it!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePageModule;
