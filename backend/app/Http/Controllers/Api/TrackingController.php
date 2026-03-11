<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ApiKey;
use App\Models\Customer;
use App\Models\Event;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TrackingController extends Controller
{
    public function ingest(Request $request): JsonResponse
    {
        $apiKeyHeader = $request->header('X-API-Key') ?? $request->input('api_key');

        if (! $apiKeyHeader) {
            return response()->json(['error' => 'Missing API key.'], 401);
        }

        $apiKey = ApiKey::findByKey($apiKeyHeader);

        if (! $apiKey || $apiKey->isExpired()) {
            return response()->json(['error' => 'Invalid or expired API key.'], 401);
        }

        $apiKey->markUsed();
        $tenantId = $apiKey->tenant_id;

        $validated = $request->validate([
            'event' => ['required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:100'],
            'properties' => ['nullable', 'array'],
            'monetary_value' => ['nullable', 'numeric'],
            'visitor_id' => ['nullable', 'string', 'max:255'],
            'session_id' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'string', 'email', 'max:255'],
            'page_url' => ['nullable', 'string'],
            'page_title' => ['nullable', 'string', 'max:255'],
            'referrer' => ['nullable', 'string'],
            'utm_source' => ['nullable', 'string', 'max:255'],
            'utm_medium' => ['nullable', 'string', 'max:255'],
            'utm_campaign' => ['nullable', 'string', 'max:255'],
        ]);

        // Resolve or create customer
        $customer = null;
        if (! empty($validated['email'])) {
            $customer = Customer::firstOrCreate(
                ['tenant_id' => $tenantId, 'email' => $validated['email']],
                ['uuid' => Str::uuid()->toString()]
            );
        } elseif (! empty($validated['visitor_id'])) {
            $customer = Customer::where('tenant_id', $tenantId)
                ->where('external_id', $validated['visitor_id'])
                ->first();

            if (! $customer) {
                $customer = Customer::create([
                    'tenant_id' => $tenantId,
                    'external_id' => $validated['visitor_id'],
                ]);
            }
        }

        $event = Event::create([
            'tenant_id' => $tenantId,
            'customer_id' => $customer?->id,
            'session_id' => $validated['session_id'] ?? null,
            'event_name' => $validated['event'],
            'event_category' => $validated['category'] ?? null,
            'properties' => $validated['properties'] ?? null,
            'monetary_value' => $validated['monetary_value'] ?? null,
            'source' => 'js_snippet',
            'page_url' => $validated['page_url'] ?? null,
            'page_title' => $validated['page_title'] ?? null,
            'referrer_url' => $validated['referrer'] ?? null,
            'utm_source' => $validated['utm_source'] ?? null,
            'utm_medium' => $validated['utm_medium'] ?? null,
            'utm_campaign' => $validated['utm_campaign'] ?? null,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'occurred_at' => now(),
        ]);

        // Update customer activity
        if ($customer) {
            $updates = [
                'last_seen_at' => now(),
                'last_activity_at' => now(),
                'total_events' => $customer->total_events + 1,
            ];
            if (! $customer->first_seen_at) {
                $updates['first_seen_at'] = now();
            }
            if ($validated['monetary_value'] ?? null) {
                $updates['clv_total'] = $customer->clv_total + $validated['monetary_value'];
                $updates['clv_order_count'] = $customer->clv_order_count + 1;
                $updates['clv_average_order'] = ($customer->clv_total + $validated['monetary_value']) / ($customer->clv_order_count + 1);
            }
            $customer->update($updates);
        }

        return response()->json(['ok' => true, 'event_id' => $event->id], 201);
    }
}
