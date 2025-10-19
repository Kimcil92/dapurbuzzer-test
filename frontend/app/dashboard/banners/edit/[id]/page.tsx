"use client";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import Swal from "sweetalert2";
import { useRouter, useParams } from "next/navigation";

export default function EditBanner() {
    const router = useRouter();
    const params = useParams();
    const bannerId = params.id as string;

    const [form, setForm] = useState({
        title: "",
        link: "",
        image: null as File | null,
        status: true,
        currentImage: "",
    });

    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // 🔹 Ambil data banner
    const fetchBanner = async () => {
        try {
            const res = await api.get(`/banners/${bannerId}`);
            const data = res.data.data;

            setForm({
                title: data.title,
                link: data.link || "",
                status: !!data.status,
                image: null,
                currentImage: data.image,
            });

            if (data.image?.startsWith("http")) {
                setPreview(data.image);
            } else {
                setPreview(
                    `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "/storage/")}${data.image}`
                );
            }
        } catch (err) {
            Swal.fire("Error", "Gagal mengambil data banner.", "error");
            router.push("/dashboard/banners");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBanner();
    }, []);

    // 🔹 Handle input umum
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });

        if (name === "link" && value.startsWith("http")) {
            setPreview(value);
            setForm((prev) => ({ ...prev, image: null })); // kosongkan file
        }
    };

    // 🔹 Handle upload file baru
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setForm({ ...form, image: file, link: "" });
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    // 🔹 Submit update
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.image && !form.link && !form.currentImage) {
            Swal.fire("Validasi Gagal", "Harap upload gambar atau isi URL gambar.", "warning");
            return;
        }

        const data = new FormData();
        data.append("title", form.title);
        data.append("link", form.link);
        data.append("status", form.status ? "1" : "0");
        if (form.image) data.append("image", form.image);

        try {
            await api.post(`/banners/${bannerId}?_method=PUT`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            Swal.fire("Berhasil", "Banner berhasil diperbarui!", "success");
            router.push("/dashboard/banners");
        } catch (err) {
            Swal.fire("Gagal", "Terjadi kesalahan saat menyimpan.", "error");
        }
    };

    if (loading)
        return (
            <div className="h-screen flex items-center justify-center text-gray-600">
                Memuat data banner...
            </div>
        );

    return (
        <div className="p-8 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
                Edit Banner
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl p-6 space-y-5 border border-gray-100"
            >
                {/* 🔹 Judul */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Judul Banner <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        required
                    />
                </div>

                {/* 🔹 Upload Gambar Baru */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Upload Gambar Baru (opsional)
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={!!form.link}
                        className="w-full border-gray-300 rounded-md"
                    />
                    {form.image && (
                        <p className="text-sm text-gray-500 mt-1">
                            File dipilih: {form.image.name}
                        </p>
                    )}
                </div>

                {/* 🔹 URL Gambar */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        URL Gambar (opsional)
                    </label>
                    <input
                        type="url"
                        name="link"
                        value={form.link}
                        onChange={handleChange}
                        placeholder="https://dapurbuzzer.co.id/images/banner1.png"
                        className="w-full border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        disabled={!!form.image}
                    />
                </div>

                {/* 🔹 Preview Gambar */}
                {preview && (
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600 mb-2">Preview Gambar:</p>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full rounded-lg border border-gray-200 shadow-sm"
                        />
                    </div>
                )}

                {/* 🔹 Checkbox Status */}
                <div className="flex items-center space-x-2 pt-2">
                    <input
                        type="checkbox"
                        name="status"
                        checked={form.status}
                        onChange={handleChange}
                        className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                    <label className="text-gray-700">Aktif</label>
                </div>

                {/* 🔹 Tombol Aksi */}
                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md transition"
                    >
                        Simpan Perubahan
                    </button>
                </div>
            </form>
        </div>
    );
}
