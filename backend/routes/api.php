<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\SegmentController;
use App\Http\Controllers\Api\CampaignController;
use App\Http\Controllers\Api\AutomationController;
use App\Http\Controllers\Api\ApiKeyController;
use App\Http\Controllers\Api\TrackingController;
use Illuminate\Support\Facades\Route;

// Public: Auth
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// Public: Tracking endpoint (authenticated via API key)
Route::post('/track', [TrackingController::class, 'ingest']);

// Authenticated routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);

    // Dashboard
    Route::get('/dashboard/overview', [DashboardController::class, 'overview']);

    // Customers
    Route::apiResource('customers', CustomerController::class);

    // Segments
    Route::apiResource('segments', SegmentController::class);

    // Campaigns
    Route::apiResource('campaigns', CampaignController::class);
    Route::post('/campaigns/{campaign}/send', [CampaignController::class, 'send']);

    // Automations
    Route::apiResource('automations', AutomationController::class);
    Route::post('/automations/{automation}/toggle', [AutomationController::class, 'toggle']);
    Route::post('/automations/{automation}/design', [AutomationController::class, 'saveDesign']);

    // API Keys
    Route::apiResource('api-keys', ApiKeyController::class)->except(['update']);
    Route::post('/api-keys/{api_key}/revoke', [ApiKeyController::class, 'revoke']);
});
