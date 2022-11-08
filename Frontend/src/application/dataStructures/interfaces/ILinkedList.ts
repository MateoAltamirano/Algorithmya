export class Node<T> {
  value: T;
  next: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export default interface ILinkedList<T> {
  head: Node<T> | null;
  tail: Node<T> | null;

  setHead(node: Node<T>): void;
  setTail(node: Node<T>): void;
  insertBefore(node: Node<T>, nodeToInsert: Node<T>): void;
  insertAfter(node: Node<T>, nodeToInsert: Node<T>): void;
  insertAt(index: number, nodeToInsert: Node<T>): void;
  removeNodesWithValue(value: T): void;
  remove(node: Node<T>): void;
  removeNodeBindings(node: Node<T>): void;
  contains(value: T): boolean;
  toList(): Node<T>[];
}
