<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Segment extends Model
{
    use BelongsToTenant, HasFactory, SoftDeletes;

    protected $fillable = [
        'tenant_id',
        'name',
        'slug',
        'description',
        'type',
        'rules',
        'is_active',
    ];

    protected $casts = [
        'rules' => 'array',
        'is_active' => 'boolean',
        'last_calculated_at' => 'datetime',
    ];

    public function customers(): BelongsToMany
    {
        return $this->belongsToMany(Customer::class, 'customer_segments')
            ->withTimestamps();
    }

    public function campaigns(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Campaign::class);
    }
}
