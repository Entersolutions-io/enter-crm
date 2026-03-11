"use client";

import { useState } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type EdgeProps,
} from "@xyflow/react";
import { Plus, Trash2 } from "lucide-react";

export function InteractiveEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
  sourceHandleId,
  selected,
  source,
  target,
}: EdgeProps) {
  const [hovered, setHovered] = useState(false);

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 16,
  });

  const edgeData = data as Record<string, unknown> | undefined;
  const onAddStep = edgeData?.onAddStep as
    | ((edgeId: string, sourceId: string, targetId: string, sourceHandle: string | null) => void)
    | undefined;
  const onDeleteEdge = edgeData?.onDeleteEdge as
    | ((edgeId: string) => void)
    | undefined;

  const branchLabel = sourceHandleId === "yes" ? "Yes" : sourceHandleId === "no" ? "No" : null;
  const branchColor = sourceHandleId === "yes" ? "#34d399" : sourceHandleId === "no" ? "#f87171" : null;

  const show = selected || hovered;

  return (
    <>
      {/* Invisible wider path for easier hover */}
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={20}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ cursor: "pointer" }}
      />
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: show ? "#6366F1" : "#2A2A2E",
          strokeWidth: show ? 2.5 : 2,
          transition: "stroke 0.15s, stroke-width 0.15s",
        }}
      />
      <EdgeLabelRenderer>
        <div
          className="nodrag nopan pointer-events-auto absolute"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Branch label */}
          {branchLabel && (
            <div className="flex justify-center mb-1">
              <span
                className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                style={{ color: branchColor!, backgroundColor: `${branchColor}15` }}
              >
                {branchLabel}
              </span>
            </div>
          )}

          {/* Action buttons */}
          <div
            className="flex items-center gap-1 transition-all duration-150"
            style={{
              opacity: show ? 1 : 0,
              transform: show ? "scale(1)" : "scale(0.8)",
              pointerEvents: show ? "auto" : "none",
            }}
          >
            {/* Add step button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddStep?.(id, source, target, sourceHandleId || null);
              }}
              className="h-7 px-2.5 rounded-lg bg-[#111113] border border-[#2A2A2E] flex items-center gap-1.5 text-[#71717A] hover:text-[#6366F1] hover:border-[#6366F1]/40 hover:bg-[#6366F1]/5 transition-all"
              title="Add step here"
            >
              <Plus className="h-3 w-3" strokeWidth={2.5} />
              <span className="text-[10px] font-medium">Add</span>
            </button>

            {/* Delete edge button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteEdge?.(id);
              }}
              className="h-7 w-7 rounded-lg bg-[#111113] border border-[#2A2A2E] flex items-center justify-center text-[#52525B] hover:text-red-400 hover:border-red-400/40 hover:bg-red-400/5 transition-all"
              title="Delete connection"
            >
              <Trash2 className="h-3 w-3" strokeWidth={2} />
            </button>
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
