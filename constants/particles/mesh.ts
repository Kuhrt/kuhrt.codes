import {
  type BufferGeometry,
  MeshBasicMaterial,
  OctahedronGeometry,
  SphereGeometry,
  TetrahedronGeometry
} from 'three';

import { MeshNetworkShape } from '@/models/particles/mesh/MeshNetworkShape';

// Shapes
export const MESH_NETWORK_OCTAHEDRON = new OctahedronGeometry(1);
export const MESH_NETWORK_SPHERE = new SphereGeometry(1, 32, 32);
export const MESH_NETWORK_TETRAHEDRON = new TetrahedronGeometry(1);

export const MESH_NETWORK_SHAPES = new Map<MeshNetworkShape, BufferGeometry>([
  ['sphere', MESH_NETWORK_SPHERE],
  ['octahedron', MESH_NETWORK_OCTAHEDRON],
  ['tetrahedron', MESH_NETWORK_TETRAHEDRON]
]);

// Materials
export const MESH_NETWORK_MATERIAL = new MeshBasicMaterial({
  transparent: true,
  opacity: 0.9
});
