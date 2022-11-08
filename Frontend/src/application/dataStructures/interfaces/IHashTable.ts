export default interface IHashTable<K, V> {
  values: Map<K, V>;

  get(key: K): V | undefined;
  set(key: K, value: V): void;
  remove(key: K): void;
}
