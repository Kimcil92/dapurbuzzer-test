"use client";

import { Card } from "flowbite-react";
import { BarChart3, Users, Megaphone, Zap } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500">Total Pengguna</p>
                        <h3 className="text-3xl font-bold text-gray-800">1.532</h3>
                    </div>
                    <Users className="text-purple-600" size={32} />
                </div>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500">Total Kampanye</p>
                        <h3 className="text-3xl font-bold text-gray-800">248</h3>
                    </div>
                    <Megaphone className="text-green-600" size={32} />
                </div>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500">Aktivitas Hari Ini</p>
                        <h3 className="text-3xl font-bold text-gray-800">82</h3>
                    </div>
                    <Zap className="text-yellow-500" size={32} />
                </div>
            </Card>

            <div className="md:col-span-2 lg:col-span-3">
                <Card>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Statistik Aktivitas</h2>
                    <div className="text-gray-600 text-sm">
                        <BarChart3 className="inline-block mr-2 text-purple-500" />
                        Grafik performa campaign & engagement akan ditampilkan di sini.
                    </div>
                </Card>
            </div>
        </div>
    );
}
