import { SimulationLinkDatum, SimulationNodeDatum } from 'd3';

export type Node<T> = SimulationNodeDatum & { id: T };
export type Edge<T> = SimulationLinkDatum<Node<T>>;

export default interface IGraph<T> {
  nodes: Node<T>[];
  edges: Edge<T>[];

  addNode(node: Node<T>): void;
  addEdge(edge: Edge<T>): void;
  removeNode(id: T): void;
  removeEdge(source: T, target: T): void;
}
