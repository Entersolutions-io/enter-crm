<?php

namespace App\Models\Traits;

use App\Models\Tenant;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait BelongsToTenant
{
    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    protected static function bootBelongsToTenant(): void
    {
        static::creating(function ($model) {
            if (! $model->tenant_id && auth()->check()) {
                $model->tenant_id = auth()->user()->current_tenant_id;
            }
        });
    }
}
