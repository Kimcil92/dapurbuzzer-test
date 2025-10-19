<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BannerController;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
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
        return response()->json(['error' => 'Username required'], 400)
            ->header('Access-Control-Allow-Origin', 'https://dapurbuzzer-test.kodekreatifdigital.id')
            ->header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }

    try {
        // 🔹 Laravel yang panggil Sprintpedia
        $response = Http::post('https://sprintpedia-proxy.vercel.app/api/sprintpedia', [
            'username' => $username,
        ]);

        // 🔹 Kembalikan hasil ke frontend dengan CORS header dari Laravel sendiri
        return response()->json($response->json(), $response->status())
            ->header('Access-Control-Allow-Origin', 'https://dapurbuzzer-test.kodekreatifdigital.id')
            ->header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    } catch (\Throwable $th) {
        return response()->json(['error' => 'Gagal terhubung ke Sprintpedia: ' . $th->getMessage()], 500)
            ->header('Access-Control-Allow-Origin', 'https://dapurbuzzer-test.kodekreatifdigital.id')
            ->header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }
});

Route::options('/sprintpedia', function () {
    return response('', 204)
        ->header('Access-Control-Allow-Origin', 'https://dapurbuzzer-test.kodekreatifdigital.id')
        ->header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
});

Route::get('/banners', [BannerController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/banners', [BannerController::class, 'store']);
    Route::put('/banners/{id}', [BannerController::class, 'update']);
    Route::delete('/banners/{id}', [BannerController::class, 'destroy']);
    Route::get('/banners/{id}', [BannerController::class, 'show']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
