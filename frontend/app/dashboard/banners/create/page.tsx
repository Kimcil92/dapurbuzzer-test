"use client";

import { useState } from "react";
import api from "@/lib/axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function CreateBanner() {
    const [form, setForm] = useState({
        title: "",
        link: "", // 🔹 link bisa berisi URL gambar
        image: null as File | null,
        status: true,
    });

    const [preview, setPreview] = useState<string | null>(null);
    const router = useRouter();

    // 🔹 Handle input text & checkbox
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });

        // 🔹 Jika link gambar diisi → set preview langsung
        if (name === "link" && value.startsWith("http")) {
            setPreview(value);
            setForm((prev) => ({ ...prev, image: null })); // kosongkan file upload
        }
    };

    // 🔹 Handle upload file gambar
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setForm({ ...form, image: file, link: "" }); // kosongkan link kalau upload file

        if (file) {
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    // 🔹 Submit form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.image && !form.link) {
            Swal.fire(
                "Validasi Gagal",
                "Harap upload gambar atau isi URL gambar.",
                "warning"
            );
            return;
        }

        const data = new FormData();
        data.append("title", form.title);
        data.append("link", form.link);
        data.append("status", form.status ? "1" : "0");

        if (form.image) data.append("image", form.image);

        try {
            await api.post("/banners", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            Swal.fire("Berhasil!", "Banner berhasil ditambahkan.", "success");
            router.push("/dashboard/banners");
        } catch (err) {
            console.error(err);
            Swal.fire("Gagal!", "Terjadi kesalahan saat menambahkan banner.", "error");
        }
    };

    return (
        <div className="p-8 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
                Tambah Banner
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

                {/* 🔹 Upload Gambar */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Upload Gambar (opsional)
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full border-gray-300 rounded-md"
                        disabled={!!form.link}
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
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    );
}
