<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Customer extends Model
{
    use BelongsToTenant, HasFactory, SoftDeletes;

    protected $fillable = [
        'tenant_id',
        'external_id',
        'email',
        'phone',
        'first_name',
        'last_name',
        'company_name',
        'properties',
        'tags',
        'is_subscribed_email',
        'is_subscribed_sms',
    ];

    protected $casts = [
        'properties' => 'array',
        'tags' => 'array',
        'clv_total' => 'decimal:2',
        'clv_predicted' => 'decimal:2',
        'clv_average_order' => 'decimal:2',
        'is_subscribed_email' => 'boolean',
        'is_subscribed_sms' => 'boolean',
        'first_seen_at' => 'datetime',
        'last_seen_at' => 'datetime',
        'last_activity_at' => 'datetime',
        'rfm_calculated_at' => 'datetime',
        'clv_calculated_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::creating(function (Customer $customer) {
            if (! $customer->uuid) {
                $customer->uuid = Str::uuid()->toString();
            }
        });
    }

    public function getFullNameAttribute(): string
    {
        return trim(($this->first_name ?? '') . ' ' . ($this->last_name ?? '')) ?: 'Unknown';
    }

    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }

    public function segments(): BelongsToMany
    {
        return $this->belongsToMany(Segment::class, 'customer_segments')
            ->withTimestamps();
    }

    public function campaignMessages(): HasMany
    {
        return $this->hasMany(CampaignMessage::class);
    }

    public function automationLogs(): HasMany
    {
        return $this->hasMany(AutomationLog::class);
    }
}
