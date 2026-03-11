<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Models\Customer;
use App\Models\Event;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function overview(Request $request): JsonResponse
    {
        $tenant = $request->user()->currentTenant();

        if (! $tenant) {
            return response()->json(['error' => 'No active tenant.'], 403);
        }

        $tenantId = $tenant->id;

        $totalCustomers = Customer::where('tenant_id', $tenantId)->count();
        $activeCustomers = Customer::where('tenant_id', $tenantId)
            ->where('last_activity_at', '>=', now()->subDays(30))
            ->count();
        $totalRevenue = Customer::where('tenant_id', $tenantId)->sum('clv_total');
        $avgOrderValue = Customer::where('tenant_id', $tenantId)
            ->where('clv_order_count', '>', 0)
            ->avg('clv_average_order') ?? 0;

        $eventsToday = Event::where('tenant_id', $tenantId)
            ->where('occurred_at', '>=', now()->startOfDay())
            ->count();
        $eventsThisWeek = Event::where('tenant_id', $tenantId)
            ->where('occurred_at', '>=', now()->startOfWeek())
            ->count();

        $activeCampaigns = Campaign::where('tenant_id', $tenantId)
            ->whereIn('status', ['sending', 'scheduled'])
            ->count();

        // RFM distribution
        $rfmDistribution = Customer::where('tenant_id', $tenantId)
            ->whereNotNull('rfm_segment')
            ->selectRaw('rfm_segment, count(*) as count')
            ->groupBy('rfm_segment')
            ->pluck('count', 'rfm_segment');

        // Recent customers
        $recentCustomers = Customer::where('tenant_id', $tenantId)
            ->orderByDesc('created_at')
            ->limit(5)
            ->get(['id', 'uuid', 'first_name', 'last_name', 'email', 'clv_total', 'rfm_segment', 'created_at']);

        return response()->json([
            'stats' => [
                'total_customers' => $totalCustomers,
                'active_customers' => $activeCustomers,
                'total_revenue' => round($totalRevenue, 2),
                'avg_order_value' => round($avgOrderValue, 2),
                'events_today' => $eventsToday,
                'events_this_week' => $eventsThisWeek,
                'active_campaigns' => $activeCampaigns,
            ],
            'rfm_distribution' => $rfmDistribution,
            'recent_customers' => $recentCustomers,
        ]);
    }
}
