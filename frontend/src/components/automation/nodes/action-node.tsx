"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import {
  Mail,
  MessageSquare,
  Phone,
  Tag,
  XCircle,
  Target,
  Edit,
  Globe,
} from "lucide-react";
import type { ActionData } from "../types";

const iconMap: Record<string, React.ElementType> = {
  send_email: Mail,
  send_sms: MessageSquare,
  add_to_call_list: Phone,
  add_tag: Tag,
  remove_tag: XCircle,
  move_to_segment: Target,
  update_field: Edit,
  webhook: Globe,
};

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  send_email: { bg: "bg-blue-400/10", text: "text-blue-400", border: "border-blue-400" },
  send_sms: { bg: "bg-violet-400/10", text: "text-violet-400", border: "border-violet-400" },
  add_to_call_list: { bg: "bg-cyan-400/10", text: "text-cyan-400", border: "border-cyan-400" },
  add_tag: { bg: "bg-indigo-400/10", text: "text-indigo-400", border: "border-indigo-400" },
  remove_tag: { bg: "bg-rose-400/10", text: "text-rose-400", border: "border-rose-400" },
  move_to_segment: { bg: "bg-teal-400/10", text: "text-teal-400", border: "border-teal-400" },
  update_field: { bg: "bg-sky-400/10", text: "text-sky-400", border: "border-sky-400" },
  webhook: { bg: "bg-orange-400/10", text: "text-orange-400", border: "border-orange-400" },
};

function ActionNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as ActionData;
  const Icon = iconMap[nodeData.actionType] || Mail;
  const colors = colorMap[nodeData.actionType] || colorMap.send_email;

  return (
    <div
      className={`w-[280px] rounded-xl border bg-[#111113] px-4 py-3 transition-all ${
        selected
          ? `${colors.border}/60 shadow-[0_0_20px_rgba(99,102,241,0.15)]`
          : `${colors.border}/20 hover:${colors.border}/40`
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className={`!w-3 !h-3 !rounded-full !${colors.border.replace("border-", "bg-")} !border-2 !border-[#111113]`}
      />
      <div className="flex items-center gap-3">
        <div className={`h-9 w-9 rounded-lg ${colors.bg} flex items-center justify-center shrink-0`}>
          <Icon className={`h-4 w-4 ${colors.text}`} strokeWidth={1.5} />
        </div>
        <div className="min-w-0 flex-1">
          <p className={`text-[10px] font-medium uppercase tracking-wider ${colors.text} opacity-70`}>
            Action
          </p>
          <p className="text-sm font-medium text-[#FAFAFA] truncate">
            {nodeData.label}
          </p>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !rounded-full !bg-[#6366F1] !border-2 !border-[#111113]"
      />
    </div>
  );
}

export default memo(ActionNode);
