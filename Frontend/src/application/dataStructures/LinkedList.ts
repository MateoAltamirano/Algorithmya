import ILinkedList, { Node } from './interfaces/ILinkedList';

class LinkedList<T> implements ILinkedList<T> {
  public head: Node<T> | null;
  public tail: Node<T> | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  public setHead(node: Node<T>): void {
    if (this.head === null) {
      this.head = node;
      this.tail = node;
      return;
    }
    this.insertBefore(this.head, node);
  }

  public setTail(node: Node<T>): void {
    if (this.tail === null) {
      this.setHead(node);
      return;
    }
    this.insertAfter(this.tail, node);
  }

  public insertBefore(node: Node<T>, nodeToInsert: Node<T>): void {
    if (nodeToInsert === this.head && nodeToInsert === this.tail) return;
    this.remove(nodeToInsert);
    nodeToInsert.next = node;
    let currentNode: Node<T> | null = this.head;
    while (currentNode?.next && currentNode.next !== node) {
      currentNode = currentNode.next;
    }
    if (node === this.head) {
      this.head = nodeToInsert;
    } else {
      currentNode!.next = nodeToInsert;
    }
    currentNode = nodeToInsert;
  }

  public insertAfter(node: Node<T>, nodeToInsert: Node<T>): void {
    if (nodeToInsert === this.head && nodeToInsert === this.tail) return;
    this.remove(nodeToInsert);
    nodeToInsert.next = node.next;
    if (node.next === null) {
      this.tail = nodeToInsert;
    }
    node.next = nodeToInsert;
  }

  public insertAt(index: number, nodeToInsert: Node<T>): void {
    if (index === 0) {
      this.setHead(nodeToInsert);
      return;
    }
    let currentNode: Node<T> | null = this.head;
    let currentIdx: number = 0;
    while (currentNode && currentIdx !== index) {
      currentNode = currentNode.next;
      currentIdx++;
    }
    if (currentNode) {
      this.insertBefore(currentNode, nodeToInsert);
    } else {
      this.setTail(nodeToInsert);
    }
  }

  public removeNodesWithValue(value: T): void {
    let currentNode: Node<T> | null = this.head;
    while (currentNode) {
      const nodeToRemove: Node<T> | null = currentNode;
      currentNode = currentNode.next;
      if (nodeToRemove.value === value) this.remove(nodeToRemove);
    }
  }

  public remove(node: Node<T>): void {
    if (node === this.head) this.head = this.head.next;
    let currentNode: Node<T> | null = this.head;
    while (currentNode?.next && currentNode.next !== this.tail)
      currentNode = currentNode.next;
    if (node === this.tail) this.tail = currentNode;
    this.removeNodeBindings(node);
  }

  public removeNodeBindings(node: Node<T>): void {
    let currentNode: Node<T> | null = this.head;
    while (currentNode && currentNode.next !== node)
      currentNode = currentNode.next;
    if (currentNode?.next) currentNode.next = node.next;
    node.next = null;
  }

  public contains(value: T): boolean {
    let currentNode: Node<T> | null = this.head;
    while (currentNode && currentNode.value !== value)
      currentNode = currentNode.next;
    return currentNode !== null;
  }

  public toList(): Node<T>[] {
    let currentNode: Node<T> | null = this.head;
    const listOfNodes: Node<T>[] = [];
    while (currentNode) {
      listOfNodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return listOfNodes;
  }
}

export { LinkedList };
