export default interface IQueue<T> {
  values: T[];

  enqueue(value: T): void;
  dequeue(): T | undefined;
}
