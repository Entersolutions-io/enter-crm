"use client";

const customers = [
  { name: "Sarah Johnson", email: "sarah@example.com", spent: 2840, segment: "Champions", date: "2h ago" },
  { name: "Michael Chen", email: "michael@example.com", spent: 1920, segment: "Loyal", date: "5h ago" },
  { name: "Emma Wilson", email: "emma@example.com", spent: 890, segment: "Potential", date: "1d ago" },
  { name: "James Brown", email: "james@example.com", spent: 450, segment: "New", date: "1d ago" },
  { name: "Lisa Martinez", email: "lisa@example.com", spent: 3200, segment: "Champions", date: "2d ago" },
];

const segmentColors: Record<string, string> = {
  Champions: "text-[#6366F1] bg-[#6366F1]/10",
  Loyal: "text-[#818CF8] bg-[#818CF8]/10",
  Potential: "text-[#A5B4FC] bg-[#A5B4FC]/10",
  "At Risk": "text-[#F59E0B] bg-[#F59E0B]/10",
  Hibernating: "text-[#EF4444] bg-[#EF4444]/10",
  New: "text-[#06B6D4] bg-[#06B6D4]/10",
};

export function RecentCustomers() {
  return (
    <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5">
      <div className="mb-4">
        <h3 className="text-[15px] font-semibold text-[#FAFAFA]">Recent Customers</h3>
        <p className="text-[13px] text-[#71717A]">Latest customer activity</p>
      </div>
      <div className="space-y-0">
        {customers.map((customer) => (
          <div
            key={customer.email}
            className="flex items-center gap-4 px-3 py-3 -mx-3 rounded-lg hover:bg-[#161618] transition-colors duration-150"
          >
            <div className="h-9 w-9 rounded-full bg-[#6366F1]/[0.08] border border-[#6366F1]/[0.12] flex items-center justify-center shrink-0">
              <span className="text-xs font-semibold text-[#A5B4FC]">
                {customer.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#FAFAFA] truncate">{customer.name}</p>
              <p className="text-xs text-[#71717A] truncate">{customer.email}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-medium text-[#FAFAFA]" style={{ fontVariantNumeric: "tabular-nums" }}>
                &euro;{customer.spent.toLocaleString()}
              </p>
              <span className={`inline-block text-[10px] font-medium px-1.5 py-0.5 rounded-md ${segmentColors[customer.segment] || "text-[#71717A] bg-white/[0.04]"}`}>
                {customer.segment}
              </span>
            </div>
            <span className="text-[11px] text-[#52525B] w-12 text-right shrink-0">{customer.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
