import IArray from './interfaces/IArray';

class Array<T> implements IArray<T> {
  public values: T[];
  public constructor() {
    this.values = [];
  }

  public get(index: number): T {
    return this.values[index];
  }
  public set(index: number, value: T): void {
    this.values[index] = value;
  }
  public insert(value: T): void {
    this.values.push(value);
  }
  public remove(index: number): void {
    this.values.splice(index, 1);
  }
}

export { Array };
