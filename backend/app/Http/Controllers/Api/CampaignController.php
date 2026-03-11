<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CampaignController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $tenant = $request->user()->currentTenant();
        if (! $tenant) {
            return response()->json(['error' => 'No active tenant.'], 403);
        }

        $query = Campaign::where('tenant_id', $tenant->id);

        if ($type = $request->input('type')) {
            $query->where('type', $type);
        }
        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        $campaigns = $query->orderByDesc('updated_at')
            ->paginate($request->input('per_page', 25));

        return response()->json($campaigns);
    }

    public function store(Request $request): JsonResponse
    {
        $tenant = $request->user()->currentTenant();
        if (! $tenant) {
            return response()->json(['error' => 'No active tenant.'], 403);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'in:email,sms,call_list'],
            'segment_id' => ['nullable', 'exists:segments,id'],
            'subject' => ['nullable', 'string', 'max:255'],
            'body_html' => ['nullable', 'string'],
            'body_text' => ['nullable', 'string'],
            'settings' => ['nullable', 'array'],
            'scheduled_at' => ['nullable', 'date'],
        ]);

        $campaign = Campaign::create(array_merge($validated, [
            'tenant_id' => $tenant->id,
            'created_by' => $request->user()->id,
        ]));

        return response()->json($campaign, 201);
    }

    public function show(Request $request, Campaign $campaign): JsonResponse
    {
        $tenant = $request->user()->currentTenant();
        if (! $tenant || $campaign->tenant_id !== $tenant->id) {
            return response()->json(['error' => 'Not found.'], 404);
        }

        $campaign->load('segment');

        return response()->json($campaign);
    }

    public function update(Request $request, Campaign $campaign): JsonResponse
    {
        $tenant = $request->user()->currentTenant();
        if (! $tenant || $campaign->tenant_id !== $tenant->id) {
            return response()->json(['error' => 'Not found.'], 404);
        }

        if ($campaign->status === 'sent') {
            return response()->json(['error' => 'Cannot edit a sent campaign.'], 422);
        }

        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'segment_id' => ['nullable', 'exists:segments,id'],
            'subject' => ['nullable', 'string', 'max:255'],
            'body_html' => ['nullable', 'string'],
            'body_text' => ['nullable', 'string'],
            'settings' => ['nullable', 'array'],
            'scheduled_at' => ['nullable', 'date'],
        ]);

        $campaign->update($validated);

        return response()->json($campaign);
    }

    public function destroy(Request $request, Campaign $campaign): JsonResponse
    {
        $tenant = $request->user()->currentTenant();
        if (! $tenant || $campaign->tenant_id !== $tenant->id) {
            return response()->json(['error' => 'Not found.'], 404);
        }

        $campaign->delete();

        return response()->json(['message' => 'Campaign deleted.']);
    }

    public function send(Request $request, Campaign $campaign): JsonResponse
    {
        $tenant = $request->user()->currentTenant();
        if (! $tenant || $campaign->tenant_id !== $tenant->id) {
            return response()->json(['error' => 'Not found.'], 404);
        }

        if (! in_array($campaign->status, ['draft', 'scheduled'])) {
            return response()->json(['error' => 'Campaign cannot be sent in its current state.'], 422);
        }

        $campaign->update([
            'status' => 'sending',
            'started_at' => now(),
        ]);

        // TODO: Dispatch campaign sending job

        return response()->json(['message' => 'Campaign sending started.']);
    }
}
