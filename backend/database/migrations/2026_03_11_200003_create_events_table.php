<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('customer_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string('session_id')->nullable();
            $table->string('event_name');
            $table->string('event_category', 100)->nullable();
            $table->json('properties')->nullable();
            $table->decimal('monetary_value', 12, 2)->nullable();

            // Source
            $table->string('source', 50)->nullable();
            $table->text('page_url')->nullable();
            $table->string('page_title')->nullable();
            $table->text('referrer_url')->nullable();
            $table->string('utm_source')->nullable();
            $table->string('utm_medium')->nullable();
            $table->string('utm_campaign')->nullable();

            // Device / Geo
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->string('country', 2)->nullable();
            $table->string('city')->nullable();
            $table->string('device_type', 20)->nullable();

            $table->timestamp('occurred_at');
            $table->timestamp('created_at')->useCurrent();

            $table->index(['tenant_id', 'customer_id', 'occurred_at']);
            $table->index(['tenant_id', 'event_name', 'occurred_at']);
            $table->index(['tenant_id', 'occurred_at']);
            $table->index(['tenant_id', 'session_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
