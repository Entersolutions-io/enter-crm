<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ApiKey;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApiKeyController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $tenant = $request->user()->currentTenant();
        if (! $tenant) {
            return response()->json(['error' => 'No active tenant.'], 403);
        }

        $keys = ApiKey::where('tenant_id', $tenant->id)
            ->orderByDesc('created_at')
            ->get();

        return response()->json($keys);
    }

    public function store(Request $request): JsonResponse
    {
        $tenant = $request->user()->currentTenant();
        if (! $tenant) {
            return response()->json(['error' => 'No active tenant.'], 403);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'in:public,private'],
            'scopes' => ['nullable', 'array'],
            'expires_at' => ['nullable', 'date'],
        ]);

        $result = ApiKey::generate(array_merge($validated, [
            'tenant_id' => $tenant->id,
            'created_by' => $request->user()->id,
        ]));

        return response()->json([
            'api_key' => $result['api_key'],
            'plain_key' => $result['plain_key'],
            'message' => 'Store this key securely. It will not be shown again.',
        ], 201);
    }

    public function show(Request $request, ApiKey $apiKey): JsonResponse
    {
        $tenant = $request->user()->currentTenant();
        if (! $tenant || $apiKey->tenant_id !== $tenant->id) {
            return response()->json(['error' => 'Not found.'], 404);
        }

        return response()->json($apiKey);
    }

    public function destroy(Request $request, ApiKey $apiKey): JsonResponse
    {
        $tenant = $request->user()->currentTenant();
        if (! $tenant || $apiKey->tenant_id !== $tenant->id) {
            return response()->json(['error' => 'Not found.'], 404);
        }

        $apiKey->delete();

        return response()->json(['message' => 'API key deleted.']);
    }

    public function revoke(Request $request, ApiKey $apiKey): JsonResponse
    {
        $tenant = $request->user()->currentTenant();
        if (! $tenant || $apiKey->tenant_id !== $tenant->id) {
            return response()->json(['error' => 'Not found.'], 404);
        }

        $apiKey->update(['is_active' => false]);

        return response()->json(['message' => 'API key revoked.']);
    }
}
