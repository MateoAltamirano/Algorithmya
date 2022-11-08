import IGraph, { Edge, Node } from './interfaces/IGraph';

export class Graph<T> implements IGraph<T> {
  public nodes: Node<T>[];
  public edges: Edge<T>[];

  constructor() {
    this.nodes = [];
    this.edges = [];
  }

  addNode(node: Node<T>): void {
    this.nodes.push(node);
  }
  addEdge(edge: Edge<T>): void {
    this.edges.push(edge);
  }
  removeNode(id: T): void {
    this.nodes = this.nodes.filter((node) => node.id !== id);
    this.edges = this.edges.filter((edge) => {
      const source: Node<T> = edge.source as Node<T>;
      return source.id !== id;
    });
    this.edges = this.edges.filter((edge) => {
      const target: Node<T> = edge.target as Node<T>;
      return target.id !== id;
    });
  }
  removeEdge(sourceIdToRemove: T, targetIdToRemove: T): void {
    const idxToRemove: number = this.edges.findIndex((edge) => {
      const source: Node<T> = edge.source as Node<T>;
      const target: Node<T> = edge.target as Node<T>;
      return source.id === sourceIdToRemove && target.id === targetIdToRemove;
    });
    this.edges.splice(idxToRemove, 1);
  }
}
