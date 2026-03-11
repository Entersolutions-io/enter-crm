"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Timer, Calendar, Hourglass } from "lucide-react";
import type { DelayData } from "../types";

const iconMap: Record<string, React.ElementType> = {
  wait_duration: Timer,
  wait_until: Calendar,
  wait_for_event: Hourglass,
};

function formatDelay(data: DelayData): string {
  if (data.delayType === "wait_duration" && data.duration && data.unit) {
    return `Wait ${data.duration} ${data.unit}`;
  }
  return "";
}

function DelayNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as DelayData;
  const Icon = iconMap[nodeData.delayType] || Timer;

  return (
    <div
      className={`w-[280px] rounded-xl border bg-[#111113] px-4 py-3 transition-all ${
        selected
          ? "border-purple-400/60 shadow-[0_0_20px_rgba(192,132,252,0.15)]"
          : "border-purple-400/20 hover:border-purple-400/40"
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !rounded-full !bg-purple-400 !border-2 !border-[#111113]"
      />
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-purple-400/10 flex items-center justify-center shrink-0">
          <Icon className="h-4 w-4 text-purple-400" strokeWidth={1.5} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-medium uppercase tracking-wider text-purple-400/70">
            Delay
          </p>
          <p className="text-sm font-medium text-[#FAFAFA] truncate">
            {nodeData.label}
          </p>
          {formatDelay(nodeData) && (
            <p className="text-[11px] text-[#71717A] font-mono">
              {formatDelay(nodeData)}
            </p>
          )}
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !rounded-full !bg-purple-400 !border-2 !border-[#111113]"
      />
    </div>
  );
}

export default memo(DelayNode);
