export type NodeCategory = "trigger" | "condition" | "action" | "delay";

export interface TriggerData {
  type: "trigger";
  triggerType:
    | "customer_created"
    | "purchase_made"
    | "inactive_period"
    | "segment_entered"
    | "event_tracked"
    | "rfm_changed";
  config: Record<string, unknown>;
  label: string;
}

export interface ConditionData {
  type: "condition";
  conditionType:
    | "spend_above"
    | "spend_below"
    | "inactive_days"
    | "order_count"
    | "rfm_segment"
    | "tag_contains"
    | "category_spend"
    | "clv_above"
    | "clv_below"
    | "custom_property";
  field: string;
  operator: ">" | "<" | ">=" | "<=" | "==" | "!=" | "contains" | "not_contains";
  value: string;
  label: string;
}

export interface ActionData {
  type: "action";
  actionType:
    | "send_email"
    | "send_sms"
    | "add_to_call_list"
    | "add_tag"
    | "remove_tag"
    | "move_to_segment"
    | "update_field"
    | "webhook";
  config: Record<string, unknown>;
  label: string;
}

export interface DelayData {
  type: "delay";
  delayType: "wait_duration" | "wait_until" | "wait_for_event";
  duration?: number;
  unit?: "minutes" | "hours" | "days" | "weeks";
  label: string;
}

export type AutomationNodeData = TriggerData | ConditionData | ActionData | DelayData;

export const NODE_TEMPLATES = {
  triggers: [
    { triggerType: "customer_created" as const, label: "Customer Created", icon: "UserPlus" },
    { triggerType: "purchase_made" as const, label: "Purchase Made", icon: "ShoppingCart" },
    { triggerType: "inactive_period" as const, label: "Inactive Period", icon: "Clock" },
    { triggerType: "segment_entered" as const, label: "Segment Entered", icon: "Target" },
    { triggerType: "event_tracked" as const, label: "Event Tracked", icon: "Activity" },
    { triggerType: "rfm_changed" as const, label: "RFM Score Changed", icon: "TrendingUp" },
  ],
  conditions: [
    { conditionType: "spend_above" as const, label: "Spend Above", icon: "ArrowUp", defaultOp: ">" as const, defaultField: "clv_total" },
    { conditionType: "spend_below" as const, label: "Spend Below", icon: "ArrowDown", defaultOp: "<" as const, defaultField: "clv_total" },
    { conditionType: "inactive_days" as const, label: "Inactive For", icon: "Clock", defaultOp: ">" as const, defaultField: "days_inactive" },
    { conditionType: "order_count" as const, label: "Order Count", icon: "Hash", defaultOp: ">=" as const, defaultField: "clv_order_count" },
    { conditionType: "rfm_segment" as const, label: "RFM Segment Is", icon: "BarChart3", defaultOp: "==" as const, defaultField: "rfm_segment" },
    { conditionType: "category_spend" as const, label: "Category Spend", icon: "Tag", defaultOp: ">" as const, defaultField: "category_spend" },
    { conditionType: "clv_above" as const, label: "CLV Above", icon: "TrendingUp", defaultOp: ">" as const, defaultField: "clv_predicted" },
  ],
  actions: [
    { actionType: "send_email" as const, label: "Send Email", icon: "Mail" },
    { actionType: "send_sms" as const, label: "Send SMS", icon: "MessageSquare" },
    { actionType: "add_to_call_list" as const, label: "Add to Call List", icon: "Phone" },
    { actionType: "add_tag" as const, label: "Add Tag", icon: "Tag" },
    { actionType: "remove_tag" as const, label: "Remove Tag", icon: "TagX" },
    { actionType: "move_to_segment" as const, label: "Move to Segment", icon: "Target" },
    { actionType: "update_field" as const, label: "Update Field", icon: "Edit" },
    { actionType: "webhook" as const, label: "Webhook", icon: "Globe" },
  ],
  delays: [
    { delayType: "wait_duration" as const, label: "Wait Duration", icon: "Timer" },
    { delayType: "wait_until" as const, label: "Wait Until Date", icon: "Calendar" },
    { delayType: "wait_for_event" as const, label: "Wait For Event", icon: "Hourglass" },
  ],
} as const;
