<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AutomationStep extends Model
{
    use BelongsToTenant;

    protected $fillable = [
        'tenant_id',
        'automation_id',
        'parent_step_id',
        'type',
        'action_type',
        'config',
        'position',
        'branch_label',
    ];

    protected $casts = [
        'config' => 'array',
    ];

    public function automation(): BelongsTo
    {
        return $this->belongsTo(Automation::class);
    }

    public function parentStep(): BelongsTo
    {
        return $this->belongsTo(AutomationStep::class, 'parent_step_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(AutomationStep::class, 'parent_step_id')->orderBy('position');
    }

    public function logs(): HasMany
    {
        return $this->hasMany(AutomationLog::class);
    }
}
