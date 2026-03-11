<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->string('external_id')->nullable();
            $table->string('email')->nullable();
            $table->string('phone', 50)->nullable();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('company_name')->nullable();
            $table->json('properties')->nullable();
            $table->json('tags')->nullable();

            // RFM Analysis
            $table->unsignedTinyInteger('recency_score')->nullable();
            $table->unsignedTinyInteger('frequency_score')->nullable();
            $table->unsignedTinyInteger('monetary_score')->nullable();
            $table->string('rfm_segment', 50)->nullable();
            $table->unsignedSmallInteger('rfm_score')->nullable();
            $table->timestamp('rfm_calculated_at')->nullable();

            // CLV
            $table->decimal('clv_total', 12, 2)->default(0);
            $table->decimal('clv_predicted', 12, 2)->nullable();
            $table->decimal('clv_average_order', 12, 2)->nullable();
            $table->unsignedInteger('clv_order_count')->default(0);
            $table->timestamp('clv_calculated_at')->nullable();

            // Activity
            $table->timestamp('first_seen_at')->nullable();
            $table->timestamp('last_seen_at')->nullable();
            $table->timestamp('last_activity_at')->nullable();
            $table->unsignedInteger('total_events')->default(0);

            // Subscriptions
            $table->boolean('is_subscribed_email')->default(true);
            $table->boolean('is_subscribed_sms')->default(true);

            $table->timestamps();
            $table->softDeletes();

            $table->index(['tenant_id', 'email']);
            $table->index(['tenant_id', 'external_id']);
            $table->index(['tenant_id', 'rfm_segment']);
            $table->index(['tenant_id', 'rfm_score']);
            $table->index(['tenant_id', 'clv_total']);
            $table->index(['tenant_id', 'last_activity_at']);
            $table->index(['tenant_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
