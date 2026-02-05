"use client";


import { useState } from "react";
import Link from "next/link";
import {
  Umbrella,
  Layers,
  Leaf,
  Hammer,
  ChevronDown,
  ChevronLeft,
} from "lucide-react";

const menu = [
  {
    id: "gl",
    label: "General Liability",
    icon: Umbrella,
    children: [
      { label: "Standard", href: "/agency/submit?program=gl-standard", badge: "NEW" },
      { label: "Plus", href: "/agency/submit?program=gl-plus" },
      { label: "Advantage", href: "/agency/submit?program=gl-advantage" },
      { label: "Compare Coverages", href: "/agency/compare" },
    ],
  },
  {
    id: "excess",
    label: "Excess Liability",
    icon: Layers,
    children: [{ label: "Excess", href: "/agency/submit?program=excess" }],
  },
  {
    id: "environmental",
    label: "Environmental",
    icon: Leaf,
    badge: "NEW",
    href: "/agency/submit?program=environmental",
  },
  {
    id: "inland",
    label: "Inland Marine",
    icon: Hammer,
    children: [
      { label: "Tools & Equipment", href: "/agency/submit?program=inland-tools" },
    ],
  },
  {
    id: "builders",
    label: "Builder's Risk",
    icon: Hammer,
    children: [
      { label: "0 - 2M TIV", href: "/agency/submit?program=br-small" },
      { label: "2M - 25M TIV", href: "/agency/submit?program=br-large" },
    ],
  },
];

export default function Sidebar() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`bg-[#2E2E2E] text-[#CFC6BD] h-screen flex flex-col transition-all duration-300
      ${collapsed ? "w-14" : "w-64"}`}
    >

      {/* LOGO */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-[#4A4A4A]">
        <Link href="/agency/dashboard" className="flex items-center gap-2">

          {/* COLLAPSED — SHOW S */}
          {collapsed && (
            <div className="w-10 h-10 bg-[#9A8B7A] rounded flex items-center justify-center shadow">
              <span className="text-black font-extrabold text-lg">S</span>
            </div>
          )}
          {/* EXPANDED — SHOW FULL LOGO */}
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

        {/* COLLAPSE BUTTON */}
        <button
          type="button"
          aria-label="Toggle sidebar"
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white"
        >

          <ChevronLeft
            className={`transition-transform ${collapsed ? "rotate-180" : ""}`}
            size={18}
          />
        </button>
      </div>

      {/* MENU */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        <div className="text-xs text-gray-400 px-3 mb-2 uppercase">
          {!collapsed && "Coverages"}
        </div>

        {menu.map((item) => {
          const Icon = item.icon;
          const isOpen = openId === item.id;

          return (
            <div key={item.id}>
              {/* MAIN BUTTON */}
              <button
                onClick={() =>
                  item.children
                    ? setOpenId(isOpen ? null : item.id)
                    : null
                }
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-all
                ${isOpen
                    ? "bg-[#8F8376] text-black"
                    : "hover:bg-[#3A3A3A] text-[#CFC6BD]"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <Icon size={18} />
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span className="ml-1 bg-[#8F8376] text-black text-[10px] px-2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>

                {!collapsed && item.children && (
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${isOpen ? "rotate-180" : ""
                      }`}
                  />
                )}
              </button>

              {/* SUB MENU */}
              {item.children && (
                <div
                  className={`overflow-hidden transition-all duration-300
                  ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="flex items-center justify-between px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded"
                      >
                        <span>{child.label}</span>
                        {"badge" in child && child.badge && (
                          <span className="bg-[#9A8B7A] text-black text-[10px] px-2 rounded-full">
                            {child.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* MARKETPLACE BUTTON */}
      {!collapsed && (
        <div className="p-3">
          <Link
            href="/agency/marketplace"
            className="block text-center bg-[#9A8B7A] text-black hover:bg-[#7A6F64] py-2 rounded font-semibold hover:bg-cyan-300 transition"
          >
            Sterling Marketplace
          </Link>
        </div>
      )}
    </aside>
  );
}