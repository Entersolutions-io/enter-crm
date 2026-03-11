<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('automations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('trigger_type', 50);
            $table->json('trigger_config')->nullable();
            $table->boolean('is_active')->default(false);
            $table->timestamp('last_triggered_at')->nullable();
            $table->unsignedInteger('total_entered')->default(0);
            $table->unsignedInteger('total_completed')->default(0);
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['tenant_id', 'is_active']);
            $table->index(['tenant_id', 'trigger_type']);
        });

        Schema::create('automation_steps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('automation_id')->constrained()->cascadeOnDelete();
            $table->foreignId('parent_step_id')->nullable()->constrained('automation_steps')->nullOnDelete();
            $table->string('type', 30); // action, condition, delay, branch
            $table->string('action_type', 50)->nullable();
            $table->json('config')->nullable();
            $table->unsignedInteger('position')->default(0);
            $table->string('branch_label', 100)->nullable();
            $table->timestamps();

            $table->index(['automation_id', 'position']);
            $table->index('parent_step_id');
        });

        Schema::create('automation_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('automation_id')->constrained()->cascadeOnDelete();
            $table->foreignId('automation_step_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('customer_id')->constrained()->cascadeOnDelete();
            $table->string('status', 20);
            $table->json('result')->nullable();
            $table->timestamp('scheduled_for')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamp('created_at')->useCurrent();

            $table->index(['tenant_id', 'automation_id', 'customer_id']);
            $table->index(['tenant_id', 'customer_id']);
            $table->index(['automation_id', 'status']);
            $table->index(['status', 'scheduled_for']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('automation_logs');
        Schema::dropIfExists('automation_steps');
        Schema::dropIfExists('automations');
    }
};
