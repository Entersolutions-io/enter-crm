<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class ApiKey extends Model
{
    use BelongsToTenant;

    protected $fillable = [
        'tenant_id',
        'name',
        'type',
        'scopes',
        'is_active',
        'expires_at',
        'created_by',
    ];

    protected $casts = [
        'scopes' => 'array',
        'is_active' => 'boolean',
        'last_used_at' => 'datetime',
        'expires_at' => 'datetime',
    ];

    protected $hidden = [
        'secret_hash',
    ];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public static function generate(array $attributes): array
    {
        $plainKey = 'eck_' . Str::random(48);

        $apiKey = static::create(array_merge($attributes, [
            'key' => substr($plainKey, 0, 16) . str_repeat('*', 36),
            'secret_hash' => hash('sha256', $plainKey),
        ]));

        return [
            'api_key' => $apiKey,
            'plain_key' => $plainKey,
        ];
    }

    public static function findByKey(string $plainKey): ?static
    {
        return static::where('secret_hash', hash('sha256', $plainKey))
            ->where('is_active', true)
            ->first();
    }

    public function isExpired(): bool
    {
        return $this->expires_at && $this->expires_at->isPast();
    }

    public function markUsed(): void
    {
        $this->update(['last_used_at' => now()]);
    }
}
