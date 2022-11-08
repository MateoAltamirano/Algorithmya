import {
  D3DragEvent,
  drag,
  DragBehavior,
  forceCollide,
  forceLink,
  forceSimulation,
  select,
  Selection,
  Simulation,
  SimulationNodeDatum,
  SubjectPosition,
} from 'd3';
import { useSnackbar } from 'notistack';
import { RefObject, useCallback, useEffect, useState } from 'react';
import { Graph } from '../../application/dataStructures/Graph';
import { Edge, Node } from '../../application/dataStructures/interfaces/IGraph';
import { GraphPaintTo } from '../../application/providers/GraphProvider';
import { useGraph } from '../providers/GraphProvider';
import { GraphMethod } from '../reducers/graphReducer';

enum EdgeTypeSelector {
  Edge = 'edge',
  LoopEdge = 'loop-edge',
}

const getDragForce = (
  simulation: Simulation<Node<string>, Edge<string>>
): DragBehavior<SVGGElement, Node<string>, Node<string> | SubjectPosition> => {
  return drag<SVGGElement, Node<string>>()
    .on(
      'start',
      function (
        event: D3DragEvent<
          SVGGElement,
          Node<string>,
          Node<string> | SubjectPosition
        >,
        node: Node<string>
      ): void {
        if (!event.active) simulation.alphaTarget(0.9).restart();
        node.fx = node.x;
        node.fy = node.y;
      }
    )
    .on(
      'drag',
      (
        event: D3DragEvent<
          SVGGElement,
          Node<string>,
          Node<string> | SubjectPosition
        >,
        node: Node<string>
      ): void => {
        node.fx = event.x;
        node.fy = event.y;
      }
    )
    .on(
      'end',
      (
        event: D3DragEvent<
          SVGGElement,
          Node<string>,
          Node<string> | SubjectPosition
        >,
        node: Node<string>
      ): void => {
        if (!event.active) simulation.alphaTarget(0);
        node.fx = null;
        node.fy = null;
      }
    );
};

const getNodesSelection = (
  canvas: Selection<SVGGElement, null, null, undefined>,
  nodes: Node<string>[]
): Selection<SVGGElement, Node<string>, SVGGElement, null> => {
  return canvas
    .selectAll<SVGGElement, Node<string>>('.node')
    .data<Node<string>>(nodes, function (node: Node<string>): string {
      return node.id;
    });
};

const getNewNodesSelection = (
  nodes: Selection<SVGGElement, Node<string>, SVGGElement, null>
): Selection<SVGGElement, Node<string>, SVGGElement, null> => {
  return nodes.enter().append<SVGGElement>('g').attr('class', 'node');
};

const getEdgesSelection = (
  canvas: Selection<SVGGElement, null, null, undefined>,
  edges: Edge<string>[],
  type: EdgeTypeSelector
): Selection<SVGGElement, Edge<string>, SVGGElement, null> => {
  return canvas
    .selectAll<SVGGElement, Edge<string>>(`.${type}`)
    .data<Edge<string>>(edges, function (edge: Edge<string>): string {
      const source: Node<string> = edge.source as Node<string>;
      const target: Node<string> = edge.target as Node<string>;
      return '' + source.id + '->' + target.id;
    });
};

const getTypesOfEdges = (
  edgesData: Edge<string>[]
): {
  edges: Edge<string>[];
  loopEdges: Edge<string>[];
} => {
  const edges: Edge<string>[] = [];
  const loopEdges: Edge<string>[] = [];
  for (const edge of edgesData) {
    const source: Node<string> = edge.source as Node<string>;
    const target: Node<string> = edge.target as Node<string>;
    if (source.id !== target.id) {
      edges.push(edge);
    } else {
      loopEdges.push(edge);
    }
  }
  return { edges, loopEdges };
};

const insertEdgeShape = (
  selection: Selection<SVGGElement, Edge<string>, SVGGElement, null>,
  type: EdgeTypeSelector
): void => {
  if (type === EdgeTypeSelector.Edge) {
    selection
      .enter()
      .insert<SVGLineElement>('line', '.node')
      .attr('class', type);
  } else {
    selection
      .enter()
      .insert<SVGCircleElement>('circle', '.node')
      .attr('r', '1rem')
      .attr('cx', function (edge: Edge<string>) {
        const node: Node<string> = edge.source as Node<string>;
        const x = node.y ? node.y + 32 : 0;
        return x;
      })
      .attr('cy', function (edge: Edge<string>) {
        const node: Node<string> = edge.source as Node<string>;
        const y = node.y ? node.y + 32 : 0;
        return y;
      })
      .attr('class', type);
  }
};

