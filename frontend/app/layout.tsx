import "../styles/globals.css";
import 'flowbite';
import { ReactNode } from "react";

export const metadata = {
    title: "Dapur Buzzer",
    description: "Dashboard Admin Dapur Buzzer",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="id">
        <body>{children}</body>
        </html>
    );
}
