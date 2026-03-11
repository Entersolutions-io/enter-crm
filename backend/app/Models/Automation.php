<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Automation extends Model
{
    use BelongsToTenant, HasFactory, SoftDeletes;

    protected $fillable = [
        'tenant_id',
        'name',
        'description',
        'trigger_type',
        'trigger_config',
        'is_active',
        'created_by',
    ];

    protected $casts = [
        'trigger_config' => 'array',
        'is_active' => 'boolean',
        'last_triggered_at' => 'datetime',
    ];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function steps(): HasMany
    {
        return $this->hasMany(AutomationStep::class)->orderBy('position');
    }

    public function logs(): HasMany
    {
        return $this->hasMany(AutomationLog::class);
    }
}
