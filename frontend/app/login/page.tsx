"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { Button, Label, TextInput, Spinner } from "flowbite-react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log("🚀 [LOGIN] Sending credentials:", { email });

            const res = await api.post("/login", { email, password });
            console.log("✅ [LOGIN SUCCESS]:", res.data);

            const { token, user } = res.data.data;

            // Simpan token & user ke cookies
            Cookies.set("token", token, { expires: 7 });
            Cookies.set("user", JSON.stringify(user));

            Swal.fire({
                icon: "success",
                title: "Berhasil Masuk",
                text: `Selamat datang, ${user.name}!`,
                timer: 1500,
                showConfirmButton: false,
            }).then(() => {
                router.push("/dashboard");
            });
        } catch (err: any) {
            console.error("❌ [LOGIN ERROR]:", err.response || err);
            Swal.fire({
                icon: "error",
                title: "Login gagal",
                text:
                    err.response?.data?.message ||
                    "Periksa kembali email dan password Anda.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white px-4">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-purple-100">
                <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">
                    Masuk ke Dapur Buzzer
                </h2>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <TextInput
                            id="email"
                            type="email"
                            placeholder="Masukkan email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <TextInput
                            id="password"
                            type="password"
                            placeholder="Masukkan password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="mt-2 bg-purple-600 hover:bg-purple-700 text-white"
                        disabled={loading}
                    >
                        {loading ? <Spinner size="sm" /> : "Masuk"}
                    </Button>
                </form>

                {/* Register + Home navigation */}
                <div className="text-center mt-6 space-y-2">
                    <p className="text-sm text-gray-500">
                        Belum punya akun?{" "}
                        <span
                            className="text-purple-600 cursor-pointer hover:underline"
                            onClick={() => router.push("/register")}
                        >
                            Daftar di sini
                        </span>
                    </p>

                    <Button
                        color="light"
                        className="mt-2 border border-gray-200 w-full hover:bg-gray-50 text-gray-700"
                        onClick={() => router.push("/")}
                    >
                        ⬅️ Kembali ke Beranda
                    </Button>
                </div>
            </div>
        </div>
    );
}
