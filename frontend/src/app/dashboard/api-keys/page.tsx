"use client";

import { useState, useEffect } from "react";
import { Plus, Key, Copy, Check, Trash2, Eye, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

interface ApiKeyItem {
  id: string;
  name: string;
  key: string;
  type: "public" | "private";
  last_used_at: string | null;
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
}

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKeyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [keyType, setKeyType] = useState<"public" | "private">("public");

  useEffect(() => {
    fetchKeys();
  }, []);

  async function fetchKeys() {
    try {
      const res = await api<ApiKeyItem[]>("/api-keys");
      setKeys(res);
    } catch {
      // empty
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate() {
    if (!keyName.trim()) return;
    setCreating(true);
    try {
      const res = await api<{ api_key: ApiKeyItem; plain_key: string }>("/api-keys", {
        method: "POST",
        body: JSON.stringify({ name: keyName, type: keyType }),
      });
      setNewKey(res.plain_key);
      setShowForm(false);
      setKeyName("");
      fetchKeys();
    } catch {
      // empty
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await api(`/api-keys/${id}`, { method: "DELETE" });
      setKeys((prev) => prev.filter((k) => k.id !== id));
    } catch {
      // empty
    }
  }

  function copyKey() {
    if (newKey) {
      navigator.clipboard.writeText(newKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#FAFAFA]" style={{ letterSpacing: "-0.025em" }}>
            API Keys
          </h1>
          <p className="text-sm text-[#71717A] mt-1">
            Manage keys for the tracking SDK and API access
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="h-9 px-4 rounded-lg bg-[#6366F1] hover:bg-[#5558E6] text-white text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Key
        </button>
      </div>

      {/* New key display */}
      {newKey && (
        <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] p-4">
          <p className="text-sm text-emerald-400 font-medium mb-2">
            Your new API key (copy it now — it won&apos;t be shown again):
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-[#0A0A0B] border border-[#1F1F23] rounded-lg px-3 py-2 text-sm text-[#FAFAFA] font-mono">
              {newKey}
            </code>
            <button
              onClick={copyKey}
              className="h-9 w-9 rounded-lg border border-[#1F1F23] bg-[#0A0A0B] flex items-center justify-center text-[#71717A] hover:text-[#A1A1AA] transition-colors"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
          <button
            onClick={() => setNewKey(null)}
            className="text-xs text-[#52525B] hover:text-[#71717A] mt-2 transition-colors"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Create form */}
      {showForm && (
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5">
          <h3 className="text-sm font-medium text-[#FAFAFA] mb-4">Create new API key</h3>
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label className="block text-xs text-[#71717A] mb-1.5">Key Name</label>
              <input
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                placeholder="e.g. Production Tracking"
                className="w-full h-9 rounded-lg border border-[#1F1F23] bg-[#0A0A0B] px-3 text-sm text-[#FAFAFA] placeholder:text-[#52525B] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-colors"
              />
            </div>
            <div className="w-32">
              <label className="block text-xs text-[#71717A] mb-1.5">Type</label>
              <select
                value={keyType}
                onChange={(e) => setKeyType(e.target.value as "public" | "private")}
                className="w-full h-9 rounded-lg border border-[#1F1F23] bg-[#0A0A0B] px-3 text-sm text-[#FAFAFA] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-colors"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            <button
              onClick={handleCreate}
              disabled={creating || !keyName.trim()}
              className="h-9 px-4 rounded-lg bg-[#6366F1] hover:bg-[#5558E6] text-white text-sm font-medium transition-colors disabled:opacity-50"
            >
              {creating ? "Creating..." : "Create"}
            </button>
            <button
              onClick={() => { setShowForm(false); setKeyName(""); }}
              className="h-9 px-3 rounded-lg border border-[#1F1F23] text-[#71717A] text-sm hover:text-[#A1A1AA] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Keys list */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5 animate-pulse">
              <div className="h-4 w-32 bg-[#1F1F23] rounded mb-2" />
              <div className="h-3 w-24 bg-[#1F1F23] rounded" />
            </div>
          ))}
        </div>
      ) : keys.length === 0 && !showForm ? (
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] flex flex-col items-center justify-center py-16">
          <div className="h-12 w-12 rounded-full bg-[#6366F1]/10 flex items-center justify-center mb-4">
            <Key className="h-6 w-6 text-[#6366F1]" />
          </div>
          <p className="text-sm text-[#71717A]">No API keys yet</p>
          <p className="text-xs text-[#52525B] mt-1">Create a key to start tracking events</p>
        </div>
      ) : (
        <div className="space-y-3">
          {keys.map((key) => (
            <div
              key={key.id}
              className="rounded-xl border border-[#1F1F23] bg-[#111113] px-5 py-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-[#6366F1]/10 flex items-center justify-center">
                  <Key className="h-4 w-4 text-[#6366F1]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-[#FAFAFA]">{key.name}</h3>
                    <Badge
                      variant="outline"
                      className={`text-[10px] uppercase tracking-wider ${
                        key.type === "private"
                          ? "bg-amber-400/10 text-amber-400 border-amber-400/20"
                          : "bg-[#1F1F23] text-[#71717A] border-[#2A2A2E]"
                      }`}
                    >
                      {key.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#52525B] mt-0.5 font-mono">
                    {key.key}
                    {key.last_used_at && (
                      <span className="ml-3 font-sans">
                        Last used {new Date(key.last_used_at).toLocaleDateString()}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(key.id)}
                className="h-8 w-8 rounded-lg flex items-center justify-center text-[#52525B] hover:text-red-400 hover:bg-red-400/10 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
