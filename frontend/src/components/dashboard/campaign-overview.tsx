"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Mail, MessageSquare, Phone } from "lucide-react";

const data = [
  { name: "Email", value: 45, color: "#6366F1", icon: Mail },
  { name: "SMS", value: 32, color: "#06B6D4", icon: MessageSquare },
  { name: "Call List", value: 23, color: "#F59E0B", icon: Phone },
];

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[#27272A] bg-[#1A1A1D] px-3 py-2 shadow-lg">
      <p className="text-sm font-semibold text-[#FAFAFA]">
        {payload[0].name}: {payload[0].value}%
      </p>
    </div>
  );
}

export function CampaignOverview() {
  return (
    <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5">
      <div className="mb-5">
        <h3 className="text-[15px] font-semibold text-[#FAFAFA]">Campaigns</h3>
        <p className="text-[13px] text-[#71717A]">Channel distribution</p>
      </div>
      <div className="flex items-center gap-6">
        <div className="h-[160px] w-[160px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={72}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-3">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <item.icon className="h-4 w-4" style={{ color: item.color }} strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#FAFAFA] font-medium">{item.name}</p>
              </div>
              <span className="text-sm font-semibold text-[#FAFAFA]" style={{ fontVariantNumeric: "tabular-nums" }}>
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
