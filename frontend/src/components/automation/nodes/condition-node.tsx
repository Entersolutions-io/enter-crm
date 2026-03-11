"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import {
  ArrowUp,
  ArrowDown,
  Clock,
  Hash,
  BarChart3,
  Tag,
  TrendingUp,
  GitBranch,
} from "lucide-react";
import type { ConditionData } from "../types";

const iconMap: Record<string, React.ElementType> = {
  spend_above: ArrowUp,
  spend_below: ArrowDown,
  inactive_days: Clock,
  order_count: Hash,
  rfm_segment: BarChart3,
  category_spend: Tag,
  clv_above: TrendingUp,
  clv_below: ArrowDown,
  custom_property: GitBranch,
};

function formatCondition(data: ConditionData): string {
  if (data.value) {
    const opSymbol: Record<string, string> = {
      ">": ">",
      "<": "<",
      ">=": "≥",
      "<=": "≤",
      "==": "=",
      "!=": "≠",
      contains: "contains",
      not_contains: "not contains",
    };
    return `${data.field} ${opSymbol[data.operator] || data.operator} ${data.value}`;
  }
  return "Configure condition...";
}

function ConditionNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as ConditionData;
  const Icon = iconMap[nodeData.conditionType] || GitBranch;

  return (
    <div
      className={`w-[280px] rounded-xl border bg-[#111113] px-4 py-3 transition-all ${
        selected
          ? "border-amber-400/60 shadow-[0_0_20px_rgba(251,191,36,0.15)]"
          : "border-amber-400/20 hover:border-amber-400/40"
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !rounded-full !bg-amber-400 !border-2 !border-[#111113]"
      />
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-amber-400/10 flex items-center justify-center shrink-0">
          <Icon className="h-4 w-4 text-amber-400" strokeWidth={1.5} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-medium uppercase tracking-wider text-amber-400/70">
            Condition
          </p>
          <p className="text-sm font-medium text-[#FAFAFA] truncate">
            {nodeData.label}
          </p>
        </div>
      </div>
      {nodeData.value && (
        <p className="text-[11px] text-[#71717A] mt-2 pl-12 font-mono truncate">
          {formatCondition(nodeData)}
        </p>
      )}
      {/* Yes/No outputs */}
      <div className="flex justify-between mt-2 px-1">
        <span className="text-[10px] text-emerald-400/60 font-medium">Yes</span>
        <span className="text-[10px] text-red-400/60 font-medium">No</span>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="yes"
        className="!w-3 !h-3 !rounded-full !bg-emerald-400 !border-2 !border-[#111113]"
        style={{ left: "30%" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="no"
        className="!w-3 !h-3 !rounded-full !bg-red-400 !border-2 !border-[#111113]"
        style={{ left: "70%" }}
      />
    </div>
  );
}

export default memo(ConditionNode);
