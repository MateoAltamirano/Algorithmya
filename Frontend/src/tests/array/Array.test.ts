import { Array } from '../../application/dataStructures/Array';

describe('get', () => {
  let array: Array<string>;

  beforeEach(() => {
    array = new Array<string>();
    array.values = ['a', 'b', 'c'];
  });

  it('gets the first value', () => {
    let result: string = array.get(0);
    expect(result).toBe('a');
  });

  it('gets a value', () => {
    let result: string = array.get(1);
    expect(result).toBe('b');
  });

  it('gets the last value', () => {
    let result: string = array.get(array.values.length - 1);
    expect(result).toBe('c');
  });

  it('gets an undefined value', () => {
    let result: string = array.get(-10);
    expect(result).toBe(undefined);
  });
});

describe('set', () => {
  let array: Array<string>;

  beforeEach(() => {
    array = new Array<string>();
    array.values = ['a', 'b', 'c'];
  });

  it('sets the first value', () => {
    array.set(0, 'd');
    expect(array.values[0]).toBe('d');
  });

  it('sets a value', () => {
    array.set(1, 'd');
    expect(array.values[1]).toBe('d');
  });

  it('sets the last value', () => {
    array.set(array.values.length - 1, 'd');
    expect(array.values[array.values.length - 1]).toBe('d');
  });
});

describe('insert', () => {
  let array: Array<string>;

  beforeEach(() => {
    array = new Array<string>();
    array.values = ['a', 'b', 'c'];
  });

  it('inserts a value', () => {
    array.insert('d');
    expect(array.values).toContain('d');
  });
});

describe('remove', () => {
  let array: Array<string>;

  beforeEach(() => {
    array = new Array<string>();
    array.values = ['a', 'b', 'c'];
  });

  it('removes a value', () => {
    array.remove(0);
    expect(array.values).not.toContain('a');
  });

  it('removes an invalid index', () => {
    array.remove(10);
    expect(array.values).toContain('a');
  });
});
