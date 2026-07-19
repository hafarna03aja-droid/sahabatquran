import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAQ Sahabat Qur'an - Absensi & Kas",
  description: "Sistem absensi dan keuangan santri SAQ Sahabat Qur'an",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className="h-full">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
