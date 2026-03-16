"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useCustomers, type Customer } from "@/hooks/use-customers";

const segmentColors: Record<string, string> = {
  champions: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  loyal: "bg-blue-400/10 text-blue-400 border-blue-400/20",
  potential: "bg-amber-400/10 text-amber-400 border-amber-400/20",
  "at risk": "bg-orange-400/10 text-orange-400 border-orange-400/20",
  lost: "bg-red-400/10 text-red-400 border-red-400/20",
  new: "bg-violet-400/10 text-violet-400 border-violet-400/20",
};

function getSegmentStyle(segment: string | null) {
  if (!segment) return "bg-[#1F1F23] text-[#71717A] border-[#2A2A2E]";
  const key = segment.toLowerCase();
  for (const [k, v] of Object.entries(segmentColors)) {
    if (key.includes(k)) return v;
  }
  return "bg-[#1F1F23] text-[#A1A1AA] border-[#2A2A2E]";
}

function formatCurrency(value: number) {
  return `€${Number(value || 0).toLocaleString("de-DE", { minimumFractionDigits: 2 })}`;
}

function timeAgo(dateStr: string | null) {
  if (!dateStr) return "—";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "first_name",
    header: "Customer",
    cell: ({ row }) => {
      const c = row.original;
      const initials = `${c.first_name?.[0] || ""}${c.last_name?.[0] || ""}`.toUpperCase();
      return (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/15 flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-[#A5B4FC]">{initials}</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-[#FAFAFA] truncate">
              {c.first_name} {c.last_name}
            </p>
            <p className="text-xs text-[#52525B] truncate">{c.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "company_name",
    header: "Company",
    cell: ({ getValue }) => (
      <span className="text-sm text-[#A1A1AA]">{(getValue() as string) || "—"}</span>
    ),
  },
  {
    accessorKey: "rfm_segment",
    header: "Segment",
    cell: ({ getValue }) => {
      const segment = getValue() as string | null;
      return (
        <Badge variant="outline" className={`text-xs font-medium ${getSegmentStyle(segment)}`}>
          {segment || "Unscored"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "clv_total",
    header: "Total Spend",
    cell: ({ getValue }) => (
      <span className="text-sm text-[#FAFAFA] tabular-nums">
        {formatCurrency(getValue() as number)}
      </span>
    ),
  },
  {
    accessorKey: "clv_order_count",
    header: "Orders",
    cell: ({ getValue }) => (
      <span className="text-sm text-[#A1A1AA] tabular-nums">{getValue() as number}</span>
    ),
  },
  {
    accessorKey: "last_activity_at",
    header: "Last Active",
    cell: ({ getValue }) => (
      <span className="text-sm text-[#71717A]">{timeAgo(getValue() as string | null)}</span>
    ),
  },
];

export default function CustomersPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { data, pagination, loading } = useCustomers({ page, search, perPage: 20 });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  function handleSearchKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      setSearch(searchInput);
      setPage(1);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#FAFAFA]" style={{ letterSpacing: "-0.025em" }}>
            Customers
          </h1>
          <p className="text-sm text-[#71717A] mt-1">
            {pagination.total > 0
              ? `${pagination.total.toLocaleString()} customers`
              : "Manage your customer base"}
          </p>
        </div>
        <button className="h-9 px-4 rounded-lg bg-[#6366F1] hover:bg-[#5558E6] text-white text-sm font-medium transition-colors flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Customer
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#52525B]" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search customers..."
            className="w-full h-9 rounded-lg border border-[#1F1F23] bg-[#111113] pl-9 pr-3 text-sm text-[#FAFAFA] placeholder:text-[#52525B] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[#1F1F23] bg-[#111113] overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-[#1F1F23] hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-[11px] text-[#52525B] uppercase tracking-wider font-medium h-10 px-4"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <TableRow key={i} className="border-[#1F1F23]">
                  {columns.map((_, j) => (
                    <TableCell key={j} className="px-4 py-3">
                      <div className="h-4 w-24 bg-[#1F1F23] rounded animate-pulse" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow className="border-[#1F1F23]">
                <TableCell colSpan={columns.length} className="h-32 text-center text-sm text-[#52525B]">
                  No customers found.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => router.push(`/dashboard/customers/${row.original.id}`)}
                  className="border-[#1F1F23] hover:bg-[#1A1A1D] cursor-pointer transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {pagination.last_page > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#1F1F23]">
            <p className="text-xs text-[#52525B]">
              Page {pagination.current_page} of {pagination.last_page}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="h-8 w-8 rounded-lg border border-[#1F1F23] bg-[#0A0A0B] flex items-center justify-center text-[#71717A] hover:text-[#A1A1AA] hover:border-[#2A2A2E] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(pagination.last_page, p + 1))}
                disabled={page >= pagination.last_page}
                className="h-8 w-8 rounded-lg border border-[#1F1F23] bg-[#0A0A0B] flex items-center justify-center text-[#71717A] hover:text-[#A1A1AA] hover:border-[#2A2A2E] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
