<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $tenant = $request->user()->currentTenant();
        if (! $tenant) {
            return response()->json(['error' => 'No active tenant.'], 403);
        }

        $query = Customer::where('tenant_id', $tenant->id);

        // Search
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('email', 'like', "%{$search}%")
                    ->orWhere('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('company_name', 'like', "%{$search}%");
            });
        }

        // Filter by segment
        if ($segment = $request->input('rfm_segment')) {
            $query->where('rfm_segment', $segment);
        }

        // Sort
        $sortBy = $request->input('sort', 'created_at');
        $sortDir = $request->input('dir', 'desc');
        $allowedSorts = ['created_at', 'clv_total', 'last_activity_at', 'rfm_score', 'total_events'];
        if (in_array($sortBy, $allowedSorts)) {
            $query->orderBy($sortBy, $sortDir === 'asc' ? 'asc' : 'desc');
        }

        $customers = $query->paginate($request->input('per_page', 25));

        return response()->json($customers);
    }

    public function store(Request $request): JsonResponse
    {
        $tenant = $request->user()->currentTenant();
        if (! $tenant) {
            return response()->json(['error' => 'No active tenant.'], 403);
        }

        $validated = $request->validate([
            'email' => ['nullable', 'string', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'first_name' => ['nullable', 'string', 'max:255'],
            'last_name' => ['nullable', 'string', 'max:255'],
            'company_name' => ['nullable', 'string', 'max:255'],
            'external_id' => ['nullable', 'string', 'max:255'],
            'properties' => ['nullable', 'array'],
            'tags' => ['nullable', 'array'],
        ]);

        $customer = Customer::create(array_merge($validated, [
            'tenant_id' => $tenant->id,
        ]));

        return response()->json($customer, 201);
    }

    public function show(Request $request, Customer $customer): JsonResponse
    {
        $tenant = $request->user()->currentTenant();
        if (! $tenant || $customer->tenant_id !== $tenant->id) {
            return response()->json(['error' => 'Not found.'], 404);
        }

        $customer->load(['segments', 'events' => function ($q) {
            $q->orderByDesc('occurred_at')->limit(20);
        }]);

        return response()->json($customer);
    }

    public function update(Request $request, Customer $customer): JsonResponse
    {
        $tenant = $request->user()->currentTenant();
        if (! $tenant || $customer->tenant_id !== $tenant->id) {
            return response()->json(['error' => 'Not found.'], 404);
        }

        $validated = $request->validate([
            'email' => ['nullable', 'string', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'first_name' => ['nullable', 'string', 'max:255'],
            'last_name' => ['nullable', 'string', 'max:255'],
            'company_name' => ['nullable', 'string', 'max:255'],
            'properties' => ['nullable', 'array'],
            'tags' => ['nullable', 'array'],
            'is_subscribed_email' => ['nullable', 'boolean'],
            'is_subscribed_sms' => ['nullable', 'boolean'],
        ]);

        $customer->update($validated);

        return response()->json($customer);
    }

    public function destroy(Request $request, Customer $customer): JsonResponse
    {
        $tenant = $request->user()->currentTenant();
        if (! $tenant || $customer->tenant_id !== $tenant->id) {
            return response()->json(['error' => 'Not found.'], 404);
        }

        $customer->delete();

        return response()->json(['message' => 'Customer deleted.']);
    }
}
