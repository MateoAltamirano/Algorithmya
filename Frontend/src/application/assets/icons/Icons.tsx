import { SVGProps } from 'react';
import { ReactComponent as Array } from './ArrayIcon.svg';
import { ReactComponent as BarMode } from './BarModeIcon.svg';
import { ReactComponent as Graph } from './GraphIcon.svg';
import { ReactComponent as HashTable } from './HashTableIcon.svg';
import { ReactComponent as LinkedList } from './LinkedListIcon.svg';
import { ReactComponent as Queue } from './QueueIcon.svg';
import { ReactComponent as Stack } from './StackIcon.svg';
import { ReactComponent as Home } from './HomeIcon.svg';
import { ReactComponent as Arrow } from './ArrowIcon.svg';
import { ReactComponent as Search } from './SearchIcon.svg';

const defaultProps = {
  height: '1.5rem',
  width: '1.5rem',
  stroke: 'whitesmoke',
  fill: 'whitesmoke',
};

export const ArrayIcon = (props: SVGProps<SVGSVGElement>) => {
  return <Array {...props} />;
};

export const BarModeIcon = (props: SVGProps<SVGSVGElement>) => {
  return <BarMode {...props} />;
};

export const GraphIcon = (props: SVGProps<SVGSVGElement>) => {
  return <Graph {...props} />;
};

export const HashTableIcon = (props: SVGProps<SVGSVGElement>) => {
  return <HashTable {...props} />;
};

export const LinkedListIcon = (props: SVGProps<SVGSVGElement>) => {
  return <LinkedList {...props} />;
};

export const QueueIcon = (props: SVGProps<SVGSVGElement>) => {
  return <Queue {...props} />;
};

export const StackIcon = (props: SVGProps<SVGSVGElement>) => {
  return <Stack {...props} />;
};

export const HomeIcon = (props: SVGProps<SVGSVGElement>) => {
  return <Home {...props} />;
};

export const ArrowIcon = (props: SVGProps<SVGSVGElement>) => {
  return <Arrow {...props} />;
};

export const SearchIcon = (props: SVGProps<SVGSVGElement>) => {
  return <Search {...props} />;
};

Array.defaultProps = defaultProps;
BarMode.defaultProps = defaultProps;
Graph.defaultProps = defaultProps;
HashTable.defaultProps = defaultProps;
LinkedList.defaultProps = defaultProps;
Queue.defaultProps = defaultProps;
Stack.defaultProps = defaultProps;
Home.defaultProps = defaultProps;
Arrow.defaultProps = defaultProps;
Search.defaultProps = defaultProps;
