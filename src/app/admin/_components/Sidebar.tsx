"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const MENUS = [
  { key: "absensi", label: "Absensi" },
  { key: "kas", label: "Kas Bulanan" },
  { key: "buku", label: "Pembukuan (Infak)" },
  { key: "santri", label: "Data Santri" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "absensi";

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          Menu Admin
        </button>
      </div>

      {/* Desktop Navigation (Tabs) */}
      <nav className="hidden md:flex gap-2 border-b border-slate-200 pb-2 text-sm">
        {MENUS.map((menu) => (
          <Link
            key={menu.key}
            href={`/admin?tab=${menu.key}`}
            className={`rounded-lg px-3 py-2 font-medium ${
              currentTab === menu.key
                ? "bg-blue-100 text-blue-800"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            {menu.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Drawer (Overlay + Sidebar) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/50 transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100 bg-blue-800 text-white">
              <span className="font-bold">Menu Admin</span>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-blue-700 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <nav className="flex-1 flex flex-col gap-1 p-4">
              {MENUS.map((menu) => (
                <Link
                  key={menu.key}
                  href={`/admin?tab=${menu.key}`}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-4 py-3 font-medium transition-colors ${
                    currentTab === menu.key
                      ? "bg-blue-100 text-blue-800"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {menu.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
