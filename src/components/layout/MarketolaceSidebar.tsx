"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ExternalLink,
  ChevronLeft,
} from "lucide-react";

export default function MarketplaceSidebar() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
        className={`bg-[#2E2E2E] text-[#CFC6BD] h-screen flex flex-col
        transition-all duration-300 shrink-0
        ${collapsed ? "w-14" : "w-64"}`}
        >
            {/* Hlogo saction */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-[#4A4A4A]">
            <Link href="/agency/dashboard" className="flex items-center gap-2">

                    {/* COLLAPSED — SHOW S */}
                    {collapsed && (
                    <div className="w-10 h-10 bg-[#9A8B7A] rounded flex items-center justify-center shadow">
                    <span className="text-black font-extrabold text-lg">S</span>
                    </div>
                )}              
                {!collapsed && (
                    <div className="flex items-center gap-3">
                    <img
                    src="/sterling-logo.JPG"
                    alt="Sterling Insurance Services"
                    className="h-8 w-auto object-contain bg-[#3A3632] p-1 rounded"
                    />
                    <div>
                        <div className="text-white font-bold text-lg leading-none">
                            Sterling
                        </div>
                        <div className="text-xs text-gray-400">
                        Wholesale Insurance
                        </div>
                    </div>
                </div>
                )}
             </Link>

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="text-gray-400 hover:text-white transition"
                >
                    <svg
                        className={`w-4 h-4 transition-transform ${collapsed ? "rotate-180" : ""
                            }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            </div>

            {/* FOOTER LINKS */}
            {/* FOOTER LINKS */}
            <div className="mt-auto px-3 pb-6 space-y-3">

            {/* OMGA */}
            <Link
                href="/agency/dashboard"
                target="_blank"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition"
            >
                <ExternalLink size={16} />
                {!collapsed && <span className="text-sm">OMGA</span>}
            </Link>

            {/* BROKER CENTER */}
            <a
                href="/agency/broker-center"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition"
            >
                <ExternalLink size={16} />
                {!collapsed && <span className="text-sm">Broker Center</span>}
            </a>

            </div>
        </aside>
    );
}