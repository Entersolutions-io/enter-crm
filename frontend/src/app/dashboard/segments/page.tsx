"use client";

import { useState, useEffect } from "react";
import { Plus, Users, Target, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

interface Segment {
  id: string;
  name: string;
  slug: string;
  type: "auto" | "manual";
  rules: Record<string, unknown> | null;
  customer_count?: number;
  created_at: string;
}

const typeIcons = { auto: Zap, manual: Target };

export default function SegmentsPage() {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<{ data: Segment[] }>("/segments")
      .then((res) => setSegments(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#FAFAFA]" style={{ letterSpacing: "-0.025em" }}>
            Segments
          </h1>
          <p className="text-sm text-[#71717A] mt-1">
            Group customers by behavior and attributes
          </p>
        </div>
        <button className="h-9 px-4 rounded-lg bg-[#6366F1] hover:bg-[#5558E6] text-white text-sm font-medium transition-colors flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Segment
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5 animate-pulse">
              <div className="h-4 w-32 bg-[#1F1F23] rounded mb-3" />
              <div className="h-3 w-20 bg-[#1F1F23] rounded" />
            </div>
          ))}
        </div>
      ) : segments.length === 0 ? (
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] flex flex-col items-center justify-center py-16">
          <div className="h-12 w-12 rounded-full bg-[#6366F1]/10 flex items-center justify-center mb-4">
            <Target className="h-6 w-6 text-[#6366F1]" />
          </div>
          <p className="text-sm text-[#71717A]">No segments yet</p>
          <p className="text-xs text-[#52525B] mt-1">Create your first segment to group customers</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {segments.map((segment) => {
            const Icon = typeIcons[segment.type] || Target;
            return (
              <div
                key={segment.id}
                className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5 hover:border-[#2A2A2E] transition-colors cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-[#6366F1]/10 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-[#6366F1]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-[#FAFAFA] group-hover:text-white transition-colors">
                        {segment.name}
                      </h3>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-[10px] uppercase tracking-wider ${
                      segment.type === "auto"
                        ? "bg-violet-400/10 text-violet-400 border-violet-400/20"
                        : "bg-[#1F1F23] text-[#71717A] border-[#2A2A2E]"
                    }`}
                  >
                    {segment.type}
                  </Badge>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#52525B]">
                  <Users className="h-3.5 w-3.5" />
                  <span>{segment.customer_count?.toLocaleString() ?? 0} customers</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
