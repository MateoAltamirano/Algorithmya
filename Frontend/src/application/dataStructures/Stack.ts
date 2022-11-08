import IStack from './interfaces/IStack';

class Stack<T> implements IStack<T> {
  public values: T[];
  public constructor() {
    this.values = [];
  }

  public push(value: T): void {
    this.values.push(value);
  }
  public pop(): T | undefined {
    return this.values.pop();
  }
}

export { Stack };
