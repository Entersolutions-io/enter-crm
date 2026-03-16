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
        if ($platform = $request->input('ad_platform')) {
            $query->where('ad_platform', $platform);
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
            'type' => ['required', 'string', 'in:email,sms,call_list,ads'],
            'segment_id' => ['nullable', 'exists:segments,id'],
            'subject' => ['nullable', 'string', 'max:255'],
            'body_html' => ['nullable', 'string'],
            'body_text' => ['nullable', 'string'],
            'settings' => ['nullable', 'array'],
            'scheduled_at' => ['nullable', 'date'],
            // Ad-specific fields
            'ad_platform' => ['nullable', 'string', 'in:google,meta,tiktok,linkedin,twitter'],
            'ad_account_id' => ['nullable', 'string', 'max:255'],
            'ad_campaign_id' => ['nullable', 'string', 'max:255'],
            'target_audience' => ['nullable', 'array'],
            'ad_creatives' => ['nullable', 'array'],
            'ad_spend' => ['nullable', 'numeric', 'min:0'],
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

        $campaign->load(['segment', 'creator']);

        // Standard rates
        $sent = max($campaign->total_sent, 1);
        $rates = [
            'delivery_rate' => $campaign->total_delivered > 0 ? round(($campaign->total_delivered / $sent) * 100, 1) : 0,
            'open_rate' => $campaign->total_opened > 0 ? round(($campaign->total_opened / $sent) * 100, 1) : 0,
            'click_rate' => $campaign->total_clicked > 0 ? round(($campaign->total_clicked / $sent) * 100, 1) : 0,
            'bounce_rate' => $campaign->total_bounced > 0 ? round(($campaign->total_bounced / $sent) * 100, 1) : 0,
            'unsubscribe_rate' => $campaign->total_unsubscribed > 0 ? round(($campaign->total_unsubscribed / $sent) * 100, 1) : 0,
        ];

        // Ad-specific rates (computed from stored metrics)
        $adRates = [];
        if ($campaign->type === 'ads') {
            $impressions = max($campaign->impressions, 1);
            $adRates = [
                'ctr' => $campaign->clicks > 0 ? round(($campaign->clicks / $impressions) * 100, 2) : 0,
                'cpc' => $campaign->clicks > 0 ? round($campaign->ad_spend / $campaign->clicks, 2) : 0,
                'cpm' => round(($campaign->ad_spend / $impressions) * 1000, 2),
                'roas' => $campaign->ad_spend > 0 ? round($campaign->revenue_attributed / $campaign->ad_spend, 2) : 0,
                'conversion_rate' => $campaign->clicks > 0 ? round(($campaign->conversions / $campaign->clicks) * 100, 2) : 0,
                'cost_per_conversion' => $campaign->conversions > 0 ? round($campaign->ad_spend / $campaign->conversions, 2) : 0,
            ];
        }

        // Messages
        $messages = $campaign->messages()
            ->with('customer:id,first_name,last_name,email')
            ->orderByDesc('created_at')
            ->limit(50)
            ->get();

        return response()->json([
            'campaign' => $campaign,
            'rates' => $rates,
            'ad_rates' => $adRates,
            'messages' => $messages,
        ]);
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
            'ad_platform' => ['nullable', 'string', 'in:google,meta,tiktok,linkedin,twitter'],
            'ad_account_id' => ['nullable', 'string', 'max:255'],
            'ad_campaign_id' => ['nullable', 'string', 'max:255'],
            'target_audience' => ['nullable', 'array'],
            'ad_creatives' => ['nullable', 'array'],
            'ad_spend' => ['nullable', 'numeric', 'min:0'],
            // Allow updating ad metrics (e.g. from sync/webhook)
            'impressions' => ['nullable', 'integer', 'min:0'],
            'reach' => ['nullable', 'integer', 'min:0'],
            'clicks' => ['nullable', 'integer', 'min:0'],
            'conversions' => ['nullable', 'integer', 'min:0'],
            'revenue_attributed' => ['nullable', 'numeric', 'min:0'],
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

        return response()->json(['message' => 'Campaign sending started.']);
    }
}
