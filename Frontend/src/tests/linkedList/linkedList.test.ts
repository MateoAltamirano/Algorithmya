import { LinkedList } from '../../application/dataStructures/LinkedList';
import { Node } from '../../application/dataStructures/interfaces/ILinkedList';

describe('setHead', () => {
  let linkedList: LinkedList<string>;

  beforeEach(() => {
    linkedList = new LinkedList<string>();
  });

  it('sets the head of the linked list', () => {
    const head = new Node<string>('a');
    linkedList.setHead(head);
    expect(linkedList.head?.value).toBe('a');
  });
});

describe('setTail', () => {
  let linkedList: LinkedList<string>;

  beforeEach(() => {
    linkedList = new LinkedList<string>();
  });

  it('sets the tail of the linked list', () => {
    const tail = new Node<string>('a');
    linkedList.setTail(tail);
    expect(linkedList.tail?.value).toBe('a');
  });
});

describe('insertAt', () => {
  let linkedList: LinkedList<string>;

  beforeEach(() => {
    linkedList = new LinkedList<string>();
    linkedList.setHead(new Node<string>('a'));
    linkedList.setTail(new Node<string>('z'));
  });

  it('inserts a node in the specified index', () => {
    const node = new Node<string>('b');
    linkedList.insertAt(1, node);
    expect(linkedList.head?.next?.value).toBe('b');
  });
});

describe('removeValue', () => {
  let linkedList: LinkedList<string>;

  beforeEach(() => {
    linkedList = new LinkedList<string>();
    linkedList.setHead(new Node<string>('a'));
    linkedList.setTail(new Node<string>('z'));
  });

  it('removes a node with the specified value', () => {
    linkedList.removeNodesWithValue('a');
    expect(linkedList.head?.value).not.toBe('a');
  });
});

describe('contains', () => {
  let linkedList: LinkedList<string>;

  beforeEach(() => {
    linkedList = new LinkedList<string>();
    linkedList.setHead(new Node<string>('a'));
    linkedList.setTail(new Node<string>('z'));
  });

  it('checks if a existing node is in the list', () => {
    expect(linkedList.contains('a')).toBe(true);
  });

  it('checks if a non-existing node is in the list', () => {
    expect(linkedList.contains('b')).toBe(false);
  });
});
