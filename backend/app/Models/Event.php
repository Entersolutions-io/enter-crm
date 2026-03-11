<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends Model
{
    use BelongsToTenant;

    public $timestamps = false;

    protected $fillable = [
        'tenant_id',
        'customer_id',
        'session_id',
        'event_name',
        'event_category',
        'properties',
        'monetary_value',
        'source',
        'page_url',
        'page_title',
        'referrer_url',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'ip_address',
        'user_agent',
        'country',
        'city',
        'device_type',
        'occurred_at',
    ];

    protected $casts = [
        'properties' => 'array',
        'monetary_value' => 'decimal:2',
        'occurred_at' => 'datetime',
        'created_at' => 'datetime',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}
