import { Stack } from '../../application/dataStructures/Stack';

describe('push', () => {
  let stack: Stack<string>;

  beforeEach(() => {
    stack = new Stack<string>();
    stack.values = ['a', 'b', 'c'];
  });

  it('pushes a value', () => {
    stack.push('d');
    expect(stack.values[stack.values.length - 1]).toContain('d');
  });
});

describe('pop', () => {
  let stack: Stack<string>;

  beforeEach(() => {
    stack = new Stack<string>();
    stack.values = ['a', 'b', 'c'];
  });

  it('pops a value', () => {
    let result: string | undefined = stack.pop();
    expect(result).toBe('c');
  });

  it('pops a value when the stack is empty', () => {
    stack.values = [];
    let result: string | undefined = stack.pop();
    expect(result).toBe(undefined);
  });
});
