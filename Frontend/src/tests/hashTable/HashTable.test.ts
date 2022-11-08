import { HashTable } from '../../application/dataStructures/HashTable';

describe('enqueue', () => {
  let hashTable: HashTable<string, string>;

  beforeEach(() => {
    hashTable = new HashTable<string, string>();
    hashTable.values = new Map<string, string>([
      ['a', '1'],
      ['b', '2'],
      ['c', '3'],
    ]);
  });

  it('gets a value with key', () => {
    let result: string | undefined = hashTable.get('a');
    expect(result).toBe('1');
  });

  it('gets a value with invalid key', () => {
    let result: string | undefined = hashTable.get('d');
    expect(result).toBe(undefined);
  });
});

describe('set', () => {
  let hashTable: HashTable<string, string>;

  beforeEach(() => {
    hashTable = new HashTable<string, string>();
    hashTable.values = new Map<string, string>([
      ['a', '1'],
      ['b', '2'],
      ['c', '3'],
    ]);
  });

  it('sets a current value', () => {
    hashTable.set('a', '10');
    expect(hashTable.get('a')).toBe('10');
  });

  it('sets a new value', () => {
    hashTable.set('d', '4');
    expect(hashTable.get('d')).toBe('4');
  });
});

describe('remove', () => {
  let hashTable: HashTable<string, string>;

  beforeEach(() => {
    hashTable = new HashTable<string, string>();
    hashTable.values = new Map<string, string>([
      ['a', '1'],
      ['b', '2'],
      ['c', '3'],
    ]);
  });

  it('removes a value with key', () => {
    hashTable.remove('a');
    expect(hashTable.get('a')).toBe(undefined);
  });

  it('removes a value with invalid key', () => {
    hashTable.remove('d');
    expect(hashTable.values.size).toBe(3);
  });
});
