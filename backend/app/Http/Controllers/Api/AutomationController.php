<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Automation;
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
