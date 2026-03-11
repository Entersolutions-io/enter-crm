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
        'subject',
        'body_html',
        'body_text',
        'settings',
        'scheduled_at',
        'created_by',
    ];

    protected $casts = [
        'filter_rules' => 'array',
        'settings' => 'array',
        'scheduled_at' => 'datetime',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
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
