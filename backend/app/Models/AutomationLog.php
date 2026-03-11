<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AutomationLog extends Model
{
    use BelongsToTenant;

    public $timestamps = false;

    protected $fillable = [
        'tenant_id',
        'automation_id',
        'automation_step_id',
        'customer_id',
        'status',
        'result',
        'scheduled_for',
        'started_at',
        'completed_at',
    ];

    protected $casts = [
        'result' => 'array',
        'scheduled_for' => 'datetime',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
        'created_at' => 'datetime',
    ];

    public function automation(): BelongsTo
    {
        return $this->belongsTo(Automation::class);
    }

    public function step(): BelongsTo
    {
        return $this->belongsTo(AutomationStep::class, 'automation_step_id');
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}
