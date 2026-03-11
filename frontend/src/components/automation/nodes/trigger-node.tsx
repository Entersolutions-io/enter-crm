"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import {
  UserPlus,
  ShoppingCart,
  Clock,
  Target,
  Activity,
  TrendingUp,
} from "lucide-react";
import type { TriggerData } from "../types";

const iconMap: Record<string, React.ElementType> = {
  customer_created: UserPlus,
  purchase_made: ShoppingCart,
  inactive_period: Clock,
  segment_entered: Target,
  event_tracked: Activity,
  rfm_changed: TrendingUp,
};

function TriggerNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as TriggerData;
  const Icon = iconMap[nodeData.triggerType] || Activity;

  return (
    <div
      className={`w-[280px] rounded-xl border bg-[#111113] px-4 py-3 transition-all ${
        selected
          ? "border-emerald-400/60 shadow-[0_0_20px_rgba(52,211,153,0.15)]"
          : "border-emerald-400/20 hover:border-emerald-400/40"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-emerald-400/10 flex items-center justify-center shrink-0">
          <Icon className="h-4 w-4 text-emerald-400" strokeWidth={1.5} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-medium uppercase tracking-wider text-emerald-400/70">
            Trigger
          </p>
          <p className="text-sm font-medium text-[#FAFAFA] truncate">
            {nodeData.label}
          </p>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !rounded-full !bg-emerald-400 !border-2 !border-[#111113]"
      />
    </div>
  );
}

export default memo(TriggerNode);
