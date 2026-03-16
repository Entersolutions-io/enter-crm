"use client";

import { useState, useCallback, useMemo, useEffect, forwardRef, useImperativeHandle } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  type Connection,
  type Node,
  type Edge,
  type NodeTypes,
  type EdgeTypes,
  MarkerType,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { getLayoutedElements } from "./layout-engine";
import { NodePicker } from "./node-picker";
import { NodeConfigPanel } from "./node-config-panel";
import { InteractiveEdge } from "./edges/interactive-edge";
import TriggerNode from "./nodes/trigger-node";
import ConditionNode from "./nodes/condition-node";
import ActionNode from "./nodes/action-node";
import DelayNode from "./nodes/delay-node";
import type {
  AutomationNodeData,
  ConditionData,
  ActionData,
  DelayData,
  TriggerData,
  NodeCategory,
} from "./types";

export interface AutomationBuilderRef {
  getFlow: () => { nodes: Node[]; edges: Edge[] };
}

interface AutomationBuilderProps {
  initialNodes?: Node[];
  initialEdges?: Edge[];
}

const nodeTypes: NodeTypes = {
  trigger: TriggerNode,
  condition: ConditionNode,
  action: ActionNode,
  delay: DelayNode,
};

const edgeTypes: EdgeTypes = {
  interactive: InteractiveEdge,
};

function makeEdge(
  source: string,
  target: string,
  sourceHandle?: string | null
): Edge {
  const handleSuffix = sourceHandle ? `_${sourceHandle}` : "";
  return {
    id: `e_${source}${handleSuffix}_${target}`,
    source,
    target,
    sourceHandle: sourceHandle || undefined,
    type: "interactive",
    animated: true,
    style: { stroke: "#2A2A2E", strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#2A2A2E",
      width: 16,
      height: 16,
    },
  };
}

function buildNodeData(
  category: NodeCategory,
  template: Record<string, unknown>
): AutomationNodeData {
  switch (category) {
    case "trigger":
      return {
        type: "trigger",
        triggerType: template.triggerType as TriggerData["triggerType"],
        config: {},
        label: template.label as string,
      };
    case "condition":
      return {
        type: "condition",
        conditionType: template.conditionType as ConditionData["conditionType"],
        field: (template.defaultField as string) || "clv_total",
        operator: (template.defaultOp as ConditionData["operator"]) || ">",
        value: "",
        label: template.label as string,
      };
    case "action":
      return {
        type: "action",
        actionType: template.actionType as ActionData["actionType"],
        config: {},
        label: template.label as string,
      };
    case "delay":
      return {
        type: "delay",
        delayType: template.delayType as DelayData["delayType"],
        duration: undefined,
        unit: "days",
        label: template.label as string,
      };
  }
}

// Insertion context: which edge to split when adding a node
interface InsertContext {
  edgeId: string;
  sourceId: string;
  targetId: string;
  sourceHandle: string | null;
}

