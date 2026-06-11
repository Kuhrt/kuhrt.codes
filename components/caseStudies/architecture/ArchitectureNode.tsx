'use client';

import { Handle, type Node, type NodeProps, Position } from '@xyflow/react';
import {
  ArrowRightLeft,
  Box,
  Database,
  Globe,
  type LucideIcon,
  Monitor,
  Network,
  Zap
} from 'lucide-react';

import { ArchitectureNodeType } from '@/models/caseStudies/CaseStudy';

const NODE_COLORS: Record<ArchitectureNodeType, string> = {
  service: '#3b82f6',
  database: '#f59e0b',
  frontend: '#61dafb',
  api: '#00ff88',
  queue: '#a855f7',
  cache: '#ec4899',
  external: '#6b7280'
};

const NODE_ICONS: Record<ArchitectureNodeType, LucideIcon> = {
  service: Box,
  database: Database,
  frontend: Monitor,
  api: Network,
  queue: ArrowRightLeft,
  cache: Zap,
  external: Globe
};

type ArchitectureNodeData = {
  label: string;
  nodeType: ArchitectureNodeType;
  color?: string;
  opacity: number;
  isNew: boolean;
};

type ArchitectureNodeType_ = Node<ArchitectureNodeData, 'architecture'>;

export default function ArchitectureNodeComponent({
  data
}: NodeProps<ArchitectureNodeType_>) {
  const color = data.color ?? NODE_COLORS[data.nodeType];
  const Icon = NODE_ICONS[data.nodeType];

  return (
    <>
      <Handle type="target" position={Position.Left} className="!bg-transparent !border-0 !w-0 !h-0" />
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300"
        style={{
          borderColor: color,
          backgroundColor: `rgba(20, 20, 21, ${data.opacity * 0.95})`,
          opacity: data.opacity,
          boxShadow: data.isNew
            ? `0 0 12px ${color}40, 0 0 4px ${color}20`
            : 'none'
        }}
      >
        <Icon
          size={14}
          style={{ color, opacity: data.opacity, flexShrink: 0 }}
        />
        <span
          className="text-[11px] font-mono font-semibold whitespace-nowrap"
          style={{ color, opacity: data.opacity }}
        >
          {data.label}
        </span>
      </div>
      <Handle type="source" position={Position.Right} className="!bg-transparent !border-0 !w-0 !h-0" />
    </>
  );
}
