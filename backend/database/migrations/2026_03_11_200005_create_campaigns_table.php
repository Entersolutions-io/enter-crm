<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('campaigns', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('type', 20); // email, sms, call_list
            $table->string('status', 20)->default('draft');
            $table->foreignId('segment_id')->nullable()->constrained()->nullOnDelete();
            $table->json('filter_rules')->nullable();

            // Content
            $table->string('subject')->nullable();
            $table->text('body_html')->nullable();
            $table->text('body_text')->nullable();
            $table->json('settings')->nullable();

            // Scheduling
            $table->timestamp('scheduled_at')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();

            // Stats
            $table->unsignedInteger('total_recipients')->default(0);
            $table->unsignedInteger('total_sent')->default(0);
            $table->unsignedInteger('total_delivered')->default(0);
            $table->unsignedInteger('total_opened')->default(0);
            $table->unsignedInteger('total_clicked')->default(0);
            $table->unsignedInteger('total_bounced')->default(0);
            $table->unsignedInteger('total_unsubscribed')->default(0);
            $table->unsignedInteger('total_failed')->default(0);

            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['tenant_id', 'status']);
            $table->index(['tenant_id', 'type']);
            $table->index(['tenant_id', 'scheduled_at']);
        });

        Schema::create('campaign_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('campaign_id')->constrained()->cascadeOnDelete();
            $table->foreignId('customer_id')->constrained()->cascadeOnDelete();
            $table->string('channel', 20);
            $table->string('to_address');
            $table->string('status', 20)->default('pending');
            $table->text('status_detail')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->timestamp('delivered_at')->nullable();
            $table->timestamp('opened_at')->nullable();
            $table->timestamp('clicked_at')->nullable();
            $table->timestamp('failed_at')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->index(['tenant_id', 'campaign_id', 'status']);
            $table->index(['tenant_id', 'customer_id']);
            $table->index(['tenant_id', 'sent_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('campaign_messages');
        Schema::dropIfExists('campaigns');
    }
};
