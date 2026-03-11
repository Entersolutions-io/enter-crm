"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Plus } from "lucide-react";

function AddNodeButton({ data }: NodeProps) {
  const onClick = data.onClick as (() => void) | undefined;

  return (
    <div className="flex items-center justify-center">
      <Handle
        type="target"
        position={Position.Top}
        className="!w-0 !h-0 !border-0 !bg-transparent"
      />
      <button
        onClick={onClick}
        className="h-8 w-8 rounded-full border border-dashed border-[#2A2A2E] bg-[#0A0A0B] flex items-center justify-center text-[#52525B] hover:text-[#6366F1] hover:border-[#6366F1]/40 hover:bg-[#6366F1]/5 transition-all"
      >
        <Plus className="h-4 w-4" strokeWidth={2} />
      </button>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-0 !h-0 !border-0 !bg-transparent"
      />
    </div>
  );
}

export default memo(AddNodeButton);
