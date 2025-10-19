<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BannerController;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;

Route::get('/test-connection', function (\Illuminate\Http\Request $request) {
    Log::info('✅ Test connection received', ['headers' => $request->headers->all()]);
    return response()->json(['message' => 'Connection OK']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/sprintpedia', function (Request $request) {
    $username = $request->input('username');

    if (!$username) {
        return response()->withCors(['error' => 'Username required'], 400);
    }

    $response = Http::post('https://sprintpedia-proxy.vercel.app/api/sprintpedia', [
        'username' => $username,
    ]);

    return response()->withCors($response->json());
});

Route::get('/banners', [BannerController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/banners', [BannerController::class, 'store']);
    Route::put('/banners/{id}', [BannerController::class, 'update']);
    Route::delete('/banners/{id}', [BannerController::class, 'destroy']);
    Route::get('/banners/{id}', [BannerController::class, 'show']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
