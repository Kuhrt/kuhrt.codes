'use client';

import {
  BaseEdge,
  type Edge,
  type EdgeProps,
  getSmoothStepPath
} from '@xyflow/react';

type ArchitectureEdgeData = {
  opacity: number;
  isNew: boolean;
  label?: string;
};

type ArchitectureEdgeType = Edge<ArchitectureEdgeData, 'architecture'>;

export default function ArchitectureEdgeComponent({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  animated
}: EdgeProps<ArchitectureEdgeType>) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 8
  });

  const strokeColor = data?.isNew ? '#00ff88' : '#444444';
  const opacity = data?.opacity ?? 0.5;

  return (
    <BaseEdge
      path={edgePath}
      style={{
        stroke: strokeColor,
        strokeWidth: data?.isNew ? 2 : 1.5,
        opacity,
        filter: data?.isNew ? 'drop-shadow(0 0 4px #00ff8840)' : 'none',
        strokeDasharray: animated ? '6 4' : 'none',
        animation: animated ? 'edgeFlow 1.5s linear infinite' : 'none'
      }}
    />
  );
}
