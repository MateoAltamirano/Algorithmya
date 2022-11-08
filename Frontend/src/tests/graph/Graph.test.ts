import { Graph } from '../../application/dataStructures/Graph';

describe('addNode', () => {
  let graph: Graph<string>;

  beforeEach(() => {
    graph = new Graph<string>();
    graph.nodes = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
    graph.edges = [{ source: 'a', target: 'b' }];
  });

  it('adds a node', () => {
    graph.addNode({ id: 'd' });
    expect(graph.nodes[graph.nodes.length - 1].id).toBe('d');
  });
});

describe('addEdge', () => {
  let graph: Graph<string>;

  beforeEach(() => {
    graph = new Graph<string>();
    graph.nodes = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
    graph.edges = [{ source: 'a', target: 'b' }];
  });

  it('adds a edge', () => {
    graph.addEdge({ source: 'b', target: 'c' });
    expect(graph.edges[graph.edges.length - 1].source).toBe('b');
    expect(graph.edges[graph.edges.length - 1].target).toBe('c');
  });
});

describe('removeNode', () => {
  let graph: Graph<string>;

  beforeEach(() => {
    graph = new Graph<string>();
    graph.nodes = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
    graph.edges = [{ source: 'a', target: 'b' }];
  });

  it('removes a node by id', () => {
    graph.removeNode('a');
    expect(graph.nodes).not.toContain('a');
  });

  it('removes a node by invlid id', () => {
    graph.removeNode('d');
    expect(graph.nodes.length).toBe(3);
  });
});

describe('removeEdge', () => {
  let graph: Graph<string>;

  beforeEach(() => {
    graph = new Graph<string>();
    graph.nodes = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
    graph.edges = [{ source: 'a', target: 'b' }];
  });

  it('removes an edge', () => {
    graph.removeEdge('a', 'b');
    expect(graph.edges.length).toBe(0);
  });
});
