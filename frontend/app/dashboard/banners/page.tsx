"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

interface Banner {
    id: string;
    title: string;
    image: string;
    link?: string;
    status: boolean;
}

export default function BannerPage() {
    const [banners, setBanners] = useState<Banner[]>([]);
    const router = useRouter();

    const fetchBanners = async () => {
        try {
            const res = await api.get("/banners");
            setBanners(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        const confirm = await Swal.fire({
            title: "Yakin hapus banner ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus",
            cancelButtonText: "Batal",
        });

        if (!confirm.isConfirmed) return;

        try {
            await api.delete(`/banners/${id}`);
            Swal.fire("Berhasil", "Banner dihapus", "success");
            fetchBanners();
        } catch (err) {
            Swal.fire("Gagal", "Terjadi kesalahan", "error");
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-purple-700">Manajemen Banner</h1>
                <button
                    onClick={() => router.push("/dashboard/banners/create")}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
                >
                    + Tambah Banner
                </button>
            </div>

            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
                {banners.length === 0 ? (
                    <p className="text-gray-500">Belum ada banner</p>
                ) : (
                    banners.map((b) => (
                        <div
                            key={b.id}
                            className="bg-white shadow-md rounded-lg overflow-hidden"
                        >
                            <img
                                src={
                                    b.image.startsWith("http")
                                        ? b.image
                                        : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "/storage/")}${b.image}`
                                }
                                alt={b.title}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{b.title}</h3>
                                <p className="text-sm text-gray-500 mb-2">
                                    {b.link || "-"}
                                </p>
                                <span
                                    className={`text-xs px-2 py-1 rounded ${
                                        b.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                    }`}
                                >
                  {b.status ? "Aktif" : "Nonaktif"}
                </span>

                                <div className="mt-3 flex justify-between">
                                    <button
                                        onClick={() => router.push(`/dashboard/banners/edit/${b.id}`)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded-md"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(b.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-md"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
