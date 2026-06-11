'use client';

import {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import {
  BufferAttribute,
  BufferGeometry,
  type Group,
  Line,
  LineBasicMaterial,
  type Mesh
} from 'three';

import { capabilities } from '@/content/capabilities';
import {
  MeshConnectionDatum,
  MeshConnectionType
} from '@/models/particles/mesh/MeshConnectionDatum';

import { MESH_NODE_COUNT } from './MeshParticles';

interface Props {
  nodeRefs: RefObject<(Mesh | undefined)[]>;
  ref?: RefObject<{ updateConnections: () => void } | null>;
}

export default function MeshConnections({ nodeRefs, ref }: Props) {
  const connectionsGroupRef = useRef<Group>(null!);
  const linesRef = useRef<Line[]>([]);
  const connectionDataRef = useRef<MeshConnectionDatum[]>([]);
  const [nodeCount, setNodeCount] = useState(0);

  // Monitor node count changes
  useEffect(() => {
    const checkNodes = () => {
      const currentCount = nodeRefs.current.filter(
        (node) => node !== undefined
      ).length;
      if (currentCount !== nodeCount) {
        setNodeCount(currentCount);
      }
    };

    checkNodes();
    const interval = setInterval(checkNodes, 100);
    return () => clearInterval(interval);
  }, [nodeCount, nodeRefs]);

  // Create connection data based on node references
  const connectionData = useMemo(() => {
    const connections: MeshConnectionDatum[] = [];

    const allNodes = nodeRefs.current.filter(
      (node): node is Mesh => node !== undefined
    );
    const expectedNodeCount = capabilities.length + MESH_NODE_COUNT;
    if (allNodes.length < expectedNodeCount) return connections;

    for (let i = 0; i < allNodes.length; i++) {
      let connectionCount = 0;
      const maxConnections = i < capabilities.length ? 6 : 3;
      const nodeAType = i < capabilities.length ? 'main' : 'connector';

      for (let j = i + 1; j < allNodes.length; j++) {
        if (connectionCount >= maxConnections) break;

        const nodeBType = j < capabilities.length ? 'main' : 'connector';
        const distance = allNodes[i].position.distanceTo(allNodes[j].position);

        let shouldConnect = false;
        let connectionType: MeshConnectionType = 'connector-connector';

        if (nodeAType === 'main' && nodeBType === 'main') {
          shouldConnect = distance < 16;
          connectionType = 'main-main';
        } else if (nodeAType === 'main' && nodeBType === 'connector') {
          shouldConnect = distance < 12;
          connectionType = 'main-connector';
        } else if (nodeAType === 'connector' && nodeBType === 'connector') {
          shouldConnect = distance < 8;
          connectionType = 'connector-connector';
        }

        if (shouldConnect) {
          connections.push({
            start: allNodes[i],
            end: allNodes[j],
            type: connectionType
          });
          connectionCount++;
        }
      }
    }

    return connections;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeCount]);

  useEffect(() => {
    connectionDataRef.current = connectionData;
  }, [connectionData]);

  const lines = useMemo(() => {
    return connectionData.map((connection) => {
      const geometry = new BufferGeometry();
      const positions = new Float32Array([
        connection.start.position.x,
        connection.start.position.y,
        connection.start.position.z,
        connection.end.position.x,
        connection.end.position.y,
        connection.end.position.z
      ]);
      geometry.setAttribute('position', new BufferAttribute(positions, 3));

      const material = new LineBasicMaterial({
        color: connection.type === 'main-main' ? 0x00ff88 : 0x666666,
        transparent: true,
        opacity: connection.type === 'main-main' ? 0.6 : 0.3
      });

      return new Line(geometry, material);
    });
  }, [connectionData]);

  useEffect(() => {
    linesRef.current = lines;
  }, [lines]);

  const updateConnections = useCallback(() => {
    if (!connectionDataRef.current.length) return;

    connectionDataRef.current.forEach((connection, index) => {
      if (index < linesRef.current.length) {
        const line = linesRef.current[index];
        const positions = line.geometry.attributes.position
          .array as Float32Array;

        positions[0] = connection.start.position.x;
        positions[1] = connection.start.position.y;
        positions[2] = connection.start.position.z;

        positions[3] = connection.end.position.x;
        positions[4] = connection.end.position.y;
        positions[5] = connection.end.position.z;

        line.geometry.attributes.position.needsUpdate = true;

        const distance = connection.start.position.distanceTo(
          connection.end.position
        );
        const maxDistance = connection.type === 'main-main' ? 20 : 15;
        const distanceOpacity = Math.max(0.05, 1 - distance / maxDistance);

        const baseOpacity = connection.type === 'main-main' ? 0.6 : 0.3;
        (line.material as LineBasicMaterial).opacity =
          baseOpacity * distanceOpacity;
      }
    });
  }, []);

  useEffect(() => {
    if (ref) {
      ref.current = { updateConnections };
    }
  }, [ref, updateConnections]);

  if (connectionData.length === 0) {
    return null;
  }

  return (
    <group ref={connectionsGroupRef}>
      {lines.map((line, index) => (
        <primitive key={`line-${index}`} object={line} />
      ))}
    </group>
  );
}
