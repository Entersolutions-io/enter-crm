"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 5800 },
  { month: "Mar", revenue: 7200 },
  { month: "Apr", revenue: 6900 },
  { month: "May", revenue: 9100 },
  { month: "Jun", revenue: 11400 },
  { month: "Jul", revenue: 10800 },
  { month: "Aug", revenue: 13200 },
  { month: "Sep", revenue: 14800 },
  { month: "Oct", revenue: 16200 },
  { month: "Nov", revenue: 18400 },
  { month: "Dec", revenue: 21000 },
];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[#27272A] bg-[#1A1A1D] px-3 py-2 shadow-lg">
      <p className="text-[11px] text-[#71717A] mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-[#FAFAFA]" style={{ fontVariantNumeric: "tabular-nums" }}>
        &euro;{payload[0].value.toLocaleString()}
      </p>
    </div>
  );
}

export function RevenueChart() {
  return (
    <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-[15px] font-semibold text-[#FAFAFA]">Revenue</h3>
          <p className="text-[13px] text-[#71717A]">Monthly revenue trend</p>
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-[#1A1A1D] border border-[#27272A] p-0.5 text-[12px]">
          <button className="px-2.5 py-1 rounded-md text-[#71717A] hover:text-[#A1A1AA] transition-colors">7d</button>
          <button className="px-2.5 py-1 rounded-md text-[#71717A] hover:text-[#A1A1AA] transition-colors">30d</button>
          <button className="px-2.5 py-1 rounded-md bg-[#111113] text-[#FAFAFA] font-medium">12m</button>
        </div>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366F1" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="#1F1F23"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "#71717A", fontSize: 12 }}
              axisLine={{ stroke: "#1F1F23" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#71717A", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#6366F1"
              strokeWidth={2}
              fill="url(#revenueGradient)"
              dot={false}
              activeDot={{ r: 4, fill: "#FAFAFA", stroke: "#6366F1", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
