import IQueue from './interfaces/IQueue';

class Queue<T> implements IQueue<T> {
  public values: T[];
  public constructor() {
    this.values = [];
  }

  public enqueue(value: T): void {
    this.values.push(value);
  }
  public dequeue(): T | undefined {
    return this.values.shift();
  }
}

export { Queue };
