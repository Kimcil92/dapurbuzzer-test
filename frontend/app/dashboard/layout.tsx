"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { Menu, LogOut, LayoutDashboard, ImageIcon } from "lucide-react";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        const token = Cookies.get("token");
        const userData = Cookies.get("user");

        if (!token || !userData) {
            router.push("/login");
        } else {
            setUser(JSON.parse(userData));
        }
    }, [router]);

    const handleLogout = () => {
        Cookies.remove("token");
        Cookies.remove("user");
        router.push("/login");
    };

    if (!user) return null;

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside
                className={`${
                    isSidebarOpen ? "w-64" : "w-20"
                } bg-white shadow-md p-4 transition-all duration-300 flex flex-col overflow-hidden`}
            >
                {/* Header Sidebar */}
                <div className="flex items-center justify-between mb-8">
                    <h2
                        className={`text-lg font-bold text-purple-700 whitespace-nowrap transition-all duration-300 ${
                            isSidebarOpen ? "opacity-100" : "opacity-0 hidden"
                        }`}
                    >
                        Dapur Buzzer
                    </h2>
                    <button
                        className="text-gray-500 hover:text-purple-600"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <Menu size={20} />
                    </button>
                </div>

                {/* Menu List */}
                <nav className="space-y-3 flex-1">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition-colors"
                    >
                        <LayoutDashboard size={18} />
                        {isSidebarOpen && <span>Dashboard</span>}
                    </Link>

                    <Link
                        href="/dashboard/banners"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition-colors"
                    >
                        <ImageIcon size={18} />
                        {isSidebarOpen && <span>Banner</span>}
                    </Link>
                </nav>

                {/* Logout */}
                <div className="border-t pt-4">
                    <Button
                        color="failure"
                        size="sm"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 justify-center"
                    >
                        <LogOut size={16} />
                        {isSidebarOpen && "Keluar"}
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                {/* Topbar */}
                <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-semibold text-gray-800">
                        Dashboard
                    </h1>
                    <div className="text-sm text-gray-600">
                        Halo,{" "}
                        <span className="font-semibold text-purple-600">
                            {user.name}
                        </span>
                    </div>
                </header>

                {/* Content */}
                <section className="flex-1 p-8">{children}</section>
            </main>
        </div>
    );
}
