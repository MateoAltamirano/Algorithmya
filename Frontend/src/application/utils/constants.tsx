import { ReactNode } from 'react';
import {
  ArrayIcon,
  GraphIcon,
  HashTableIcon,
  HomeIcon,
  LinkedListIcon,
  QueueIcon,
  StackIcon,
} from '../assets/icons/Icons';

type AlgorithmyaModuleProps = {
  text: string;
  route: string;
  icon: ReactNode;
  color: string;
  isPrivate: boolean;
};

const ALGORITHMYA_MODULES: AlgorithmyaModuleProps[] = [
  {
    text: 'Home',
    route: '',
    icon: <HomeIcon />,
    color: '',
    isPrivate: false,
  },
  {
    text: 'Array',
    route: 'array',
    icon: <ArrayIcon />,
    color: 'red',
    isPrivate: true,
  },
  {
    text: 'Stack',
    route: 'stack',
    icon: <StackIcon />,
    color: 'orange',
    isPrivate: true,
  },
  {
    text: 'Queue',
    route: 'queue',
    icon: <QueueIcon />,
    color: 'yellow',
    isPrivate: true,
  },
  {
    text: 'LinkedList',
    route: 'linked-list',
    icon: <LinkedListIcon />,
    color: 'green',
    isPrivate: true,
  },
  {
    text: 'HashTable',
    route: 'hash-table',
    icon: <HashTableIcon />,
    color: 'blue',
    isPrivate: true,
  },
  {
    text: 'Graph',
    route: 'graph',
    icon: <GraphIcon />,
    color: 'purple',
    isPrivate: true,
  },
];

const DRAWER_WIDTH = 160;
const APP_BAR_HEIGHT = 64;

export { ALGORITHMYA_MODULES, DRAWER_WIDTH, APP_BAR_HEIGHT };
