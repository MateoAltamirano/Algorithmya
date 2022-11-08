import { Graph } from '../dataStructures/Graph';
import { Edge, Node } from '../dataStructures/interfaces/IGraph';
import { GraphPaintTo, IGraphState } from '../providers/GraphProvider';

export enum GraphMethod {
  AddNode,
  AddEdge,
  RemoveNode,
  RemoveEdge,
  Reset,
}

interface AddNode<T> {
  type: GraphMethod.AddNode;
  payload: Node<T>;
}

interface AddEdge<T> {
  type: GraphMethod.AddEdge;
  payload: Edge<T>;
}

interface RemoveNode<T> {
  type: GraphMethod.RemoveNode;
  payload: T;
}

interface RemoveEdge<T> {
  type: GraphMethod.RemoveEdge;
  payload: { source: T; target: T };
}

interface Reset {
  type: GraphMethod.Reset;
}

export type GraphActions<T> =
  | AddNode<T>
  | AddEdge<T>
  | RemoveNode<T>
  | RemoveEdge<T>
  | Reset;

export const graphReducer = (
  state: IGraphState,
  action: GraphActions<string>
): IGraphState => {
  let data = new Graph<string>();
  switch (action.type) {
    case GraphMethod.AddNode:
      data = state.data;
      data.addNode(action.payload);
      return { ...state, data, paint: { type: GraphPaintTo.Node } };
    case GraphMethod.AddEdge:
      data = state.data;
      data.addEdge(action.payload);
      return { ...state, data, paint: { type: GraphPaintTo.None } };
    case GraphMethod.RemoveNode:
      data = state.data;
      data.removeNode(action.payload);
      return { ...state, data, paint: { type: GraphPaintTo.None } };
    case GraphMethod.RemoveEdge:
      data = state.data;
      data.removeEdge(action.payload.source, action.payload.target);
      return { ...state, data, paint: { type: GraphPaintTo.None } };
    case GraphMethod.Reset:
      data = new Graph<string>();
      let paint = { type: GraphPaintTo.None };
      return { ...state, data, paint };
    default:
      return state;
  }
};
