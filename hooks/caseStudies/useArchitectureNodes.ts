import { Edge, MarkerType, Node } from '@xyflow/react';
import { useMemo } from 'react';

import { Architecture } from '@/models/caseStudies/CaseStudy';

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

interface UseArchitectureNodesResult {
  nodes: Node[];
  edges: Edge[];
}

export function useArchitectureNodes(
  architecture: { before: Architecture; after: Architecture },
  diagramProgress: number,
  diagramVisible: boolean
): UseArchitectureNodesResult {
  return useMemo(() => {
    if (!diagramVisible) {
      return { nodes: [], edges: [] };
    }

    const beforeNodeMap = new Map(
      architecture.before.nodes.map((n) => [n.id, n])
    );
    const afterNodeMap = new Map(
      architecture.after.nodes.map((n) => [n.id, n])
    );

    // Build unified node list
    const allNodeIds = new Set([
      ...architecture.before.nodes.map((n) => n.id),
      ...architecture.after.nodes.map((n) => n.id)
    ]);

    const nodes: Node[] = [];
    for (const id of allNodeIds) {
      const beforeNode = beforeNodeMap.get(id);
      const afterNode = afterNodeMap.get(id);

      const isAddedInAfter = !beforeNode && !!afterNode;
      const isRemovedInAfter = !!beforeNode && !afterNode;

      // Compute position
      let x: number, y: number;
      if (beforeNode && afterNode) {
        x = lerp(beforeNode.position.x, afterNode.position.x, diagramProgress);
        y = lerp(beforeNode.position.y, afterNode.position.y, diagramProgress);
      } else if (beforeNode) {
        x = beforeNode.position.x;
        y = beforeNode.position.y;
      } else {
        x = afterNode!.position.x;
        y = afterNode!.position.y;
      }

      // Compute opacity
      let opacity = 1;
      if (isAddedInAfter) {
        opacity = diagramProgress;
      } else if (isRemovedInAfter) {
        opacity = 1 - diagramProgress;
      }

      // Skip fully invisible nodes
      if (opacity < 0.01) continue;

      const sourceNode = afterNode ?? beforeNode!;
      nodes.push({
        id,
        type: 'architecture',
        position: { x, y },
        data: {
          label: sourceNode.label,
          nodeType: sourceNode.type,
          color: sourceNode.color,
          opacity,
          isNew: isAddedInAfter && diagramProgress > 0.5
        }
      });
    }

    // Build unified edge list
    const beforeEdgeKeys = new Set(
      architecture.before.connections.map((c) => `${c.from}-${c.to}`)
    );
    const afterEdgeKeys = new Set(
      architecture.after.connections.map((c) => `${c.from}-${c.to}`)
    );

    const edges: Edge[] = [];
    const processedKeys = new Set<string>();

    // Process all connections from both states
    const allConnections = [
      ...architecture.before.connections.map((c) => ({
        ...c,
        isRemovedInAfter: !afterEdgeKeys.has(`${c.from}-${c.to}`)
      })),
      ...architecture.after.connections
        .filter((c) => !beforeEdgeKeys.has(`${c.from}-${c.to}`))
        .map((c) => ({
          ...c,
          isAddedInAfter: true
        }))
    ];

    for (const conn of allConnections) {
      const key = `${conn.from}-${conn.to}`;
      if (processedKeys.has(key)) continue;
      processedKeys.add(key);

      let edgeOpacity = 0.6;
      const isAdded = 'isAddedInAfter' in conn && conn.isAddedInAfter;
      const isRemoved = 'isRemovedInAfter' in conn && conn.isRemovedInAfter;

      if (isAdded) {
        edgeOpacity = diagramProgress * 0.7;
      } else if (isRemoved) {
        edgeOpacity = (1 - diagramProgress) * 0.6;
      }

      if (edgeOpacity < 0.01) continue;

      // Check if both source and target nodes exist in current nodes
      const sourceExists = nodes.some((n) => n.id === conn.from);
      const targetExists = nodes.some((n) => n.id === conn.to);
      if (!sourceExists || !targetExists) continue;

      edges.push({
        id: key,
        source: conn.from,
        target: conn.to,
        type: 'architecture',
        animated: conn.animated && diagramProgress > 0.5,
        markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12 },
        data: {
          opacity: edgeOpacity,
          isNew: isAdded && diagramProgress > 0.5,
          label: conn.label
        }
      });
    }

    return { nodes, edges };
  }, [architecture, diagramProgress, diagramVisible]);
}
