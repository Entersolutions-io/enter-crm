"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { segment: "Champions", count: 245, fill: "#6366F1" },
  { segment: "Loyal", count: 189, fill: "#818CF8" },
  { segment: "Potential", count: 312, fill: "#A5B4FC" },
  { segment: "At Risk", count: 156, fill: "#F59E0B" },
  { segment: "Hibernating", count: 98, fill: "#EF4444" },
  { segment: "New", count: 178, fill: "#06B6D4" },
];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[#27272A] bg-[#1A1A1D] px-3 py-2 shadow-lg">
      <p className="text-[11px] text-[#71717A] mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-[#FAFAFA]" style={{ fontVariantNumeric: "tabular-nums" }}>
        {payload[0].value} customers
      </p>
    </div>
  );
}

export function SegmentChart() {
  return (
    <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5">
      <div className="mb-5">
        <h3 className="text-[15px] font-semibold text-[#FAFAFA]">RFM Segments</h3>
        <p className="text-[13px] text-[#71717A]">Customer distribution by segment</p>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
            <CartesianGrid
              stroke="#1F1F23"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="segment"
              tick={{ fill: "#71717A", fontSize: 11 }}
              axisLine={{ stroke: "#1F1F23" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#71717A", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
            <Bar
              dataKey="count"
              radius={[4, 4, 0, 0]}
              maxBarSize={48}
            >
              {data.map((entry) => (
                <Bar key={entry.segment} dataKey="count" fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
