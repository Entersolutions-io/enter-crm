<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Segment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SegmentController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $tenant = $request->user()->currentTenant();
        if (! $tenant) {
            return response()->json(['error' => 'No active tenant.'], 403);
        }

        $segments = Segment::where('tenant_id', $tenant->id)
            ->orderByDesc('updated_at')
            ->paginate($request->input('per_page', 25));

        return response()->json($segments);
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
            'type' => ['required', 'string', 'in:auto,manual'],
            'rules' => ['nullable', 'array'],
        ]);

        $segment = Segment::create(array_merge($validated, [
            'tenant_id' => $tenant->id,
            'slug' => Str::slug($validated['name']),
        ]));

        return response()->json($segment, 201);
    }

    public function show(Request $request, Segment $segment): JsonResponse
    {
        $tenant = $request->user()->currentTenant();
        if (! $tenant || $segment->tenant_id !== $tenant->id) {
            return response()->json(['error' => 'Not found.'], 404);
        }

        return response()->json($segment);
    }

    public function update(Request $request, Segment $segment): JsonResponse
    {
        $tenant = $request->user()->currentTenant();
        if (! $tenant || $segment->tenant_id !== $tenant->id) {
            return response()->json(['error' => 'Not found.'], 404);
        }

        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'rules' => ['nullable', 'array'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        if (isset($validated['name'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $segment->update($validated);

        return response()->json($segment);
    }

    public function destroy(Request $request, Segment $segment): JsonResponse
    {
        $tenant = $request->user()->currentTenant();
        if (! $tenant || $segment->tenant_id !== $tenant->id) {
            return response()->json(['error' => 'Not found.'], 404);
        }

        $segment->delete();

        return response()->json(['message' => 'Segment deleted.']);
    }
}
