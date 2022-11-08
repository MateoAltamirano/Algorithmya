import { useRef } from 'react';
import { GraphIcon } from '../../application/assets/icons/Icons';
import EmptyDS from '../../application/components/EmptyDS';
import TextInput from '../../application/components/textInput/TextInput';
import useGraphHook from '../../application/hooks/GraphHooks';
import { useGraph } from '../../application/providers/GraphProvider';
import ModulesLayout from '../layout/ModulesLayout';
import './Graph.css';

const GraphPage = () => {
  const {
    state: { data },
  } = useGraph();
  const graphRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const GraphDS = () => {
    return (
      <div ref={graphRef} className="graph">
        <div ref={graphRef} className="graph-canvas">
          {data.nodes.length === 0 ? (
            <EmptyDS
              icon={
                <GraphIcon
                  width="10rem"
                  height="10rem"
                  stroke="lightgray"
                  fill="lightgray"
                />
              }
              dsLabel={'graph'}
            />
          ) : (
            <svg ref={svgRef} className="graph-svg" />
          )}
        </div>
      </div>
    );
  };

  const Methods = () => {
    const {
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
    } = useGraphHook(graphRef, svgRef);

    return (
      <div className="methods">
        <TextInput
          value={addNodeId}
          setValue={setAddNodeId}
          hasButton={true}
          buttonLabel={'Add Node'}
          placeholder={'Value'}
          buttonAction={addNodeValue}
        />
        <TextInput
          value={addEdgeSource}
          setValue={setAddEdgeSource}
          hasButton={true}
          buttonLabel={'Add Edge'}
          placeholder={'Source'}
          buttonAction={addEdgeValue}
          isDoubleInput={true}
          secondInputProps={{
            value: addEdgeTarget,
            setValue: setAddEdgeTarget,
            placeholder: 'Target',
          }}
        />
        <TextInput
          value={removeNodeId}
          setValue={setRemoveNodeId}
          hasButton={true}
          buttonLabel={'Remove Node'}
          placeholder={'Value'}
          buttonAction={removeNodeValue}
        />
        <TextInput
          value={removeEdgeSource}
          setValue={setRemoveEdgeSource}
          hasButton={true}
          buttonLabel={'Remove Edge'}
          placeholder={'Source'}
          buttonAction={removeEdgeValue}
          isDoubleInput={true}
          secondInputProps={{
            value: removeEdgeTarget,
            setValue: setRemoveEdgeTarget,
            placeholder: 'Target',
          }}
        />
      </div>
    );
  };

  return <ModulesLayout methods={<Methods />} dataStructure={<GraphDS />} />;
};

export default GraphPage;
