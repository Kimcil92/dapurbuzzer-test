<?php

namespace Database\Seeders;

use App\Models\Banner;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BannerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $banners = [];

        for ($i = 1; $i <= 5; $i++) {
            $banners[] = [
                'id' => Str::uuid()->toString(),
                'title' => 'Test' . $i,
                'image' => "https://dapurbuzzer.co.id/images/banner{$i}.png",
                'link'  => "https://dapurbuzzer.co.id",
                'status' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        Banner::insert($banners);
    }
}
