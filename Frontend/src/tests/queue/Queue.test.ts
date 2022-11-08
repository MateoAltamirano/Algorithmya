import { Queue } from '../../application/dataStructures/Queue';

describe('enqueue', () => {
  let queue: Queue<string>;

  beforeEach(() => {
    queue = new Queue<string>();
    queue.values = ['a', 'b', 'c'];
  });

  it('enqueues a value', () => {
    queue.enqueue('d');
    expect(queue.values[queue.values.length - 1]).toBe('d');
  });
});

describe('dequeue', () => {
  let queue: Queue<string>;

  beforeEach(() => {
    queue = new Queue<string>();
    queue.values = ['a', 'b', 'c'];
  });

  it('dequeues a value', () => {
    let result: string | undefined = queue.dequeue();
    expect(result).toBe('a');
  });

  it('dequeues a value when the queue is empty', () => {
    queue.values = [];
    let result: string | undefined = queue.dequeue();
    expect(result).toBe(undefined);
  });
});
