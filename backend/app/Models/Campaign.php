<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Campaign extends Model
{
    use BelongsToTenant, HasFactory, SoftDeletes;

    protected $fillable = [
        'tenant_id',
        'name',
        'type',
        'status',
        'segment_id',
        'filter_rules',
        'target_audience',
        'ad_creatives',
        'subject',
        'body_html',
        'body_text',
        'settings',
        'scheduled_at',
        'started_at',
        'completed_at',
        'total_recipients',
        'total_sent',
        'total_delivered',
        'total_opened',
        'total_clicked',
        'total_bounced',
        'total_unsubscribed',
        'total_failed',
        'ad_platform',
        'ad_account_id',
        'ad_campaign_id',
        'impressions',
        'reach',
        'clicks',
        'conversions',
        'ad_spend',
        'revenue_attributed',
        'cpc',
        'cpm',
        'ctr',
        'roas',
        'conversion_rate',
        'created_by',
    ];

    protected $casts = [
        'filter_rules' => 'array',
        'target_audience' => 'array',
        'ad_creatives' => 'array',
        'settings' => 'array',
        'scheduled_at' => 'datetime',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
        'ad_spend' => 'decimal:2',
        'revenue_attributed' => 'decimal:2',
        'cpc' => 'decimal:4',
        'cpm' => 'decimal:4',
        'ctr' => 'decimal:4',
        'roas' => 'decimal:4',
        'conversion_rate' => 'decimal:4',
    ];

    public function segment(): BelongsTo
    {
        return $this->belongsTo(Segment::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function messages(): HasMany
    {
        return $this->hasMany(CampaignMessage::class);
    }
}