const insertNodeShape = (
  selection: Selection<SVGGElement, Node<string>, SVGGElement, null>,
  graphPaintTo: GraphPaintTo
) => {
  selection
    .append<SVGRectElement>('rect')
    .attr('class', 'node-value')
    .attr('rx', '10px')
    .attr('ry', '10px')
    .attr('x', '-32px')
    .attr('y', '-32px');
  if (graphPaintTo === GraphPaintTo.Node) {
    const lastNode: SVGGElement | undefined = selection.nodes().pop();
    lastNode?.children[0].setAttribute('class', `node-value appear`);
    setTimeout(() => {
      lastNode?.children[0].setAttribute('class', `node-value`);
    }, 800);
  }
};

const insertNodeLabel = (
  selection: Selection<SVGGElement, Node<string>, SVGGElement, null>,
  graphPaintTo: GraphPaintTo
) => {
  selection
    .append<SVGTextElement>('text')
    .attr('dy', '0.35rem')
    .text(function (node: Node<string>): string {
      return node.id;
    })
    .attr('class', 'node-label');
  if (graphPaintTo === GraphPaintTo.Node) {
    const lastNode: SVGGElement | undefined = selection.nodes().pop();
    lastNode?.children[1].setAttribute('class', `node-label text-appear`);
    setTimeout(() => {
      lastNode?.children[1].setAttribute('class', `node-label`);
    }, 800);
  }
};

const setUpGraphSimulation = (
  simulation: Simulation<Node<string>, Edge<string>>,
  data: Graph<string>,
  canvas: Selection<SVGGElement, null, null, undefined>
): void => {
  simulation.alphaMin(0.45);
  simulation.force('collision', forceCollide(36));
  simulation.nodes(data.nodes);
  simulation
    .force(
      'link',
      forceLink(data.edges)
        .id((node: SimulationNodeDatum) => {
          return (node as Node<string>).id;
        })
        .strength(0)
    )
    .on('tick', () => tickedSimulation(canvas));
};

const tickedSimulation = (
  canvas: Selection<SVGGElement, null, null, undefined>
) => {
  canvas
    .selectAll<SVGGElement, Node<string>>('.node')
    .attr('transform', function (node: Node<string>): string {
      return 'translate(' + node.x + ',' + node.y + ')';
    });
  canvas
    .selectAll<SVGGElement, Edge<string>>(`.${EdgeTypeSelector.LoopEdge}`)
    .attr('cx', function (edge: Edge<string>): number {
      const node: Node<string> = edge.source as Node<string>;
      const x = node.x ? node.x + 32 : 0;
      return x;
    })
    .attr('cy', function (edge: Edge<string>): number {
      const node: Node<string> = edge.source as Node<string>;
      const y = node.y ? node.y + 32 : 0;
      return y;
    });

  return canvas
    .selectAll<SVGGElement, Edge<string>>(`.${EdgeTypeSelector.Edge}`)
    .attr('x1', function (edge: Edge<string>): number {
      const node: Node<string> = edge.source as Node<string>;
      return node.x ? node.x : 0;
    })
    .attr('y1', function (edge: Edge<string>): number {
      const node: Node<string> = edge.source as Node<string>;
      return node.y ? node.y : 0;
    })
    .attr('x2', function (edge: Edge<string>): number {
      const node: Node<string> = edge.target as Node<string>;
      return node.x ? node.x : 0;
    })
    .attr('y2', function (edge: Edge<string>): number {
      const node: Node<string> = edge.target as Node<string>;
      return node.y ? node.y : 0;
    });
};

