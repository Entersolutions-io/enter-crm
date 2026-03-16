<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('campaigns', function (Blueprint $table) {
            // Ad platform fields
            $table->string('ad_platform', 50)->nullable()->after('type'); // google, meta, tiktok, linkedin, twitter
            $table->string('ad_account_id', 255)->nullable()->after('ad_platform');
            $table->string('ad_campaign_id', 255)->nullable()->after('ad_account_id'); // external campaign ID from ad platform

            // Ad metrics
            $table->unsignedBigInteger('impressions')->default(0)->after('total_failed');
            $table->unsignedBigInteger('reach')->default(0)->after('impressions');
            $table->unsignedBigInteger('clicks')->default(0)->after('reach');
            $table->unsignedBigInteger('conversions')->default(0)->after('clicks');
            $table->decimal('ad_spend', 12, 2)->default(0)->after('conversions');
            $table->decimal('revenue_attributed', 12, 2)->default(0)->after('ad_spend');
            $table->decimal('cpc', 10, 4)->default(0)->after('revenue_attributed');  // cost per click
            $table->decimal('cpm', 10, 4)->default(0)->after('cpc');  // cost per mille
            $table->decimal('ctr', 8, 4)->default(0)->after('cpm');   // click-through rate
            $table->decimal('roas', 10, 4)->default(0)->after('ctr'); // return on ad spend
            $table->decimal('conversion_rate', 8, 4)->default(0)->after('roas');

            // Audience targeting
            $table->json('target_audience')->nullable()->after('filter_rules'); // demographics, interests, lookalike, etc.
            $table->json('ad_creatives')->nullable()->after('target_audience'); // ad images, headlines, copy variants

            // Index
            $table->index(['tenant_id', 'ad_platform']);
        });
    }

    public function down(): void
    {
        Schema::table('campaigns', function (Blueprint $table) {
            $table->dropIndex(['tenant_id', 'ad_platform']);
            $table->dropColumn([
                'ad_platform', 'ad_account_id', 'ad_campaign_id',
                'impressions', 'reach', 'clicks', 'conversions',
                'ad_spend', 'revenue_attributed', 'cpc', 'cpm', 'ctr', 'roas', 'conversion_rate',
                'target_audience', 'ad_creatives',
            ]);
        });
    }
};
