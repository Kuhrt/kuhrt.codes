'use client';

import '@xyflow/react/dist/style.css';

import { Background, BackgroundVariant,ReactFlow } from '@xyflow/react';

import { useArchitectureNodes } from '@/hooks/caseStudies/useArchitectureNodes';
import { Architecture } from '@/models/caseStudies/CaseStudy';

import ArchitectureEdgeComponent from './ArchitectureEdge';
import ArchitectureNodeComponent from './ArchitectureNode';

const nodeTypes = {
  architecture: ArchitectureNodeComponent
};

const edgeTypes = {
  architecture: ArchitectureEdgeComponent
};

interface Props {
  architecture: {
    before: Architecture;
    after: Architecture;
  };
  diagramProgress: number;
  visible: boolean;
  className?: string;
  fitViewPadding?: number;
}

export default function ArchitectureDiagram({
  architecture,
  diagramProgress,
  visible,
  className,
  fitViewPadding = 0.3
}: Props) {
  const { nodes, edges } = useArchitectureNodes(
    architecture,
    diagramProgress,
    visible
  );

  if (!visible) return null;

  return (
    <div className={className}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodesDraggable={false}
        nodesConnectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        fitView
        fitViewOptions={{ padding: fitViewPadding }}
        proOptions={{ hideAttribution: true }}
        style={{ background: 'transparent' }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#333333"
        />
      </ReactFlow>
    </div>
  );
}
