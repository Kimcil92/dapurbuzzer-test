import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { username } = await req.json();

        const res = await fetch("https://sprintpedia-proxy.vercel.app/api/sprintpedia", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username }),
        });

        const data = await res.json();

        return NextResponse.json(data, { status: res.status });
    } catch (err: any) {
        console.error("❌ Proxy Error:", err);
        return NextResponse.json({ error: "Gagal memproses request." }, { status: 500 });
    }
}
