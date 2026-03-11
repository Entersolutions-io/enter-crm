"use client";

import {
  UserPlus,
  ShoppingCart,
  Clock,
  Target,
  Activity,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Hash,
  BarChart3,
  Tag,
  Mail,
  MessageSquare,
  Phone,
  XCircle,
  Edit,
  Globe,
  Timer,
  Calendar,
  Hourglass,
  X,
  type LucideIcon,
} from "lucide-react";
import { NODE_TEMPLATES, type NodeCategory } from "./types";

const iconLookup: Record<string, LucideIcon> = {
  UserPlus,
  ShoppingCart,
  Clock,
  Target,
  Activity,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Hash,
  BarChart3,
  Tag,
  TagX: XCircle,
  Mail,
  MessageSquare,
  Phone,
  Edit,
  Globe,
  Timer,
  Calendar,
  Hourglass,
};

const categoryMeta: Record<
  string,
  { label: string; color: string; bg: string; borderColor: string }
> = {
  triggers: {
    label: "Triggers",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    borderColor: "border-emerald-400/20 hover:border-emerald-400/40",
  },
  conditions: {
    label: "Conditions",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    borderColor: "border-amber-400/20 hover:border-amber-400/40",
  },
  actions: {
    label: "Actions",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    borderColor: "border-blue-400/20 hover:border-blue-400/40",
  },
  delays: {
    label: "Delays",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    borderColor: "border-purple-400/20 hover:border-purple-400/40",
  },
};

interface NodePickerProps {
  onSelect: (category: NodeCategory, template: Record<string, unknown>) => void;
  onClose: () => void;
  allowedCategories?: NodeCategory[];
}

export function NodePicker({ onSelect, onClose, allowedCategories }: NodePickerProps) {
  const categories = allowedCategories
    ? Object.entries(NODE_TEMPLATES).filter(([key]) =>
        allowedCategories.includes(key.replace(/s$/, "") as NodeCategory)
      )
    : Object.entries(NODE_TEMPLATES);

  return (
    <div className="absolute right-0 top-0 bottom-0 w-[320px] bg-[#0E0E10] border-l border-[#1F1F23] z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1F1F23]">
        <h3 className="text-sm font-medium text-[#FAFAFA]">Add Step</h3>
        <button
          onClick={onClose}
          className="h-7 w-7 rounded-lg flex items-center justify-center text-[#52525B] hover:text-[#A1A1AA] hover:bg-[#1F1F23] transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Node list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-5">
        {categories.map(([key, templates]) => {
          const meta = categoryMeta[key];
          return (
            <div key={key}>
              <p className={`text-[10px] font-semibold uppercase tracking-wider ${meta.color} mb-2 px-1`}>
                {meta.label}
              </p>
              <div className="space-y-1.5">
                {(templates as readonly Record<string, unknown>[]).map((template, i) => {
                  const Icon = iconLookup[template.icon as string] || Activity;
                  const category = key.replace(/s$/, "") as NodeCategory;
                  return (
                    <button
                      key={i}
                      onClick={() => onSelect(category, template as Record<string, unknown>)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border bg-[#111113] ${meta.borderColor} transition-all group cursor-pointer`}
                    >
                      <div className={`h-8 w-8 rounded-lg ${meta.bg} flex items-center justify-center shrink-0`}>
                        <Icon className={`h-4 w-4 ${meta.color}`} strokeWidth={1.5} />
                      </div>
                      <span className="text-sm text-[#A1A1AA] group-hover:text-[#FAFAFA] transition-colors">
                        {template.label as string}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
