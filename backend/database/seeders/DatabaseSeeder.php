<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Segment;
use App\Models\Campaign;
use App\Models\Automation;
use App\Models\ApiKey;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ── Demo user & tenant ─────────────────────────────
        $user = User::create([
            'name' => 'John Doe',
            'email' => 'demo@entercrm.io',
            'password' => Hash::make('password'),
        ]);

        $tenant = Tenant::create([
            'name' => 'EnterSolutions',
        ]);

        $tenant->users()->attach($user->id, ['role' => 'owner']);

        // ── Segments ───────────────────────────────────────
        $segments = collect([
            ['name' => 'Champions', 'type' => 'auto', 'rules' => json_encode(['rfm_score_min' => 9])],
            ['name' => 'Loyal Customers', 'type' => 'auto', 'rules' => json_encode(['rfm_score_min' => 7])],
            ['name' => 'Potential Loyalists', 'type' => 'auto', 'rules' => json_encode(['rfm_score_min' => 5])],
            ['name' => 'At Risk', 'type' => 'auto', 'rules' => json_encode(['recency_score_max' => 2])],
            ['name' => 'Lost', 'type' => 'auto', 'rules' => json_encode(['recency_score_max' => 1])],
            ['name' => 'New Customers', 'type' => 'auto', 'rules' => json_encode(['days_since_first_seen' => 30])],
            ['name' => 'VIP Newsletter', 'type' => 'manual', 'rules' => null],
            ['name' => 'Beta Testers', 'type' => 'manual', 'rules' => null],
        ])->map(function ($s) use ($tenant) {
            return Segment::create([
                'tenant_id' => $tenant->id,
                'name' => $s['name'],
                'slug' => \Illuminate\Support\Str::slug($s['name']),
                'type' => $s['type'],
                'rules' => $s['rules'] ? json_decode($s['rules'], true) : null,
            ]);
        });

        // ── Customers ──────────────────────────────────────
        $customerData = [
            ['first_name' => 'Emma', 'last_name' => 'Schmidt', 'email' => 'emma.schmidt@acme.de', 'company_name' => 'Acme GmbH', 'rfm_segment' => 'Champions', 'rfm_score' => 12, 'clv_total' => 4820.00, 'clv_order_count' => 38],
            ['first_name' => 'Liam', 'last_name' => 'Mueller', 'email' => 'liam@techstart.io', 'company_name' => 'TechStart', 'rfm_segment' => 'Champions', 'rfm_score' => 11, 'clv_total' => 3650.00, 'clv_order_count' => 24],
            ['first_name' => 'Sophie', 'last_name' => 'Weber', 'email' => 'sophie.w@designhaus.com', 'company_name' => 'DesignHaus', 'rfm_segment' => 'Loyal Customers', 'rfm_score' => 9, 'clv_total' => 2890.50, 'clv_order_count' => 18],
            ['first_name' => 'Noah', 'last_name' => 'Fischer', 'email' => 'noah@cloudnine.eu', 'company_name' => 'CloudNine EU', 'rfm_segment' => 'Loyal Customers', 'rfm_score' => 8, 'clv_total' => 2100.00, 'clv_order_count' => 15],
            ['first_name' => 'Mia', 'last_name' => 'Wagner', 'email' => 'mia.wagner@retail.de', 'company_name' => 'RetailPlus', 'rfm_segment' => 'Potential Loyalists', 'rfm_score' => 7, 'clv_total' => 1540.00, 'clv_order_count' => 10],
            ['first_name' => 'Lucas', 'last_name' => 'Becker', 'email' => 'lucas@buildfast.io', 'company_name' => 'BuildFast', 'rfm_segment' => 'Potential Loyalists', 'rfm_score' => 6, 'clv_total' => 980.00, 'clv_order_count' => 8],
            ['first_name' => 'Anna', 'last_name' => 'Hoffmann', 'email' => 'anna@freshfood.de', 'company_name' => 'FreshFood GmbH', 'rfm_segment' => 'New Customers', 'rfm_score' => 5, 'clv_total' => 320.00, 'clv_order_count' => 3],
            ['first_name' => 'Felix', 'last_name' => 'Schulz', 'email' => 'felix@mediapro.com', 'company_name' => 'MediaPro', 'rfm_segment' => 'At Risk', 'rfm_score' => 4, 'clv_total' => 1890.00, 'clv_order_count' => 12],
            ['first_name' => 'Clara', 'last_name' => 'Koch', 'email' => 'clara.koch@finserv.eu', 'company_name' => 'FinServ EU', 'rfm_segment' => 'At Risk', 'rfm_score' => 3, 'clv_total' => 2450.00, 'clv_order_count' => 20],
            ['first_name' => 'Paul', 'last_name' => 'Richter', 'email' => 'paul@oldshop.de', 'company_name' => 'OldShop', 'rfm_segment' => 'Lost', 'rfm_score' => 2, 'clv_total' => 780.00, 'clv_order_count' => 5],
            ['first_name' => 'Laura', 'last_name' => 'Klein', 'email' => 'laura@smartlogistics.de', 'company_name' => 'SmartLogistics', 'rfm_segment' => 'Champions', 'rfm_score' => 10, 'clv_total' => 5200.00, 'clv_order_count' => 42],
            ['first_name' => 'Max', 'last_name' => 'Wolf', 'email' => 'max@bytecraft.io', 'company_name' => 'ByteCraft', 'rfm_segment' => 'Loyal Customers', 'rfm_score' => 8, 'clv_total' => 1780.00, 'clv_order_count' => 14],
            ['first_name' => 'Julia', 'last_name' => 'Braun', 'email' => 'julia@greentech.eu', 'company_name' => 'GreenTech', 'rfm_segment' => 'New Customers', 'rfm_score' => 4, 'clv_total' => 450.00, 'clv_order_count' => 4],
            ['first_name' => 'David', 'last_name' => 'Neumann', 'email' => 'david@payeasy.com', 'company_name' => 'PayEasy', 'rfm_segment' => 'Potential Loyalists', 'rfm_score' => 6, 'clv_total' => 1120.00, 'clv_order_count' => 9],
            ['first_name' => 'Sarah', 'last_name' => 'Schwarz', 'email' => 'sarah@urbanstyle.de', 'company_name' => 'UrbanStyle', 'rfm_segment' => 'At Risk', 'rfm_score' => 3, 'clv_total' => 3100.00, 'clv_order_count' => 22],
            ['first_name' => 'Tom', 'last_name' => 'Krause', 'email' => 'tom@dataflow.io', 'company_name' => 'DataFlow', 'rfm_segment' => 'Champions', 'rfm_score' => 11, 'clv_total' => 4100.00, 'clv_order_count' => 30],
            ['first_name' => 'Lisa', 'last_name' => 'Frank', 'email' => 'lisa@creativebox.de', 'company_name' => 'CreativeBox', 'rfm_segment' => 'Loyal Customers', 'rfm_score' => 9, 'clv_total' => 2340.00, 'clv_order_count' => 16],
            ['first_name' => 'Jan', 'last_name' => 'Zimmermann', 'email' => 'jan@autoparts.eu', 'company_name' => 'AutoParts EU', 'rfm_segment' => 'Lost', 'rfm_score' => 2, 'clv_total' => 560.00, 'clv_order_count' => 3],
            ['first_name' => 'Marie', 'last_name' => 'Hartmann', 'email' => 'marie@luxbrand.com', 'company_name' => 'LuxBrand', 'rfm_segment' => 'Champions', 'rfm_score' => 12, 'clv_total' => 8900.00, 'clv_order_count' => 56],
            ['first_name' => 'Tobias', 'last_name' => 'Lang', 'email' => 'tobias@securehost.de', 'company_name' => 'SecureHost', 'rfm_segment' => 'New Customers', 'rfm_score' => 5, 'clv_total' => 280.00, 'clv_order_count' => 2],
        ];

        $createdCustomers = [];
        foreach ($customerData as $i => $cd) {
            $daysAgo = rand(1, 180);
            $createdCustomers[] = Customer::create([
                'tenant_id' => $tenant->id,
                'email' => $cd['email'],
                'first_name' => $cd['first_name'],
                'last_name' => $cd['last_name'],
                'company_name' => $cd['company_name'],
                'rfm_segment' => $cd['rfm_segment'],
                'rfm_score' => $cd['rfm_score'],
                'clv_total' => $cd['clv_total'],
                'clv_order_count' => $cd['clv_order_count'],
                'clv_average_order' => $cd['clv_order_count'] > 0 ? round($cd['clv_total'] / $cd['clv_order_count'], 2) : 0,
                'tags' => [],
                'is_subscribed_email' => rand(0, 1),
                'is_subscribed_sms' => rand(0, 1),
                'first_seen_at' => now()->subDays(rand(60, 365)),
                'last_seen_at' => now()->subDays(rand(0, 30)),
                'last_activity_at' => now()->subHours(rand(1, 720)),
            ]);
        }

        // Attach customers to segments (pivot has no updated_at)
        foreach ($createdCustomers as $customer) {
            $matchingSegment = $segments->first(fn ($s) => $s->name === $customer->rfm_segment);
            if ($matchingSegment) {
                \Illuminate\Support\Facades\DB::table('customer_segments')->insert([
                    'tenant_id' => $tenant->id,
                    'customer_id' => $customer->id,
                    'segment_id' => $matchingSegment->id,
                    'created_at' => now(),
                ]);
            }
        }

        // ── Campaigns ──────────────────────────────────────
        Campaign::create([
            'tenant_id' => $tenant->id,
            'name' => 'Spring Sale 2026',
            'type' => 'email',
            'status' => 'sent',
            'subject' => 'Spring Sale — 25% off everything!',
            'total_sent' => 842,
            'total_opened' => 534,
            'total_clicked' => 178,
            'completed_at' => now()->subDays(14),
        ]);

        Campaign::create([
            'tenant_id' => $tenant->id,
            'name' => 'Win-Back Campaign',
            'type' => 'email',
            'status' => 'sent',
            'subject' => 'We miss you — here\'s 15% off',
            'total_sent' => 156,
            'total_opened' => 67,
            'total_clicked' => 23,
            'completed_at' => now()->subDays(7),
        ]);

        Campaign::create([
            'tenant_id' => $tenant->id,
            'name' => 'Product Launch SMS',
            'type' => 'sms',
            'status' => 'scheduled',
            'subject' => null,
            'scheduled_at' => now()->addDays(3),
        ]);

        Campaign::create([
            'tenant_id' => $tenant->id,
            'name' => 'VIP Call List Q1',
            'type' => 'call_list',
            'status' => 'draft',
            'subject' => null,
        ]);

        // ── Automations ────────────────────────────────────
        Automation::create([
            'tenant_id' => $tenant->id,
            'name' => 'Welcome Series',
            'trigger_type' => 'customer_created',
            'trigger_config' => [],
            'is_active' => true,
            'last_triggered_at' => now()->subHours(3),
        ]);

        Automation::create([
            'tenant_id' => $tenant->id,
            'name' => 'Re-engagement Flow',
            'trigger_type' => 'inactive_30_days',
            'trigger_config' => ['days' => 30],
            'is_active' => true,
            'last_triggered_at' => now()->subDays(1),
        ]);

        Automation::create([
            'tenant_id' => $tenant->id,
            'name' => 'High-Value Alert',
            'trigger_type' => 'clv_threshold',
            'trigger_config' => ['threshold' => 5000],
            'is_active' => false,
        ]);

        // ── API Key ────────────────────────────────────────
        ApiKey::generate([
            'tenant_id' => $tenant->id,
            'name' => 'Production Tracking',
            'type' => 'public',
        ]);
    }
}
