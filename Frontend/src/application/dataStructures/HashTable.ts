import IHashTable from './interfaces/IHashTable';

class HashTable<K, V> implements IHashTable<K, V> {
  public values: Map<K, V>;
  constructor() {
    this.values = new Map<K, V>();
  }

  public get(key: K): V | undefined {
    return this.values.get(key);
  }
  public set(key: K, value: V): void {
    this.values.set(key, value);
  }
  public remove(key: K): void {
    this.values.delete(key);
  }
}

export { HashTable };
