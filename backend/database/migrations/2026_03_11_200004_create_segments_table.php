<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('segments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('slug');
            $table->text('description')->nullable();
            $table->string('type', 20); // auto, manual
            $table->json('rules')->nullable();
            $table->unsignedInteger('customer_count')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamp('last_calculated_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['tenant_id', 'slug']);
            $table->index(['tenant_id', 'type']);
            $table->index(['tenant_id', 'is_active']);
        });

        Schema::create('customer_segments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('customer_id')->constrained()->cascadeOnDelete();
            $table->foreignId('segment_id')->constrained()->cascadeOnDelete();
            $table->timestamp('created_at')->useCurrent();

            $table->unique(['customer_id', 'segment_id']);
            $table->index('segment_id');
            $table->index('tenant_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customer_segments');
        Schema::dropIfExists('segments');
    }
};
