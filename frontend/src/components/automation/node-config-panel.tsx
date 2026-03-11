"use client";

import { X } from "lucide-react";
import type { AutomationNodeData, ConditionData, ActionData, DelayData, TriggerData } from "./types";

interface NodeConfigPanelProps {
  nodeId: string;
  data: AutomationNodeData;
  onUpdate: (nodeId: string, data: Partial<AutomationNodeData>) => void;
  onDelete: (nodeId: string) => void;
  onClose: () => void;
}

const operatorOptions = [
  { value: ">", label: "Greater than (>)" },
  { value: "<", label: "Less than (<)" },
  { value: ">=", label: "Greater or equal (≥)" },
  { value: "<=", label: "Less or equal (≤)" },
  { value: "==", label: "Equals (=)" },
  { value: "!=", label: "Not equals (≠)" },
  { value: "contains", label: "Contains" },
  { value: "not_contains", label: "Does not contain" },
];

const fieldOptions = [
  { value: "clv_total", label: "Total Spend (€)" },
  { value: "clv_predicted", label: "Predicted CLV (€)" },
  { value: "clv_order_count", label: "Order Count" },
  { value: "clv_average_order", label: "Avg. Order Value (€)" },
  { value: "rfm_score", label: "RFM Score" },
  { value: "rfm_segment", label: "RFM Segment" },
  { value: "days_inactive", label: "Days Inactive" },
  { value: "category_spend", label: "Category Spend (€)" },
  { value: "tags", label: "Customer Tags" },
];

const segmentOptions = [
  "Champions",
  "Loyal Customers",
  "Potential Loyalists",
  "New Customers",
  "At Risk",
  "Lost",
];

const durationUnits = [
  { value: "minutes", label: "Minutes" },
  { value: "hours", label: "Hours" },
  { value: "days", label: "Days" },
  { value: "weeks", label: "Weeks" },
];

