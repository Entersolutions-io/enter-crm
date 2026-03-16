<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Models\Customer;
use App\Models\Event;
use App\Models\Segment;
use App\Models\Automation;
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

        // Core stats
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
        $eventsYesterday = Event::where('tenant_id', $tenantId)
            ->where('occurred_at', '>=', now()->subDay()->startOfDay())
            ->where('occurred_at', '<', now()->startOfDay())
            ->count();
        $eventsThisWeek = Event::where('tenant_id', $tenantId)
            ->where('occurred_at', '>=', now()->startOfWeek())
            ->count();

        $activeCampaigns = Campaign::where('tenant_id', $tenantId)
            ->whereIn('status', ['sending', 'scheduled'])
            ->count();
        $totalCampaigns = Campaign::where('tenant_id', $tenantId)->count();

        $activeAutomations = Automation::where('tenant_id', $tenantId)
            ->where('is_active', true)
            ->count();

        $totalSegments = Segment::where('tenant_id', $tenantId)->count();

        // Previous month stats for trends
        $prevMonthCustomers = Customer::where('tenant_id', $tenantId)
            ->where('created_at', '<', now()->startOfMonth())
            ->count();
        $thisMonthCustomers = Customer::where('tenant_id', $tenantId)
            ->where('created_at', '>=', now()->startOfMonth())
            ->count();
        $customerTrend = $prevMonthCustomers > 0
            ? round(($thisMonthCustomers / $prevMonthCustomers) * 100, 1)
            : 0;

        $prevMonthRevenue = Customer::where('tenant_id', $tenantId)
            ->where('created_at', '<', now()->startOfMonth())
            ->sum('clv_total');
        $revenueTrend = $prevMonthRevenue > 0
            ? round((($totalRevenue - $prevMonthRevenue) / $prevMonthRevenue) * 100, 1)
            : 0;

        $eventsTrend = $eventsYesterday > 0
            ? round((($eventsToday - $eventsYesterday) / $eventsYesterday) * 100, 1)
            : 0;

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
            ->get(['id', 'uuid', 'first_name', 'last_name', 'email', 'clv_total', 'rfm_segment', 'last_activity_at', 'created_at']);

        // Top customers by CLV
        $topCustomers = Customer::where('tenant_id', $tenantId)
            ->where('clv_total', '>', 0)
            ->orderByDesc('clv_total')
            ->limit(5)
            ->get(['id', 'uuid', 'first_name', 'last_name', 'email', 'clv_total', 'rfm_segment', 'clv_order_count']);

        // Monthly revenue trend (last 12 months)
        $revenueByMonth = [];
        for ($i = 11; $i >= 0; $i--) {
            $monthStart = now()->subMonths($i)->startOfMonth();
            $monthEnd = now()->subMonths($i)->endOfMonth();
            $monthRevenue = Event::where('tenant_id', $tenantId)
                ->whereNotNull('monetary_value')
                ->where('occurred_at', '>=', $monthStart)
                ->where('occurred_at', '<=', $monthEnd)
                ->sum('monetary_value');
            $revenueByMonth[] = [
                'month' => $monthStart->format('M'),
                'revenue' => round($monthRevenue, 2),
            ];
        }

        // Campaign performance summary
        $campaignStats = Campaign::where('tenant_id', $tenantId)
            ->selectRaw("
                type,
                count(*) as total,
                sum(total_sent) as sent,
                sum(total_opened) as opened,
                sum(total_clicked) as clicked
            ")
            ->groupBy('type')
            ->get();

        // Recent activity feed
        $recentEvents = Event::where('tenant_id', $tenantId)
            ->with('customer:id,first_name,last_name,email')
            ->orderByDesc('occurred_at')
            ->limit(10)
            ->get(['id', 'customer_id', 'event_name', 'event_category', 'monetary_value', 'page_url', 'occurred_at']);

        return response()->json([
            'stats' => [
                'total_customers' => $totalCustomers,
                'active_customers' => $activeCustomers,
                'total_revenue' => round($totalRevenue, 2),
                'avg_order_value' => round($avgOrderValue, 2),
                'events_today' => $eventsToday,
                'events_this_week' => $eventsThisWeek,
                'active_campaigns' => $activeCampaigns,
                'total_campaigns' => $totalCampaigns,
                'active_automations' => $activeAutomations,
                'total_segments' => $totalSegments,
                'customer_trend' => $customerTrend,
                'revenue_trend' => $revenueTrend,
                'events_trend' => $eventsTrend,
            ],
            'rfm_distribution' => $rfmDistribution,
            'recent_customers' => $recentCustomers,
            'top_customers' => $topCustomers,
            'revenue_by_month' => $revenueByMonth,
            'campaign_stats' => $campaignStats,
            'recent_events' => $recentEvents,
        ]);
    }
}
