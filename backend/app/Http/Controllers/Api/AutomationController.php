<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Automation;
use App\Models\AutomationStep;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AutomationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $tenant = $request->user()->currentTenant();
        if (! $tenant) {
            return response()->json(['error' => 'No active tenant.'], 403);
        }

        $automations = Automation::where('tenant_id', $tenant->id)
            ->orderByDesc('updated_at')
            ->paginate($request->input('per_page', 25));

        return response()->json($automations);
    }

    public function store(Request $request): JsonResponse
    {
        $tenant = $request->user()->currentTenant();
        if (! $tenant) {
            return response()->json(['error' => 'No active tenant.'], 403);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'trigger_type' => ['required', 'string', 'in:event,segment_enter,segment_leave,date_field,manual,api'],
            'trigger_config' => ['nullable', 'array'],
        ]);

        $automation = Automation::create(array_merge($validated, [
            'tenant_id' => $tenant->id,
            'created_by' => $request->user()->id,
        ]));

        return response()->json($automation, 201);
    }

    public function show(Request $request, Automation $automation): JsonResponse
    {
        $tenant = $request->user()->currentTenant();
        if (! $tenant || $automation->tenant_id !== $tenant->id) {
            return response()->json(['error' => 'Not found.'], 404);
        }

        $automation->load('steps');

        return response()->json($automation);
    }

    public function saveDesign(Request $request, Automation $automation): JsonResponse
    {
        $tenant = $request->user()->currentTenant();
        if (! $tenant || $automation->tenant_id !== $tenant->id) {
            return response()->json(['error' => 'Not found.'], 404);
        }

        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'nodes' => ['required', 'array'],
            'edges' => ['required', 'array'],
            'activate' => ['nullable', 'boolean'],
        ]);

        if (isset($validated['name'])) {
            $automation->update(['name' => $validated['name']]);
        }

        // Derive trigger_type from the trigger node
        $triggerNode = collect($validated['nodes'])->firstWhere('type', 'trigger');
        if ($triggerNode) {
            $triggerType = $triggerNode['data']['triggerType'] ?? 'event';
            $triggerTypeMap = [
                'customer_created' => 'event',
                'purchase_made' => 'event',
                'inactive_period' => 'event',
                'segment_entered' => 'segment_enter',
                'event_tracked' => 'event',
                'rfm_changed' => 'event',
            ];
            $automation->update([
                'trigger_type' => $triggerTypeMap[$triggerType] ?? 'event',
                'trigger_config' => $triggerNode['data']['config'] ?? [],
            ]);
        }

        // Delete existing steps and rebuild
        AutomationStep::where('automation_id', $automation->id)->delete();

        $nodes = collect($validated['nodes']);
        $edges = collect($validated['edges']);

        // Build a map of node_id => step record
        $stepMap = [];
        $position = 0;

        foreach ($nodes as $node) {
            $nodeData = $node['data'] ?? [];
            $type = $node['type'] ?? 'action';
            $actionType = $nodeData['triggerType']
                ?? $nodeData['conditionType']
                ?? $nodeData['actionType']
                ?? $nodeData['delayType']
                ?? null;

            $step = AutomationStep::create([
                'tenant_id' => $tenant->id,
                'automation_id' => $automation->id,
                'type' => $type,
                'action_type' => $actionType,
                'config' => [
                    'node_id' => $node['id'],
                    'position_x' => $node['position']['x'] ?? 0,
                    'position_y' => $node['position']['y'] ?? 0,
                    'node_data' => $nodeData,
                ],
                'position' => $position++,
            ]);

            $stepMap[$node['id']] = $step;
        }

        // Set parent relationships based on edges
        foreach ($edges as $edge) {
            $sourceId = $edge['source'] ?? null;
            $targetId = $edge['target'] ?? null;
            $sourceHandle = $edge['sourceHandle'] ?? null;

            if ($sourceId && $targetId && isset($stepMap[$targetId]) && isset($stepMap[$sourceId])) {
                $stepMap[$targetId]->update([
                    'parent_step_id' => $stepMap[$sourceId]->id,
                    'branch_label' => $sourceHandle,
                ]);
            }
        }

        // Store the full flow design as JSON in trigger_config for easy reload
        $automation->update([
            'trigger_config' => array_merge($automation->trigger_config ?? [], [
                'flow_nodes' => $validated['nodes'],
                'flow_edges' => $validated['edges'],
            ]),
        ]);

        // Handle activation
        if (! empty($validated['activate'])) {
            $automation->update(['is_active' => true]);
        }

        $automation->load('steps');

        return response()->json([
            'message' => ! empty($validated['activate']) ? 'Automation saved and activated.' : 'Automation draft saved.',
            'automation' => $automation,
        ]);
    }

    public function update(Request $request, Automation $automation): JsonResponse
    {
        $tenant = $request->user()->currentTenant();
        if (! $tenant || $automation->tenant_id !== $tenant->id) {
            return response()->json(['error' => 'Not found.'], 404);
        }

        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'trigger_type' => ['sometimes', 'string', 'in:event,segment_enter,segment_leave,date_field,manual,api'],
            'trigger_config' => ['nullable', 'array'],
        ]);

        $automation->update($validated);

        return response()->json($automation);
    }

    public function destroy(Request $request, Automation $automation): JsonResponse
    {
        $tenant = $request->user()->currentTenant();
        if (! $tenant || $automation->tenant_id !== $tenant->id) {
            return response()->json(['error' => 'Not found.'], 404);
        }

        $automation->delete();

        return response()->json(['message' => 'Automation deleted.']);
    }

    public function toggle(Request $request, Automation $automation): JsonResponse
    {
        $tenant = $request->user()->currentTenant();
        if (! $tenant || $automation->tenant_id !== $tenant->id) {
            return response()->json(['error' => 'Not found.'], 404);
        }

        $automation->update(['is_active' => ! $automation->is_active]);

        return response()->json([
            'message' => $automation->is_active ? 'Automation activated.' : 'Automation deactivated.',
            'is_active' => $automation->is_active,
        ]);
    }
}
