<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserService
{
    public function register(array $data): array
    {
        try {
            // Log request awal untuk debug
            Log::info('UserService@register - Incoming data', $data);

            // Jalankan dalam transaksi DB
            return DB::transaction(function () use ($data) {
                // Buat user baru
                $user = User::create([
                    'name' => $data['name'],
                    'username' => $data['username'],
                    'email' => $data['email'],
                    'address' => $data['address'] ?? null,
                    'password' => Hash::make($data['password']),
                ]);

                // Generate token Sanctum
                $token = $user->createToken('api_token')->plainTextToken;

                Log::info('UserService@register - User created successfully', [
                    'user_id' => $user->id,
                    'email' => $user->email,
                ]);

                // Return hasil
                return [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'username' => $user->username,
                        'email' => $user->email,
                        'address' => $user->address,
                        'created_at' => $user->created_at,
                    ],
                    'token' => $token,
                ];
            });
        } catch (\Throwable $th) {
            // Log error-nya ke laravel.log
            Log::error('UserService@register - Failed', [
                'error' => $th->getMessage(),
                'trace' => $th->getTraceAsString(),
            ]);

            // Lempar ulang biar controller bisa tangkap
            throw $th;
        }
    }

    public function login(array $credentials): array|false
    {
        try {
            Log::info('UserService@login - Attempting login', [
                'email' => $credentials['email'],
            ]);

            $user = User::where('email', $credentials['email'])->first();

            if (!$user) {
                Log::warning('UserService@login - User not found', [
                    'email' => $credentials['email'],
                ]);
                return false;
            }

            if (!Hash::check($credentials['password'], $user->password)) {
                Log::warning('UserService@login - Invalid password', [
                    'email' => $credentials['email'],
                ]);
                return false;
            }

            $token = $user->createToken('api_token')->plainTextToken;

            Log::info('UserService@login - Success', [
                'user_id' => $user->id,
                'email' => $user->email,
            ]);

            return [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'username' => $user->username,
                    'email' => $user->email,
                    'address' => $user->address,
                    'created_at' => $user->created_at,
                ],
                'token' => $token,
            ];
        } catch (\Throwable $th) {
            Log::error('UserService@login - Error', [
                'error' => $th->getMessage(),
                'trace' => $th->getTraceAsString(),
            ]);

            throw $th;
        }
    }
}
