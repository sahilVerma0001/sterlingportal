"use client";
import MarketplaceSidebar from "@/components/layout/MarketplaceSidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
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
        {
          id: "plus-contractor",
          name: "Plus Contractor General Liability"
        },
        {
          id: "standard-contractor",
          name: "Standard Contractor General Liability",
          badge: "NEW Lower Rates!",
          badgeColor: "teal"
        },
        {
          id: "builders-risk",
          name: "Builders Risk"
        }
      ]
    },
    {
      id: "property",
      name: "Property",
      icon: "property",
      programs: [
        { id: "investor-property", name: "Investor Property" },
        { id: "builders-renovation", name: "Builder's Renovation" },
        { id: "vacant-land", name: "Vacant Land" },
        { id: "vacant-package", name: "Vacant Package" },
        { id: "1-8-dwelling", name: "1-8 Unit Dwelling" }
      ]
    },
    {
      id: "hospitality",
      name: "Hospitality",
      icon: "hospitality",
      programs: [
        { id: "hospitality", name: "Hospitality" }
      ]
    },
    {
      id: "trucking",
      name: "Trucking",
      icon: "trucking",
      programs: [
        { id: "domestic-long-haul", name: "Domestic Long Haul" },
        { id: "cargo", name: "Cargo" },
        { id: "physical-damage", name: "Physical Damage" }
      ]
    },
    {
      id: "excess",
      name: "Excess",
      icon: "excess",
      programs: [
        { id: "excess-everything", name: "Excess for Everything" },
        { id: "construction-excess", name: "Construction Excess Liability" },
        { id: "petroleum-excess", name: "Petroleum Distribution Excess Liability" }
      ]
    }
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

  const handleProgramSelect = (programId: string) => {
    setSelectedProgram(programId);
  };

  const handleContinue = () => {
    if (selectedProgram) {
      // Navigate to quote/application page
      router.push(`/agency/quote/${selectedProgram}`);
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
      <MarketplaceSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 p-3">
              <Link href="/agency/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Marketplace</h1>
                <p className="text-sm text-gray-600">Select industries and programs</p>
              </div>
            </div>
            {/*this button text*/}
            <button
              onClick={() => router.push('/api/auth/signout')}
              className="text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Industry Cards Grid */}
          <div className="flex-1">
            <div className="max-w-7xl mx-auto">
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {industries.map((industry) => {
                  const isExpanded = expandedIndustry === industry.id;

                  return (
                    <div
                      key={industry.id}
                      className={`relative transition-all duration-300 ${isExpanded ? 'col-span-1' : ''
                        }`}
                    >
                      {/* Industry Card Header */}
                      <div
                        onClick={() => handleIndustryClick(industry.id)}
                        className={`cursor-pointer bg-white border-2 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg ${isExpanded
                          ? 'border-[#9A8B7A] shadow-lg'
                          : 'border-gray-200 hover:border-gray-300'
                          }`}
                      >
                        {/* Featured Banner */}
                        {industry.featured && !isExpanded && (
                          <div className="bg-[#9A8B7A] px-4 py-3 text-white text-center">
                            <p className="text-sm font-semibold leading-tight">
                              {industry.featuredText}
                            </p>
                          </div>
                        )}

                        {/* Card Header */}
                        <div className={`flex items-center gap-3 p-4 ${industry.featured && !isExpanded ? '' : 'pt-6'}`}>
                          {/* Icon */}
                          <div className="relative flex-shrink-0">
                            {industry.icon === "construction" && (
                              <svg className="w-8 h-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l9-9 9 9M5 12l7-7 7 7" />
                              </svg>
                            )}
                            {industry.icon === "property" && (
                              <svg className="w-8 h-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                            )}
                            {industry.icon === "hospitality" && (
                              <svg className="w-8 h-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                              </svg>
                            )}
                            {industry.icon === "trucking" && (
                              <svg className="w-8 h-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12M8 7v13M8 7V4m12 3l4 6v7h-4m0 0a2 2 0 11-4 0m4 0a2 2 0 10-4 0m-12 0a2 2 0 11-4 0m4 0H4" />
                              </svg>
                            )}
                            {industry.icon === "excess" && (
                              <svg className="w-8 h-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={1.5} />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m-4-4h8" />
                              </svg>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="text-base font-semibold text-gray-900 flex-1">
                            {industry.name}
                          </h3>
                        </div>
                      </div>

                      {/* Expanded Programs List */}
                      {isExpanded && (
                        <div className="mt-4 space-y-2">
                          {industry.programs.map((program) => (
                            <label
                              key={program.id}
                              className="flex items-start gap-3 p-2 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-[#9A8B7A] hover:bg-gray-50 transition-all group"
                            >
                              {/* Checkbox (acts as radio) */}
                              <input
                                type="checkbox"
                                checked={selectedProgram === program.id}
                                onChange={() => handleProgramSelect(program.id)}
                                className="w-5 h-5 mt-0.5 text-[#9A8B7A] border-gray-300 rounded focus:ring-[#9A8B7A] focus:ring-2 cursor-pointer  accent-[#9A8B7A]"
                              />

                              {/* Program Info */}
                              <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-sm font-medium text-gray-900 group-hover:text-[#9A8B7A] transition-colors">
                                    {program.name}
                                  </span>
                                  {program.badge && (
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${program.badgeColor === 'teal'
                                      ? 'bg-[#9A8B7A] text-white'
                                      : 'bg-blue-100 text-blue-700'
                                      }`}>
                                      {program.badge}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Continue Button  this is button edting */}
          <div className="fixed bottom-6 right-6 z-50">
            <button
              onClick={handleContinue} 
              disabled={!selectedProgram}
              className={`px-8 py-3 rounded-lg text-base font-semibold shadow-lg transition-all
                ${
                  selectedProgram
                    ? "bg-[#9A8B7A] text-[#111827] hover:bg-[#7A6F64]"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
            >
              Continue
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
