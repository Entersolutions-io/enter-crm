"use client";

import { useState, useEffect } from "react";
import { Plus, Zap, Play, Pause, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import { AutomationBuilder } from "@/components/automation/automation-builder";

interface Automation {
  id: string;
  name: string;
  trigger_type: string;
  trigger_config: Record<string, unknown>;
  is_active: boolean;
  last_triggered_at: string | null;
  created_at: string;
}

export default function AutomationsPage() {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"list" | "builder">("list");
  const [builderName, setBuilderName] = useState("New Automation");

  useEffect(() => {
    api<{ data: Automation[] }>("/automations")
      .then((res) => setAutomations(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (mode === "builder") {
    return (
      <div className="flex flex-col h-[calc(100vh-3.5rem)] -m-6">
        {/* Builder toolbar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1F1F23] bg-[#0A0A0B] shrink-0">
          <button
            onClick={() => setMode("list")}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-[#71717A] hover:text-[#A1A1AA] hover:bg-[#1F1F23] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="h-5 w-px bg-[#1F1F23]" />
          <input
            value={builderName}
            onChange={(e) => setBuilderName(e.target.value)}
            className="bg-transparent text-sm font-medium text-[#FAFAFA] focus:outline-none border-b border-transparent focus:border-[#6366F1] transition-colors px-1 py-0.5"
          />
          <div className="flex-1" />
          <button className="h-8 px-3 rounded-lg border border-[#1F1F23] text-[#71717A] text-xs hover:text-[#A1A1AA] hover:border-[#2A2A2E] transition-colors">
            Save Draft
          </button>
          <button className="h-8 px-3 rounded-lg bg-[#6366F1] hover:bg-[#5558E6] text-white text-xs font-medium transition-colors">
            Activate
          </button>
        </div>

        {/* Builder canvas */}
        <div className="flex-1 relative">
          <AutomationBuilder />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#FAFAFA]" style={{ letterSpacing: "-0.025em" }}>
            Automations
          </h1>
          <p className="text-sm text-[#71717A] mt-1">
            Automate workflows based on customer behavior
          </p>
        </div>
        <button
          onClick={() => {
            setBuilderName("New Automation");
            setMode("builder");
          }}
          className="h-9 px-4 rounded-lg bg-[#6366F1] hover:bg-[#5558E6] text-white text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New Automation
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5 animate-pulse">
              <div className="h-4 w-36 bg-[#1F1F23] rounded mb-2" />
              <div className="h-3 w-20 bg-[#1F1F23] rounded" />
            </div>
          ))}
        </div>
      ) : automations.length === 0 ? (
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] flex flex-col items-center justify-center py-16">
          <div className="h-12 w-12 rounded-full bg-[#6366F1]/10 flex items-center justify-center mb-4">
            <Zap className="h-6 w-6 text-[#6366F1]" />
          </div>
          <p className="text-sm text-[#71717A] mb-1">No automations yet</p>
          <p className="text-xs text-[#52525B] mb-4">Create workflows that trigger automatically</p>
          <button
            onClick={() => {
              setBuilderName("New Automation");
              setMode("builder");
            }}
            className="h-9 px-4 rounded-lg bg-[#6366F1] hover:bg-[#5558E6] text-white text-sm font-medium transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create your first automation
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {automations.map((automation) => (
            <div
              key={automation.id}
              onClick={() => {
                setBuilderName(automation.name);
                setMode("builder");
              }}
              className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5 hover:border-[#2A2A2E] transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                      automation.is_active ? "bg-emerald-400/10" : "bg-[#1F1F23]"
                    }`}
                  >
                    {automation.is_active ? (
                      <Play className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Pause className="h-4 w-4 text-[#52525B]" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[#FAFAFA]">{automation.name}</h3>
                    <p className="text-xs text-[#52525B] mt-0.5">
                      Trigger: {automation.trigger_type.replace(/_/g, " ")}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={`text-[10px] uppercase tracking-wider ${
                    automation.is_active
                      ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/20"
                      : "bg-[#1F1F23] text-[#71717A] border-[#2A2A2E]"
                  }`}
                >
                  {automation.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
