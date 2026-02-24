"use client";
import MarketplaceSidebar from "@/components/layout/MarketplaceSidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Program {
  id: string;
  name: string;
  badge?: string;
  badgeColor?: string;
}

interface Industry {
  id: string;
  name: string;
  icon: string;
  featured?: boolean;
  featuredText?: string;
  programs: Program[];
}

export default function MarketplacePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [expandedIndustry, setExpandedIndustry] = useState<string | null>("construction");
  const [profileOpen, setProfileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const industries: Industry[] = [
    {
      id: "construction",
      name: "Construction",
      icon: "construction",
      featured: true,
      featuredText: "New Lower Rates for Standard GL!",
      programs: [
        {
          id: "advantage-contractor",
          name: "Advantage Contractor General Liability",
          badge: "NEW All 50 States!",
          badgeColor: "teal"
        },
        // {
        //   id: "plus-contractor",
        //   name: "Plus Contractor General Liability"
        // },
        // {
        //   id: "standard-contractor",
        //   name: "Standard Contractor General Liability",
        //   badge: "NEW Lower Rates!",
        //   badgeColor: "teal"
        // },
        // {
        //   id: "builders-risk",
        //   name: "Builders Risk"
        // }
      ]
    },
    // {
    //   id: "property",
    //   name: "Property",
    //   icon: "property",
    //   programs: [
    //     { id: "investor-property", name: "Investor Property" },
    //     { id: "builders-renovation", name: "Builder's Renovation" },
    //     { id: "vacant-land", name: "Vacant Land" },
    //     { id: "vacant-package", name: "Vacant Package" },
    //     { id: "1-8-dwelling", name: "1-8 Unit Dwelling" }
    //   ]
    // },
    // {
    //   id: "hospitality",
    //   name: "Hospitality",
    //   icon: "hospitality",
    //   programs: [
    //     { id: "hospitality", name: "Hospitality" }
    //   ]
    // },
    // {
    //   id: "trucking",
    //   name: "Trucking",
    //   icon: "trucking",
    //   programs: [
    //     { id: "domestic-long-haul", name: "Domestic Long Haul" },
    //     { id: "cargo", name: "Cargo" },
    //     { id: "physical-damage", name: "Physical Damage" }
    //   ]
    // },
    // {
    //   id: "excess",
    //   name: "Excess",
    //   icon: "excess",
    //   programs: [
    //     { id: "excess-everything", name: "Excess for Everything" },
    //     { id: "construction-excess", name: "Construction Excess Liability" },
    //     { id: "petroleum-excess", name: "Petroleum Distribution Excess Liability" }
    //   ]
    // }
  ];

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  const handleIndustryClick = (industryId: string) => {
    if (expandedIndustry === industryId) {
      setExpandedIndustry(null);
    } else {
      setExpandedIndustry(industryId);
    }
  };



  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-cyan-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-sm text-gray-600 font-medium">Loading marketplace...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar - Matching Dashboard */}
      {/* <MarketplaceSidebar /> */}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        {/* DASHBOARD STYLE HEADER */}
        <div className="px-10 pt-8 pb-4">
          <div className="flex items-center justify-between">

            {/* LEFT TITLE */}
            <h1
              className="
                px-6 py-2.5 rounded-2xl bg-[#9A8B7A] text-white
                shadow-md hover:shadow-lg hover:scale-[1.04]
                active:scale-[0.98] transition-all duration-200
                text-[34px] font-semibold inline-block cursor-pointer
              "
            >
              Sterling Insurance Services
            </h1>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-5 relative">

              <button
                title="Home"
                onClick={() => router.push("/agency/dashboard")}
                className="m-3 rounded-xl hover:bg-gray-100 transition-all duration-200"
              >
                <svg
                  className="w-[22px] h-[22px] text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                  />
                </svg>
              </button>
              <span className="absolute left-1/2 -translate-x-1/2 mt-2 scale-0 group-hover:scale-100 transition-transform bg-black text-white text-xs rounded px-2 py-1">
                Home
              </span>
              {/* PROFILE */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-10 h-10 rounded-full bg-[#9A8B7A] text-white flex items-center justify-center font-semibold text-sm shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200"
                >
                  {session?.user?.name?.[0] || "U"}
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

                    <div className="px-4 py-3 border-b bg-gray-50">
                      <p className="text-sm font-semibold">{session?.user?.name}</p>
                      <p className="text-xs text-gray-500">{session?.user?.email}</p>
                    </div>

                    <button
                      onClick={() => router.push("/api/auth/signout")}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100"
                    >
                      Logout
                    </button>

                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex justify-start p-10">

          {/* BIG CONSTRUCTION BUTTON */}
          <button
            onClick={() => router.push("/agency/quote/advantage-contractor")}
            className="
              w-[320px] 
              h-[120px] 
              rounded-2xl 
              bg-[#9A8B7A] 
              text-white 
              text-2xl 
              font-semibold
              flex 
              items-center 
              justify-center
              shadow-md
              hover:shadow-lg
              hover:scale-[1.02]
              active:scale-[0.98]
              transition-all
              duration-200
            "
          >
            Construction
          </button>

        </div>
      </main>
    </div>
  );
}