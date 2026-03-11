<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Tenant extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'domain',
        'plan',
        'plan_expires_at',
        'settings',
        'is_active',
    ];

    protected $casts = [
        'settings' => 'array',
        'is_active' => 'boolean',
        'plan_expires_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::creating(function (Tenant $tenant) {
            if (! $tenant->uuid) {
                $tenant->uuid = Str::uuid()->toString();
            }
            if (! $tenant->slug) {
                $tenant->slug = Str::slug($tenant->name);
            }
        });
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'tenant_users')
            ->withPivot('role', 'is_active')
            ->withTimestamps();
    }

    public function customers(): HasMany
    {
        return $this->hasMany(Customer::class);
    }

    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }

    public function segments(): HasMany
    {
        return $this->hasMany(Segment::class);
    }

    public function campaigns(): HasMany
    {
        return $this->hasMany(Campaign::class);
    }

    public function automations(): HasMany
    {
        return $this->hasMany(Automation::class);
    }

    public function apiKeys(): HasMany
    {
        return $this->hasMany(ApiKey::class);
    }
}
