<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\Banner;
use Illuminate\Support\Facades\Storage;

class BannerService
{
    /**
     * Ambil semua banner.
     */
    public function getAll()
    {
        return Banner::where('status', true)
            ->orderByDesc('created_at')
            ->get(['id', 'title', 'image', 'link', 'status']);
    }

    /**
     * Simpan banner baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'link'  => 'nullable|url|max:255',
            'status' => 'boolean',
            'image' => $request->link
                ? 'nullable|image|mimes:jpg,jpeg,png|max:2048'
                : 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('banners', 'public');
        }
        elseif (!empty($request->link)) {
            $validated['image'] = $request->link;
        }

        // 🔹 Simpan banner
        $banner = Banner::create([
            'title' => $validated['title'],
            'image' => $validated['image'],
            'link'  => $validated['link'],
            'status' => $validated['status'] ?? 1,
        ]);

        return response()->json([
            'message' => 'Banner berhasil ditambahkan',
            'data' => $banner,
        ], 201);
    }

    /**
     * Ambil detail banner.
     */
    public function findById(string $id)
    {
        return Banner::find($id);
    }

    /**
     * Update banner.
     */
    public function update(Request $request, string $id)
    {
        $banner = Banner::find($id);
        if (!$banner) {
            return null;
        }

        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'link' => 'nullable|url|max:255',
            'status' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($banner->image && Storage::disk('public')->exists($banner->image)) {
                Storage::disk('public')->delete($banner->image);
            }
            $validated['image'] = $request->file('image')->store('banners', 'public');
        }

        $banner->update($validated);
        return $banner;
    }

    /**
     * Hapus banner.
     */
    public function destroy(string $id)
    {
        $banner = Banner::find($id);
        if (!$banner) {
            return false;
        }

        if ($banner->image && Storage::disk('public')->exists($banner->image)) {
            Storage::disk('public')->delete($banner->image);
        }

        $banner->delete();
        return true;
    }
}
