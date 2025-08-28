import { type Mesh } from 'three';

export interface MeshConnectionDatum {
  start: Mesh;
  end: Mesh;
  type: MeshConnectionType;
}

export type MeshConnectionType =
  | 'main-main'
  | 'main-connector'
  | 'connector-connector';
