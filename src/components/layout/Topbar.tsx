"use client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  Home,
  BarChart3,
  ListChecks,
  Shield,
  Heart,
  Trash2,
  Users,
  MessageCircle,
  Search
} from "lucide-react";

export default function Topbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();


  // ✅ Single Icon Helper (ISC Active Style)
  const iconClass = (active = false) =>
  `w-5 h-5 cursor-pointer transition-all duration-150
   ${active
    ? "bg-[#9A8B7A] text-white p-1.5 rounded-md"
    : "text-[#6B7280] hover:text-[#9A8B7A]"}`;


  // ✅ Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="h-16 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-6">

      {/* LEFT — SEARCH BAR */}
      <div className="flex items-center gap-3 w-[420px]">
        <div className="flex items-center border border-[#E5E7EB] rounded-lg px-3 py-2 w-full bg-white">

          <Search className="w-4 h-4 text-[#9A8B7A] mr-2" />
          <input
            placeholder="Search"
            className="flex-1 outline-none text-sm text-[#111827] placeholder-[#6B7280] bg-transparent"
          />
        </div>

        <button className="text-sm font-medium text-[#9A8B7A] hover:text-[#7A6F64] transition">
          Advanced
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-5 relative" ref={dropdownRef}>
        {/* ICON BAR */}
        <Home
          className={iconClass(pathname === "/agency/dashboard")}
        />
        <BarChart3
          onClick={() => router.push("/agency/broker-center")}
          className={iconClass(pathname === "/agency/broker-center")}
        />
        <ListChecks className={iconClass()} />
        <Shield className={iconClass()} />
        <Heart className={iconClass()} />
        <Trash2 className={iconClass()} />
        <Users className={iconClass()} />
        <MessageCircle className={iconClass()} />

        {/* PROFILE BUTTON */}
        <button
          type="button"
          onClick={() => setOpen(prev => !prev)}
          className="w-9 h-9 rounded-full bg-[#9A8B7A] text-white flex items-center justify-center font-semibold hover:bg-[#7A6F64] transition"

        >
          {session?.user?.name?.[0] || "E"}
        </button>

        {/* DROPDOWN */}
        <div
          className={`absolute right-0 top-12 w-64 bg-white rounded-xl shadow-lg border border-[#E5E7EB] z-50 text-[#111827]
          transition-all duration-150 ease-out
          ${open
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-1 pointer-events-none"}`}
        >
          <div className="px-4 py-3 border-b border-[#E5E7EB]">
            <p className="font-medium text-sm text-gray-900">
              {session?.user?.name || "User"}
            </p>
            <p className="text-xs text-gray-600">
              {session?.user?.email || "email@example.com"}
            </p>
          </div>

          <button
            type="button"
            onClick={() => signOut()}
            className="w-full text-left px-4 py-2 text-sm text-[#111827] hover:bg-[#F3F0ED] transition"

          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