function InputField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-[#71717A] mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full h-9 rounded-lg border border-[#1F1F23] bg-[#0A0A0B] px-3 text-sm text-[#FAFAFA] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-colors";

export function NodeConfigPanel({ nodeId, data, onUpdate, onDelete, onClose }: NodeConfigPanelProps) {
  return (
    <div className="absolute right-0 top-0 bottom-0 w-[340px] bg-[#0E0E10] border-l border-[#1F1F23] z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1F1F23]">
        <h3 className="text-sm font-medium text-[#FAFAFA]">Configure Step</h3>
        <button
          onClick={onClose}
          className="h-7 w-7 rounded-lg flex items-center justify-center text-[#52525B] hover:text-[#A1A1AA] hover:bg-[#1F1F23] transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Label (all nodes) */}
        <InputField label="Step Name">
          <input
            value={data.label}
            onChange={(e) => onUpdate(nodeId, { label: e.target.value })}
            className={inputClass}
          />
        </InputField>

        {/* Trigger config */}
        {data.type === "trigger" && (
          <TriggerConfig data={data as TriggerData} nodeId={nodeId} onUpdate={onUpdate} />
        )}

        {/* Condition config */}
        {data.type === "condition" && (
          <ConditionConfig data={data as ConditionData} nodeId={nodeId} onUpdate={onUpdate} />
        )}

        {/* Action config */}
        {data.type === "action" && (
          <ActionConfig data={data as ActionData} nodeId={nodeId} onUpdate={onUpdate} />
        )}

        {/* Delay config */}
        {data.type === "delay" && (
          <DelayConfig data={data as DelayData} nodeId={nodeId} onUpdate={onUpdate} />
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-[#1F1F23] p-4">
        <button
          onClick={() => onDelete(nodeId)}
          className="w-full h-9 rounded-lg border border-red-400/20 bg-red-400/5 text-red-400 text-sm font-medium hover:bg-red-400/10 transition-colors"
        >
          Delete Step
        </button>
      </div>
    </div>
  );
}

function TriggerConfig({
  data,
  nodeId,
  onUpdate,
}: {
  data: TriggerData;
  nodeId: string;
  onUpdate: NodeConfigPanelProps["onUpdate"];
}) {
  return (
    <div className="rounded-lg border border-[#1F1F23] bg-[#111113] p-3">
      <p className="text-xs text-emerald-400/70 font-medium mb-2">Trigger Type</p>
      <p className="text-sm text-[#A1A1AA]">
        {data.triggerType.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
      </p>
    </div>
  );
}

function ConditionConfig({
  data,
  nodeId,
  onUpdate,
}: {
  data: ConditionData;
  nodeId: string;
  onUpdate: NodeConfigPanelProps["onUpdate"];
}) {
  return (
    <>
      <InputField label="Field">
        <select
          value={data.field}
          onChange={(e) => onUpdate(nodeId, { field: e.target.value } as Partial<ConditionData>)}
          className={inputClass}
        >
          {fieldOptions.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </InputField>

      <InputField label="Operator">
        <select
          value={data.operator}
          onChange={(e) =>
            onUpdate(nodeId, { operator: e.target.value } as Partial<ConditionData>)
          }
          className={inputClass}
        >
          {operatorOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </InputField>

      <InputField label="Value">
        {data.field === "rfm_segment" ? (
          <select
            value={data.value}
            onChange={(e) => onUpdate(nodeId, { value: e.target.value } as Partial<ConditionData>)}
            className={inputClass}
          >
            <option value="">Select segment...</option>
            {segmentOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={["clv_total", "clv_predicted", "clv_order_count", "clv_average_order", "rfm_score", "days_inactive", "category_spend"].includes(data.field) ? "number" : "text"}
            value={data.value}
            onChange={(e) => onUpdate(nodeId, { value: e.target.value } as Partial<ConditionData>)}
            placeholder={data.field.includes("clv") || data.field.includes("spend") ? "e.g. 500" : "Enter value..."}
            className={inputClass}
          />
        )}
      </InputField>

      <div className="rounded-lg border border-[#1F1F23] bg-[#111113] p-3 mt-2">
        <p className="text-[10px] text-[#52525B] uppercase tracking-wider mb-1">Preview</p>
        <p className="text-sm text-[#A1A1AA] font-mono">
          IF {fieldOptions.find((f) => f.value === data.field)?.label || data.field}{" "}
          {operatorOptions.find((o) => o.value === data.operator)?.label?.match(/\((.+)\)/)?.[1] || data.operator}{" "}
          {data.value || "?"}
        </p>
      </div>
    </>
  );
}

function ActionConfig({
  data,
  nodeId,
  onUpdate,
}: {
  data: ActionData;
  nodeId: string;
  onUpdate: NodeConfigPanelProps["onUpdate"];
}) {
  return (
    <>
      <div className="rounded-lg border border-[#1F1F23] bg-[#111113] p-3">
        <p className="text-xs text-blue-400/70 font-medium mb-2">Action Type</p>
        <p className="text-sm text-[#A1A1AA]">
          {data.actionType.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
        </p>
      </div>

      {data.actionType === "send_email" && (
        <>
          <InputField label="Subject">
            <input
              value={(data.config.subject as string) || ""}
              onChange={(e) =>
                onUpdate(nodeId, { config: { ...data.config, subject: e.target.value } } as Partial<ActionData>)
              }
              placeholder="Email subject line..."
              className={inputClass}
            />
          </InputField>
          <InputField label="Template">
            <select
              value={(data.config.template as string) || ""}
              onChange={(e) =>
                onUpdate(nodeId, { config: { ...data.config, template: e.target.value } } as Partial<ActionData>)
              }
              className={inputClass}
            >
              <option value="">Select template...</option>
              <option value="welcome">Welcome Email</option>
              <option value="promotion">Promotion</option>
              <option value="winback">Win-Back</option>
              <option value="custom">Custom HTML</option>
            </select>
          </InputField>
        </>
      )}

      {data.actionType === "send_sms" && (
        <InputField label="Message">
          <textarea
            value={(data.config.message as string) || ""}
            onChange={(e) =>
              onUpdate(nodeId, { config: { ...data.config, message: e.target.value } } as Partial<ActionData>)
            }
            placeholder="SMS message content..."
            rows={3}
            className={`${inputClass} h-auto py-2 resize-none`}
          />
        </InputField>
      )}

      {data.actionType === "add_tag" && (
        <InputField label="Tag Name">
          <input
            value={(data.config.tag as string) || ""}
            onChange={(e) =>
              onUpdate(nodeId, { config: { ...data.config, tag: e.target.value } } as Partial<ActionData>)
            }
            placeholder="e.g. vip, churning, hot-lead"
            className={inputClass}
          />
        </InputField>
      )}

      {data.actionType === "move_to_segment" && (
        <InputField label="Target Segment">
          <select
            value={(data.config.segment as string) || ""}
            onChange={(e) =>
              onUpdate(nodeId, { config: { ...data.config, segment: e.target.value } } as Partial<ActionData>)
            }
            className={inputClass}
          >
            <option value="">Select segment...</option>
            {["Champions", "Loyal Customers", "Potential Loyalists", "At Risk", "Lost", "VIP Newsletter"].map(
              (s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              )
            )}
          </select>
        </InputField>
      )}

      {data.actionType === "webhook" && (
        <InputField label="Webhook URL">
          <input
            value={(data.config.url as string) || ""}
            onChange={(e) =>
              onUpdate(nodeId, { config: { ...data.config, url: e.target.value } } as Partial<ActionData>)
            }
            placeholder="https://..."
            className={inputClass}
          />
        </InputField>
      )}
    </>
  );
}

function DelayConfig({
  data,
  nodeId,
  onUpdate,
}: {
  data: DelayData;
  nodeId: string;
  onUpdate: NodeConfigPanelProps["onUpdate"];
}) {
  return (
    <>
      {data.delayType === "wait_duration" && (
        <div className="flex gap-3">
          <InputField label="Duration">
            <input
              type="number"
              min={1}
              value={data.duration || ""}
              onChange={(e) =>
                onUpdate(nodeId, { duration: Number(e.target.value) } as Partial<DelayData>)
              }
              placeholder="e.g. 3"
              className={inputClass}
            />
          </InputField>
          <InputField label="Unit">
            <select
              value={data.unit || "days"}
              onChange={(e) =>
                onUpdate(nodeId, { unit: e.target.value } as Partial<DelayData>)
              }
              className={inputClass}
            >
              {durationUnits.map((u) => (
                <option key={u.value} value={u.value}>
                  {u.label}
                </option>
              ))}
            </select>
          </InputField>
        </div>
      )}

      {data.delayType === "wait_until" && (
        <InputField label="Wait Until">
          <input
            type="datetime-local"
            value={(data as unknown as Record<string, string>).until || ""}
            onChange={(e) =>
              onUpdate(nodeId, { until: e.target.value } as unknown as Partial<DelayData>)
            }
            className={inputClass}
          />
        </InputField>
      )}

      {data.delayType === "wait_for_event" && (
        <InputField label="Event Name">
          <input
            value={(data as unknown as Record<string, string>).eventName || ""}
            onChange={(e) =>
              onUpdate(nodeId, { eventName: e.target.value } as unknown as Partial<DelayData>)
            }
            placeholder="e.g. purchase, page_view"
            className={inputClass}
          />
        </InputField>
      )}
    </>
  );
}
