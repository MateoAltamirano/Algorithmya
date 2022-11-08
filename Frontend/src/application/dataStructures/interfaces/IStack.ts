export default interface IStack<T> {
  values: T[];

  push(value: T): void;
  pop(): T | undefined;
}
