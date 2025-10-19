"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { Button, Label, TextInput, Spinner } from "flowbite-react";

export default function RegisterPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        address: "",
        password: "",
        password_confirmation: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log("🚀 [REGISTER] Sending data:", form);

            // langsung hit endpoint register
            const res = await api.post("/register", form);

            console.log("✅ [REGISTER SUCCESS]:", res.data);

            const { token, user } = res.data.data;
            Cookies.set("token", token, { expires: 7 });
            Cookies.set("user", JSON.stringify(user));

            Swal.fire({
                icon: "success",
                title: "Pendaftaran Berhasil",
                text: "Selamat datang di Dapur Buzzer!",
                timer: 1500,
                showConfirmButton: false,
            });

            router.push("/login");
        } catch (err: any) {
            console.error("❌ [REGISTER ERROR]:", err.response || err);
            Swal.fire({
                icon: "error",
                title: "Gagal Mendaftar",
                text:
                    err.response?.data?.message ||
                    "Silakan periksa kembali data Anda.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-purple-100">
                <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">
                    Daftar Akun Baru
                </h2>

                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    <div>
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <TextInput
                            id="name"
                            placeholder="Masukkan nama lengkap"
                            required
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <Label htmlFor="username">Username</Label>
                        <TextInput
                            id="username"
                            placeholder="Masukkan username"
                            required
                            value={form.username}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <TextInput
                            id="email"
                            type="email"
                            placeholder="Masukkan email"
                            required
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <Label htmlFor="address">Alamat</Label>
                        <TextInput
                            id="address"
                            placeholder="Masukkan alamat"
                            value={form.address}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <TextInput
                            id="password"
                            type="password"
                            placeholder="Masukkan password"
                            required
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            placeholder="Ulangi password"
                            required
                            value={form.password_confirmation}
                            onChange={handleChange}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="mt-2 bg-purple-600 hover:bg-purple-700 text-white"
                        disabled={loading}
                    >
                        {loading ? <Spinner size="sm" /> : "Daftar Sekarang"}
                    </Button>
                </form>

                <p className="text-sm text-gray-500 text-center mt-4">
                    Sudah punya akun?{" "}
                    <span
                        className="text-purple-600 cursor-pointer hover:underline"
                        onClick={() => router.push("/login")}
                    >
                        Masuk di sini
                    </span>
                </p>
            </div>
        </div>
    );
}
