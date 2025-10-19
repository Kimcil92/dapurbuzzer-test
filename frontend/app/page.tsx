"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import api from "@/lib/axios";
import { Button, Carousel } from "flowbite-react";
import { Icon } from "@iconify/react";

interface Banner {
    id: string;
    title: string;
    image: string;
    link?: string;
    status: boolean;
}

export default function HomePage() {
    const router = useRouter();
    const pathname = usePathname();
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);

    // 🔹 Fetch Banners
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const res = await api.get("/banners");
                setBanners(res.data.data || []);
            } catch (err) {
                console.error("❌ Gagal memuat banner:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBanners();
    }, []);

    // 🔹 Get Banner Image URL
    const getBannerImage = (image: string) => {
        if (!image) return "/images/no-banner.png";
        if (image.startsWith("http")) return image;
        return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "/storage/")}${image}`;
    };

    // 🔹 Menus
    const menus = [
        { label: "Home", path: "/" },
        { label: "About", path: "/about" },
        { label: "Influencer", path: "/influencer" },
        { label: "Campaign", path: "/campaign" },
        { label: "Package", path: "/package" },
        { label: "Join Influencer", path: "/join-influencer" },
        { label: "Terms & Conditions", path: "/terms" },
        { label: "FAQ", path: "/faq" },
        { label: "Test 2", path: "/test2" },
    ];

    // 🔹 Categories
    const categories = [
        { icon: "ion:fast-food-outline", name: "Food & Beverages" },
        { icon: "ion:hardware-chip-outline", name: "Technology" },
        { icon: "ion:film-outline", name: "Entertainment" },
        { icon: "ion:airplane-outline", name: "Travel & Lifestyle" },
        { icon: "ion:barbell-outline", name: "Health & Sport" },
        { icon: "ion:game-controller-outline", name: "Gaming" },
        { icon: "ion:videocam-outline", name: "Content Creator" },
        { icon: "ion:shirt-outline", name: "Beauty & Fashion" },
        { icon: "ion:play-outline", name: "Youtuber" },
        { icon: "ion:headset-outline", name: "DJ & Penyanyi" },
        { icon: "ion:musical-note-outline", name: "Tiktok" },
        { icon: "ion:happy-outline", name: "Mom & Kids" },
    ];

    // 🔹 Packages
    const packages = [
        {
            title: "Paket Endorsement 10 Micro Influencer",
            price: "Rp.2.500.000",
            image: "https://dapurbuzzer.co.id/images/package/package1.jpg",
            link: "https://app.dapurbuzzer.co.id/produk",
        },
        {
            title: "Paket Paid Promote 10 Micro Influencer",
            price: "Rp.1.500.000",
            image: "https://dapurbuzzer.co.id/images/package/package2.jpg",
            link: "https://app.dapurbuzzer.co.id/produk",
        },
        {
            title: "Paket Produk Review 10 Micro Influencer",
            price: "Rp.2.000.000",
            image: "https://dapurbuzzer.co.id/images/package/package3.jpg",
            link: "https://app.dapurbuzzer.co.id/produk",
        },
    ];

    // 🔹 Clients
    const clients = [
        "https://app.dapurbuzzer.co.id/images/klien/klien-01.png",
        "https://app.dapurbuzzer.co.id/images/klien/klien-02.png",
        "https://app.dapurbuzzer.co.id/images/klien/klien-08.png",
        "https://app.dapurbuzzer.co.id/images/klien/klien-04.png",
    ];

    return (
        <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col">
            {/* 🔹 Navbar */}
            <nav className="bg-gradient-to-r from-purple-700 to-purple-600 sticky top-0 z-50 border-b border-purple-500/30 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => router.push("/")}
                        >
                            <Image
                                src="/images/logo.jpg"
                                alt="Dapur Buzzer"
                                width={38}
                                height={38}
                                className="rounded-full border border-white/50"
                            />
                            <h1 className="text-lg font-bold text-white tracking-wide">
                                Dapur Buzzer
                            </h1>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-6 font-medium text-sm lg:text-base text-white/90">
                            {menus.map((menu) => (
                                <span
                                    key={menu.path}
                                    onClick={() => router.push(menu.path)}
                                    className={`cursor-pointer pb-1 border-b-2 transition-all duration-200 ${
                                        pathname === menu.path
                                            ? "border-white text-white font-semibold"
                                            : "border-transparent hover:border-white/60 hover:text-white"
                                    }`}
                                >
                                    {menu.label}
                                </span>
                            ))}
                        </div>

                        {/* Login Button */}
                        <div className="hidden md:block">
                            <Button
                                className="bg-white/20 hover:bg-white/30 text-white border border-white/40 text-sm px-4 transition-all duration-300"
                                onClick={() => router.push("/login")}
                            >
                                Login
                            </Button>
                        </div>

                        {/* Mobile Menu */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="text-white focus:outline-none"
                            >
                                <Icon
                                    icon={menuOpen ? "mdi:close" : "mdi:menu"}
                                    width="28"
                                    height="28"
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown */}
                {menuOpen && (
                    <div className="md:hidden bg-purple-700/95 text-white px-6 pb-4 pt-2 space-y-2 animate-slideDown">
                        {menus.map((menu) => (
                            <div
                                key={menu.path}
                                onClick={() => {
                                    router.push(menu.path);
                                    setMenuOpen(false);
                                }}
                                className={`cursor-pointer border-b border-purple-500/40 pb-2 ${
                                    pathname === menu.path
                                        ? "text-white font-semibold"
                                        : "text-purple-100 hover:text-white"
                                }`}
                            >
                                {menu.label}
                            </div>
                        ))}

                        <Button
                            className="w-full mt-3 bg-white/20 hover:bg-white/30 text-white border border-white/40 text-sm"
                            onClick={() => {
                                setMenuOpen(false);
                                router.push("/login");
                            }}
                        >
                            Login
                        </Button>
                    </div>
                )}
            </nav>

            {/* 🔹 Banner Section (Fixed version — tidak terpotong, elegan) */}
            <section className="w-full bg-white shadow-inner py-8 md:py-10">
                <div className="max-w-6xl mx-auto px-4">
                    {loading ? (
                        <p className="text-center text-gray-500">Memuat banner...</p>
                    ) : banners.length === 0 ? (
                        <div className="text-center text-gray-400 text-sm py-10 bg-gray-50 rounded-lg">
                            <Image
                                src="/images/no-banner.png"
                                alt="No banner"
                                width={180}
                                height={120}
                                className="mx-auto mb-3 opacity-70"
                            />
                            Belum ada banner untuk ditampilkan
                        </div>
                    ) : (
                        <div className="rounded-lg overflow-hidden relative">
                            <Carousel slideInterval={4000}>
                                {banners.map((b) => (
                                    <div
                                        key={b.id}
                                        className="relative w-full aspect-[16/9] flex items-center justify-center cursor-pointer"
                                        onClick={() => b.link && window.open(b.link, "_blank")}
                                    >
                                        <Image
                                            src={getBannerImage(b.image)}
                                            alt={b.title}
                                            fill
                                            className="object-contain"
                                            priority
                                        />
                                        <div className="absolute bottom-0 bg-black/30 text-white text-sm p-3 w-full text-center backdrop-blur-sm">
                                            {b.title}
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    )}
                </div>
            </section>

            {/* 🔹 Kategori Section */}
            <section className="py-16 px-6 md:px-20 bg-gradient-to-b from-white to-purple-50">
                <h2 className="text-3xl font-bold text-center text-purple-700 mb-12">
                    Menghubungkan Brand dan Influencer dengan Mudah 🚀
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {categories.map((cat, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center justify-center bg-white shadow-md rounded-xl py-6 hover:shadow-lg hover:scale-105 transition-all text-center"
                        >
                            <Icon
                                icon={cat.icon}
                                width="40"
                                height="40"
                                className="text-purple-600 mb-3"
                            />
                            <p className="text-gray-700 text-sm font-medium leading-tight">
                                {cat.name}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 🔹 Packages Section */}
            <section className="py-16 bg-white px-6 md:px-20">
                <div className="max-w-5xl mx-auto mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">
                        Package Micro Influencer
                    </h3>
                </div>

                <div className="flex flex-col gap-6 max-w-5xl mx-auto">
                    {packages.map((pkg, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 bg-white p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
                        >
                            <Image
                                src={pkg.image}
                                alt={pkg.title}
                                width={100}
                                height={100}
                                className="rounded-xl object-cover"
                            />
                            <div className="flex-1">
                                <h4 className="text-lg font-semibold text-gray-800 mb-1">
                                    {pkg.title}
                                </h4>
                                <p className="text-gray-500 mb-3">{pkg.price}</p>
                                <Button
                                    color="purple"
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-5"
                                    onClick={() => window.open(pkg.link, "_blank")}
                                >
                                    View Detail
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 🔹 Klien Kami + Download + Sosial Media */}
            <section className="py-16 bg-purple-50 text-center">
                <h3 className="text-2xl font-semibold text-purple-700 mb-8">
                    Klien Kami
                </h3>

                <div className="flex flex-wrap justify-center gap-12 items-center mb-12">
                    {clients.map((url, i) => (
                        <Image
                            key={i}
                            src={url}
                            alt="Client Logo"
                            width={120}
                            height={60}
                            className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                        />
                    ))}
                </div>

                {/* 🔹 Download Section */}
                <h3 className="text-2xl font-semibold text-purple-700 mb-6">
                    Download Aplikasi
                </h3>
                <div className="flex justify-center gap-6 mb-10">
                    <Image
                        src="https://app.dapurbuzzer.co.id/images/icon/logo-appstore.png"
                        alt="App Store"
                        width={160}
                        height={60}
                        className="cursor-pointer hover:scale-105 transition"
                        onClick={() =>
                            window.open(
                                "https://apps.apple.com/us/app/dapur-buzzer/id1579080839",
                                "_blank"
                            )
                        }
                    />
                    <Image
                        src="https://app.dapurbuzzer.co.id/images/icon/logo-playstore.png"
                        alt="Play Store"
                        width={160}
                        height={60}
                        className="cursor-pointer hover:scale-105 transition"
                        onClick={() =>
                            window.open(
                                "https://play.google.com/store/apps/details?id=com.dapurbuzzer.app",
                                "_blank"
                            )
                        }
                    />
                </div>

                {/* 🔹 Sosial Media */}
                <div className="flex justify-center gap-8 mt-4">
                    <Icon
                        icon="mdi:instagram"
                        width="32"
                        height="32"
                        className="text-purple-600 hover:text-purple-800 cursor-pointer transition"
                        onClick={() => window.open("https://instagram.com/dapurbuzzer", "_blank")}
                    />
                    <Icon
                        icon="ic:baseline-tiktok"
                        width="32"
                        height="32"
                        className="text-purple-600 hover:text-purple-800 cursor-pointer transition"
                        onClick={() => window.open("https://www.tiktok.com/@dapurbuzzer", "_blank")}
                    />
                    <Icon
                        icon="mdi:facebook"
                        width="32"
                        height="32"
                        className="text-purple-600 hover:text-purple-800 cursor-pointer transition"
                        onClick={() => window.open("https://www.facebook.com/dapurbuzzer", "_blank")}
                    />
                </div>
            </section>

            {/* 🔹 Footer */}
            <footer className="text-center py-6 border-t bg-white text-gray-600 text-sm">
                © 2025 Dapur Buzzer Part of PT.FHCreative Group Indonesia.
            </footer>
        </main>
    );
}