const FlowCanvas = forwardRef<AutomationBuilderRef, AutomationBuilderProps>(
  function FlowCanvas({ initialNodes: initNodes, initialEdges: initEdges }, ref) {
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [showPicker, setShowPicker] = useState(false);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const [insertContext, setInsertContext] = useState<InsertContext | null>(null);
    const [appendAfter, setAppendAfter] = useState<{
      nodeId: string;
      handle: string | null;
    } | null>(null);
    const [initialized, setInitialized] = useState(false);
    const { fitView } = useReactFlow();

    // Expose getFlow via ref
    useImperativeHandle(ref, () => ({
      getFlow: () => ({ nodes, edges }),
    }), [nodes, edges]);

    // Load initial flow data
    useEffect(() => {
      if (initialized) return;
      if (initNodes && initNodes.length > 0) {
        // Restore edges with interactive type and styling
        const restoredEdges = (initEdges || []).map((e: Edge) => ({
          ...e,
          type: "interactive",
          animated: true,
          style: { stroke: "#2A2A2E", strokeWidth: 2 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#2A2A2E",
            width: 16,
            height: 16,
          },
        }));

        const { nodes: ln, edges: le } = getLayoutedElements(initNodes, restoredEdges);
        setNodes(ln);
        setEdges(le);
        setTimeout(() => fitView({ padding: 0.3, duration: 300 }), 100);
      }
      setInitialized(true);
    }, [initNodes, initEdges, initialized, setNodes, setEdges, fitView]);

    const hasTrigger = nodes.some((n) => n.type === "trigger");

    const selectedNode = useMemo(
      () => nodes.find((n) => n.id === selectedNodeId),
      [nodes, selectedNodeId]
    );

    const handleAddStepOnEdge = useCallback(
      (edgeId: string, sourceId: string, targetId: string, sourceHandle: string | null) => {
        const edge = edges.find((e) => e.id === edgeId);
        if (edge) {
          setInsertContext({
            edgeId: edge.id,
            sourceId: edge.source,
            targetId: edge.target,
            sourceHandle: edge.sourceHandle || null,
          });
        } else {
          setInsertContext({ edgeId, sourceId, targetId, sourceHandle });
        }
        setShowPicker(true);
        setSelectedNodeId(null);
      },
      [edges]
    );

    const handleDeleteEdge = useCallback(
      (edgeId: string) => {
        const newEdges = edges.filter((e) => e.id !== edgeId);
        setEdges(newEdges);
      },
      [edges, setEdges]
    );

    const enrichedEdges = useMemo(
      () =>
        edges.map((edge) => ({
          ...edge,
          data: {
            ...edge.data,
            onAddStep: handleAddStepOnEdge,
            onDeleteEdge: handleDeleteEdge,
          },
        })),
      [edges, handleAddStepOnEdge, handleDeleteEdge]
    );

    const doLayout = useCallback(
      (newNodes: Node[], newEdges: Edge[]) => {
        const { nodes: ln, edges: le } = getLayoutedElements(newNodes, newEdges);
        setNodes(ln);
        setEdges(le);
        setTimeout(() => fitView({ padding: 0.3, duration: 300 }), 50);
      },
      [setNodes, setEdges, fitView]
    );

    const onConnect = useCallback(
      (params: Connection) => {
        const newEdge = makeEdge(params.source, params.target, params.sourceHandle);
        setEdges((eds) => addEdge(newEdge, eds));
      },
      [setEdges]
    );

    const addNode = useCallback(
      (category: NodeCategory, template: Record<string, unknown>) => {
        const id = `node_${Date.now()}`;
        const data = buildNodeData(category, template);

        const newNode: Node = {
          id,
          type: category,
          position: { x: 0, y: 0 },
          data: data as unknown as Record<string, unknown>,
        };

        const newNodes = [...nodes, newNode];
        let newEdges = [...edges];

        if (insertContext) {
          newEdges = newEdges.filter((e) => e.id !== insertContext.edgeId);
          newEdges.push(makeEdge(insertContext.sourceId, id, insertContext.sourceHandle));
          newEdges.push(makeEdge(id, insertContext.targetId));
        } else if (nodes.length > 0) {
          const sourceIds = new Set(edges.map((e) => e.source));
          const leaf = nodes.find((n) => !sourceIds.has(n.id));
          const lastNode = leaf || nodes[nodes.length - 1];
          const leafIsCondition = lastNode.type === "condition";
          newEdges.push(makeEdge(lastNode.id, id, leafIsCondition ? "yes" : null));
        }

        doLayout(newNodes, newEdges);
        setShowPicker(false);
        setInsertContext(null);
      },
      [nodes, edges, insertContext, doLayout]
    );

    const deleteNode = useCallback(
      (nodeId: string) => {
        const parentEdge = edges.find((e) => e.target === nodeId);
        const childEdges = edges.filter((e) => e.source === nodeId);

        let newEdges = edges.filter((e) => e.source !== nodeId && e.target !== nodeId);

        if (parentEdge) {
          childEdges.forEach((ce) => {
            newEdges.push(makeEdge(parentEdge.source, ce.target, parentEdge.sourceHandle));
          });
        }

        const newNodes = nodes.filter((n) => n.id !== nodeId);
        doLayout(newNodes, newEdges);
        setSelectedNodeId(null);
      },
      [nodes, edges, doLayout]
    );

    const updateNodeData = useCallback(
      (nodeId: string, updates: Partial<AutomationNodeData>) => {
        setNodes((nds) =>
          nds.map((n) =>
            n.id === nodeId ? { ...n, data: { ...n.data, ...updates } } : n
          )
        );
      },
      [setNodes]
    );

    const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
      setSelectedNodeId(node.id);
      setShowPicker(false);
    }, []);

    const onPaneClick = useCallback(() => {
      setSelectedNodeId(null);
      setShowPicker(false);
    }, []);

    const openPickerForLeaf = useCallback(() => {
      let targetSource: string | null = null;
      let targetHandle: string | null = null;

      for (const node of [...nodes].reverse()) {
        if (node.type === "condition") {
          const hasYes = edges.some((e) => e.source === node.id && e.sourceHandle === "yes");
          const hasNo = edges.some((e) => e.source === node.id && e.sourceHandle === "no");
          if (!hasYes) {
            targetSource = node.id;
            targetHandle = "yes";
            break;
          }
          if (!hasNo) {
            targetSource = node.id;
            targetHandle = "no";
            break;
          }
        } else {
          const hasOut = edges.some((e) => e.source === node.id);
          if (!hasOut) {
            targetSource = node.id;
            break;
          }
        }
      }

      if (targetSource) {
        setInsertContext(null);
        setAppendAfter({ nodeId: targetSource, handle: targetHandle });
      }

      setShowPicker(true);
      setSelectedNodeId(null);
    }, [nodes, edges]);

    const addNodeWrapped = useCallback(
      (category: NodeCategory, template: Record<string, unknown>) => {
        if (insertContext) {
          addNode(category, template);
          return;
        }

        if (appendAfter) {
          const id = `node_${Date.now()}`;
          const data = buildNodeData(category, template);

          const newNode: Node = {
            id,
            type: category,
            position: { x: 0, y: 0 },
            data: data as unknown as Record<string, unknown>,
          };

          const newNodes = [...nodes, newNode];
          const newEdges = [
            ...edges,
            makeEdge(appendAfter.nodeId, id, appendAfter.handle),
          ];

          doLayout(newNodes, newEdges);
          setShowPicker(false);
          setAppendAfter(null);
          setInsertContext(null);
          return;
        }

        addNode(category, template);
      },
      [insertContext, appendAfter, addNode, nodes, edges, doLayout]
    );

    return (
      <>
        <ReactFlow
          nodes={nodes}
          edges={enrichedEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={{ type: "interactive" }}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          proOptions={{ hideAttribution: true }}
          colorMode="dark"
          className="bg-[#0A0A0B]"
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="#1F1F23"
          />
          <Controls
            className="!bg-[#111113] !border-[#1F1F23] !rounded-lg overflow-hidden [&_button]:!bg-[#111113] [&_button]:!border-[#1F1F23] [&_button]:!text-[#71717A] [&_button:hover]:!bg-[#1A1A1D] [&_button:hover]:!text-[#A1A1AA]"
            showInteractive={false}
          />
          <MiniMap
            className="!bg-[#111113] !border-[#1F1F23] !rounded-lg"
            nodeColor={(n) => {
              switch (n.type) {
                case "trigger":
                  return "#34d399";
                case "condition":
                  return "#fbbf24";
                case "action":
                  return "#60a5fa";
                case "delay":
                  return "#c084fc";
                default:
                  return "#52525B";
              }
            }}
            maskColor="rgba(10, 10, 11, 0.8)"
          />
        </ReactFlow>

        {/* Empty state */}
        {nodes.length === 0 && !showPicker && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="text-center pointer-events-auto">
              <div className="h-14 w-14 rounded-2xl bg-[#6366F1]/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <p className="text-sm text-[#71717A] mb-1">
                Start building your automation
              </p>
              <p className="text-xs text-[#52525B] mb-4">
                Add a trigger to begin the workflow
              </p>
              <button
                onClick={() => {
                  setInsertContext(null);
                  setAppendAfter(null);
                  setShowPicker(true);
                }}
                className="h-10 px-5 rounded-xl bg-[#6366F1] hover:bg-[#5558E6] text-white text-sm font-medium transition-colors shadow-lg shadow-[#6366F1]/20"
              >
                Add Trigger
              </button>
            </div>
          </div>
        )}

        {/* Floating add step button */}
        {nodes.length > 0 && !showPicker && !selectedNode && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
            <button
              onClick={openPickerForLeaf}
              className="h-10 px-5 rounded-xl bg-[#6366F1] hover:bg-[#5558E6] text-white text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-[#6366F1]/20"
            >
              <span className="text-lg leading-none">+</span>
              Add Step
            </button>
          </div>
        )}

        {/* Node picker panel */}
        {showPicker && (
          <NodePicker
            onSelect={addNodeWrapped}
            onClose={() => {
              setShowPicker(false);
              setInsertContext(null);
              setAppendAfter(null);
            }}
            allowedCategories={
              !hasTrigger ? undefined : ["condition", "action", "delay"]
            }
          />
        )}

        {/* Node config panel */}
        {selectedNode && !showPicker && (
          <NodeConfigPanel
            nodeId={selectedNode.id}
            data={selectedNode.data as unknown as AutomationNodeData}
            onUpdate={updateNodeData}
            onDelete={deleteNode}
            onClose={() => setSelectedNodeId(null)}
          />
        )}
      </>
    );
  }
);

export const AutomationBuilder = forwardRef<AutomationBuilderRef, AutomationBuilderProps>(
  function AutomationBuilder(props, ref) {
    return (
      <ReactFlowProvider>
        <FlowCanvas ref={ref} {...props} />
      </ReactFlowProvider>
    );
  }
);