const useGraphHook = (
  graphRef: RefObject<HTMLDivElement>,
  svgRef: RefObject<SVGSVGElement>
) => {
  const {
    dispatch,
    state: {
      data,
      paint: { type },
    },
  } = useGraph();
  const [addNodeId, setAddNodeId] = useState<string>('');
  const [addEdgeSource, setAddEdgeSource] = useState<string>('');
  const [addEdgeTarget, setAddEdgeTarget] = useState<string>('');
  const [removeNodeId, setRemoveNodeId] = useState<string>('');
  const [removeEdgeSource, setRemoveEdgeSource] = useState<string>('');
  const [removeEdgeTarget, setRemoveEdgeTarget] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();

  const updateCanvas = useCallback(
    (
      simulation: Simulation<Node<string>, Edge<string>>,
      graphCanvas: Selection<SVGGElement, null, null, undefined>
    ) => {
      const dragForce = getDragForce(simulation);
      const nodes = getNodesSelection(graphCanvas, data.nodes);
      const newNodes = getNewNodesSelection(nodes);
      const { edges, loopEdges } = getTypesOfEdges(data.edges);
      const edgesSelection = getEdgesSelection(
        graphCanvas,
        edges,
        EdgeTypeSelector.Edge
      );
      const loopEdgesSelection = getEdgesSelection(
        graphCanvas,
        loopEdges,
        EdgeTypeSelector.LoopEdge
      );

      insertEdgeShape(edgesSelection, EdgeTypeSelector.Edge);
      insertEdgeShape(loopEdgesSelection, EdgeTypeSelector.LoopEdge);

      edgesSelection.exit().remove();
      loopEdgesSelection.exit().remove();
      newNodes.call(dragForce);

      insertNodeShape(newNodes, type);
      insertNodeLabel(newNodes, type);

      return nodes.exit().remove();
    },
    [data, type]
  );

  useEffect(() => {
    const svg: Selection<SVGSVGElement | null, null, null, undefined> = select<
      SVGSVGElement | null,
      null
    >(svgRef.current);
    const graphCanvas: Selection<SVGGElement, null, null, undefined> =
      svg.append<SVGGElement>('g');
    const simulation: Simulation<Node<string>, Edge<string>> = forceSimulation<
      Node<string>
    >();
    setUpGraphSimulation(simulation, data, graphCanvas);
    updateCanvas(simulation, graphCanvas);
  }, [data, updateCanvas, svgRef]);

  const addNodeValue = (): void => {
    if (graphRef.current) {
      const id: string = addNodeId.trim();
      if (!isNodeInGraph(id)) {
        const { width, height } = graphRef.current.getBoundingClientRect();
        const newNode: Node<string> = { id, x: width / 2, y: height / 2 };
        dispatch({
          type: GraphMethod.AddNode,
          payload: newNode,
        });
      } else {
        enqueueSnackbar('The node is already in the graph!', {
          variant: 'error',
        });
      }
    }
  };

  const addEdgeValue = (): void => {
    const source: string = addEdgeSource.trim();
    const target: string = addEdgeTarget.trim();
    if (
      isNodeInGraph(source) &&
      isNodeInGraph(target) &&
      !isEdgeInGraph(source, target)
    ) {
      const newEdge: Edge<string> = { source, target };
      dispatch({
        type: GraphMethod.AddEdge,
        payload: newEdge,
      });
    } else {
      enqueueSnackbar('The edge is already in the graph!', {
        variant: 'error',
      });
    }
  };

  const removeNodeValue = (): void => {
    const id: string = removeNodeId.trim();
    if (isNodeInGraph(id)) {
      dispatch({
        type: GraphMethod.RemoveNode,
        payload: id,
      });
    } else {
      enqueueSnackbar('The node is not in the graph!', { variant: 'error' });
    }
  };

  const removeEdgeValue = (): void => {
    const source: string = removeEdgeSource.trim();
    const target: string = removeEdgeTarget.trim();
    if (
      isNodeInGraph(source) &&
      isNodeInGraph(target) &&
      isEdgeInGraph(source, target)
    ) {
      dispatch({
        type: GraphMethod.RemoveEdge,
        payload: { source, target },
      });
    } else {
      enqueueSnackbar('The edge is not in the graph!', { variant: 'error' });
    }
  };

  const isNodeInGraph = (nodeId: string): boolean => {
    const isInGraph: boolean = data.nodes.some((node) => node.id === nodeId);
    return isInGraph;
  };

  const isEdgeInGraph = (sourceId: string, targetId: string): boolean => {
    const isInGraph: boolean = data.edges.some((edge) => {
      const source: Node<string> = edge.source as Node<string>;
      const target: Node<string> = edge.target as Node<string>;
      return source.id === sourceId && target.id === targetId;
    });
    return isInGraph;
  };

  return {
    addNodeId,
    setAddNodeId,
    addNodeValue,
    addEdgeSource,
    setAddEdgeSource,
    addEdgeValue,
    addEdgeTarget,
    setAddEdgeTarget,
    removeNodeId,
    setRemoveNodeId,
    removeNodeValue,
    removeEdgeSource,
    setRemoveEdgeSource,
    removeEdgeValue,
    removeEdgeTarget,
    setRemoveEdgeTarget,
  };
};

export default useGraphHook;
