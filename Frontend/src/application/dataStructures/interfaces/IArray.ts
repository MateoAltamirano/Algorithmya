export default interface IArray<T> {
  values: T[];

  get(index: number): T;
  set(index: number, value: T): void;
  insert(value: T): void;
  remove(index: number): void;
}
