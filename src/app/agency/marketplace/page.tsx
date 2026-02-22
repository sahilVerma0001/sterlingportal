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
        <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 p-3">
              <Link title="Back" href="/agency/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              {/* <div>
                <h1 className="text-xl font-bold text-gray-900">Marketplace</h1>
                <p className="text-sm text-gray-600">Select industries and programs</p>
              </div> */}
            </div>
            <div className="flex items-center gap-4">
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
              {/*this button text*/}
              <button
                title="Sign Out"
                onClick={() => router.push('/api/auth/signout')}
                className="text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Sign Out
              </button>
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