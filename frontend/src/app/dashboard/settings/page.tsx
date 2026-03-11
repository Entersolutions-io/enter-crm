"use client";

import { useState } from "react";
import { getUser, getTenant } from "@/lib/auth";

export default function SettingsPage() {
  const user = getUser();
  const tenant = getTenant();

  const [companyName, setCompanyName] = useState(String(tenant?.name || ""));
  const [userName, setUserName] = useState(String(user?.name || ""));
  const [userEmail] = useState(String(user?.email || ""));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#FAFAFA]" style={{ letterSpacing: "-0.025em" }}>
          Settings
        </h1>
        <p className="text-sm text-[#71717A] mt-1">
          Manage your account and workspace
        </p>
      </div>

      {/* Company */}
      <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6">
        <h2 className="text-sm font-medium text-[#FAFAFA] mb-4">Workspace</h2>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs text-[#71717A] mb-1.5">Company Name</label>
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full h-9 rounded-lg border border-[#1F1F23] bg-[#0A0A0B] px-3 text-sm text-[#FAFAFA] placeholder:text-[#52525B] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-[#71717A] mb-1.5">Workspace ID</label>
            <input
              value={String(tenant?.id || "")}
              disabled
              className="w-full h-9 rounded-lg border border-[#1F1F23] bg-[#0A0A0B] px-3 text-sm text-[#52525B] font-mono"
            />
          </div>
        </div>
      </div>

      {/* Profile */}
      <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6">
        <h2 className="text-sm font-medium text-[#FAFAFA] mb-4">Profile</h2>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs text-[#71717A] mb-1.5">Full Name</label>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full h-9 rounded-lg border border-[#1F1F23] bg-[#0A0A0B] px-3 text-sm text-[#FAFAFA] placeholder:text-[#52525B] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-[#71717A] mb-1.5">Email</label>
            <input
              value={userEmail}
              disabled
              className="w-full h-9 rounded-lg border border-[#1F1F23] bg-[#0A0A0B] px-3 text-sm text-[#52525B]"
            />
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="rounded-xl border border-red-400/20 bg-red-400/[0.03] p-6">
        <h2 className="text-sm font-medium text-red-400 mb-1">Danger Zone</h2>
        <p className="text-xs text-[#52525B] mb-4">
          Permanently delete your workspace and all associated data.
        </p>
        <button className="h-9 px-4 rounded-lg border border-red-400/20 bg-red-400/10 text-red-400 text-sm font-medium hover:bg-red-400/20 transition-colors">
          Delete Workspace
        </button>
      </div>
    </div>
  );
}
