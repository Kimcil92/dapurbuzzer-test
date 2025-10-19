"use client";

import { useState } from "react";
import { Button, Spinner, Card, TextInput } from "flowbite-react";

interface InstaProfile {
    username: string;
    full_name: string;
    follower_count: number;
    following_count: number;
    media_count: number;
    biography: string;
    profile_pic_url_hd: string;
    is_private: boolean;
    is_verified: boolean;
}

export default function Test2Page() {
    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState<InstaProfile | null>(null);
    const [rawData, setRawData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchProfile = async () => {
        if (!username) {
            setError("Masukkan username terlebih dahulu!");
            return;
        }

        setLoading(true);
        setError("");
        setProfile(null);
        setRawData(null);

        try {
            const res = await fetch("/api/sprintpedia", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username }),
            });

            if (!res.ok) throw new Error("Gagal mengambil data dari API.");

            const json = await res.json();

            if (!json?.data?.username) throw new Error("Data tidak ditemukan.");

            const data = json.data;
            setProfile({
                username: data.username,
                full_name: data.full_name || "-",
                follower_count: data.follower_count || 0,
                following_count: data.following_count || 0,
                media_count: data.media_count || 0,
                biography: data.biography || "",
                profile_pic_url_hd: data.profile_pic_url_hd || data.profile_pic_url,
                is_private: data.is_private || false,
                is_verified: data.is_verified || false,
            });
            setRawData(json);
        } catch (err: any) {
            console.error("❌ Error:", err);
            setError(err.message || "Terjadi kesalahan.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-white to-purple-50 py-12 px-4 flex flex-col items-center">
            {/* 🔹 Header */}
            <h1 className="text-3xl font-bold text-purple-700 mb-2 text-center">
                🧪 Test 2 – Sprintpedia REST API Simulation
            </h1>
            <p className="text-gray-600 mb-8 text-center max-w-xl">
                Masukkan username Instagram untuk menampilkan informasi akun dari{" "}
                <b>Sprintpedia Proxy API</b> secara langsung.
            </p>

            {/* 🔹 Input Form */}
            <div className="flex gap-2 w-full max-w-md mb-10">
                <TextInput
                    placeholder="Masukkan username IG (tanpa @)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.trim())}
                    className="flex-1"
                />
                <Button
                    color="purple"
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={fetchProfile}
                    disabled={loading}
                >
                    {loading ? <Spinner size="sm" /> : "Cari"}
                </Button>
            </div>

            {/* 🔹 Error Message */}
            {error && (
                <div className="text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded-md mb-6">
                    {error}
                </div>
            )}

            {/* 🔹 Profile Card */}
            {profile && (
                <Card className="w-full max-w-md shadow-lg border border-purple-100">
                    <div className="flex flex-col items-center text-center">
                        {/* Foto dihapus agar tidak error */}

                        <h2 className="text-xl font-semibold text-gray-800">
                            {profile.full_name}
                        </h2>
                        <p className="text-purple-600">@{profile.username}</p>

                        {/* 🔹 Stats */}
                        <div className="flex justify-center gap-8 mt-4">
                            <div>
                                <p className="font-bold text-purple-700 text-lg">
                                    {profile.follower_count.toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-500">Followers</p>
                            </div>
                            <div>
                                <p className="font-bold text-purple-700 text-lg">
                                    {profile.following_count.toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-500">Following</p>
                            </div>
                            <div>
                                <p className="font-bold text-purple-700 text-lg">
                                    {profile.media_count.toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-500">Posts</p>
                            </div>
                        </div>

                        {/* 🔹 Bio */}
                        {profile.biography && (
                            <p className="text-gray-600 mt-4 text-sm italic">
                                “{profile.biography}”
                            </p>
                        )}

                        {/* 🔹 Private & Spam Filter */}
                        <div className="flex flex-wrap justify-center items-center gap-6 mt-6">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-700 font-medium">Status Private:</span>
                                <span
                                    className={`px-2 py-1 rounded text-xs ${
                                        profile.is_private
                                            ? "bg-red-100 text-red-600"
                                            : "bg-green-100 text-green-700"
                                    }`}
                                >
                  {profile.is_private ? "Private is ON" : "Private is OFF"}
                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-gray-700 font-medium">Spam Filter:</span>
                                <span
                                    className={`px-2 py-1 rounded text-xs ${
                                        profile.is_verified
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-600"
                                    }`}
                                >
                  {profile.is_verified
                      ? "Spam filter is OFF"
                      : "Spam filter is ON"}
                </span>
                            </div>
                        </div>
                    </div>
                </Card>
            )}

            {/* 🔹 Raw JSON Debug */}
            {rawData && (
                <details className="max-w-md w-full mt-6 bg-white border border-gray-200 rounded-md shadow-sm">
                    <summary className="cursor-pointer px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-t-md">
                        ▶ Raw JSON (debug)
                    </summary>
                    <pre className="text-xs text-gray-600 bg-gray-50 p-4 rounded-b-md overflow-x-auto">
            {JSON.stringify(rawData, null, 2)}
          </pre>
                </details>
            )}

            {/* 🔹 Footer */}
            <footer className="mt-16 text-gray-500 text-sm text-center">
                Data diambil dari{" "}
                <a
                    href="https://sprintpedia-proxy.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline"
                >
                    Sprintpedia Proxy API
                </a>
            </footer>
        </main>
    );
}
