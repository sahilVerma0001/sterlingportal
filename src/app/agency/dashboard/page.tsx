"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import ISCPipelineBar from "@/components/layout/ISCPipelineBar";

export const dynamic = "force-dynamic";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";

interface Submission {
  _id: string;
  submissionId: string;
  industry: string;
  subtype: string;
  templateTitle: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  fileCount: number;
  state: string;
  estimatedPremium?: number;
}

interface PipelineStage {
  id: string;
  label: string;
  count: number;
}

const stageToStatusMap: Record<string, string | string[]> = {
  IN_PROGRESS: "SUBMITTED",
  REQUIRES_REVIEW: "ROUTED",
  APPROVAL_REQUESTED: "ROUTED",
  CONDITIONALLY_APPROVED: "ROUTED",
  APPROVED_QUOTE: "QUOTED",
  PENDING_BIND: "BIND_REQUESTED",
  INCOMPLETE_BIND: "BIND_REQUESTED",
  READY_TO_BIND: "BIND_REQUESTED",
  NEWLY_BOUND: "BOUND",
  UNDERWRITING_DECLINED: "DECLINED",
};

function AgencyDashboardContent() {
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [allSubmissions, setAllSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState("IN_PROGRESS");
  const [filterType, setFilterType] = useState("ALL");
  const [filterProgram, setFilterProgram] = useState("ALL");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  const [pipelineStages, setPipelineStages] = useState<PipelineStage[]>([
    { id: "IN_PROGRESS", label: "In Progress", count: 0 },
    { id: "REQUIRES_REVIEW", label: "Requires Review", count: 0 },
    { id: "APPROVAL_REQUESTED", label: "Approval Requested", count: 0 },
    { id: "CONDITIONALLY_APPROVED", label: "Quote Conditionally Approved", count: 0 },
    { id: "APPROVED_QUOTE", label: "Approved Quote", count: 0 },
    { id: "PENDING_BIND", label: "Pending Bind", count: 0 },
    { id: "INCOMPLETE_BIND", label: "Incomplete Bind", count: 0 },
    { id: "READY_TO_BIND", label: "Ready To Bind", count: 0 },
    { id: "NEWLY_BOUND", label: "Newly Bound", count: 0 },
    { id: "UNDERWRITING_DECLINED", label: "Underwriting Declined", count: 0 },
  ]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  useEffect(() => {
    fetchAllSubmissions();
  }, []);

  useEffect(() => {
    filterSubmissions();
  }, [selectedStage, searchQuery, filterType, filterProgram, filterStartDate, filterEndDate, allSubmissions]);

  useEffect(() => {
    if (searchParams.get("submitted") === "true") {
      fetchAllSubmissions();
      router.replace("/agency/dashboard");
    }
  }, [searchParams, router]);

  const fetchAllSubmissions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterStartDate) params.append("startDate", filterStartDate);
      if (filterEndDate) params.append("endDate", filterEndDate);

      const res = await fetch(`/api/agency/submissions?${params.toString()}`);
      const data = await res.json();
      const list = data.submissions || [];

      setAllSubmissions(list);

      const counts: Record<string, number> = {
        SUBMITTED: 0,
        ROUTED: 0,
        QUOTED: 0,
        BIND_REQUESTED: 0,
        BOUND: 0,
        DECLINED: 0,
      };

      list.forEach((s: Submission) => {
        if (counts[s.status] !== undefined) {
          counts[s.status]++;
        }
      });

      setPipelineStages([
        { id: "IN_PROGRESS", label: "In Progress", count: counts.SUBMITTED },
        { id: "REQUIRES_REVIEW", label: "Requires Review", count: 0 },
        { id: "APPROVAL_REQUESTED", label: "Approval Requested", count: Math.floor(counts.ROUTED / 3) },
        { id: "CONDITIONALLY_APPROVED", label: "Quote Conditionally Approved", count: 0 },
        { id: "APPROVED_QUOTE", label: "Approved Quote", count: counts.QUOTED },
        { id: "PENDING_BIND", label: "Pending Bind", count: 0 },
        { id: "INCOMPLETE_BIND", label: "Incomplete Bind", count: 0 },
        { id: "READY_TO_BIND", label: "Ready To Bind", count: counts.BIND_REQUESTED },
        { id: "NEWLY_BOUND", label: "Newly Bound", count: counts.BOUND },
        { id: "UNDERWRITING_DECLINED", label: "Underwriting Declined", count: counts.DECLINED },
      ]);

      filterSubmissionsWithData(list);
    } catch (err) {
      console.error(err);
      setAllSubmissions([]);
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  const filterSubmissionsWithData = (data: Submission[]) => {
    let filtered = data;

    const stageStatus = stageToStatusMap[selectedStage];
    if (stageStatus) {
      if (Array.isArray(stageStatus)) {
        filtered = filtered.filter(s => stageStatus.includes(s.status));
      } else {
        filtered = filtered.filter(s => s.status === stageStatus);
      }
    }

    if (filterType !== "ALL") {
      filtered = filtered.filter(s => s.status === filterType);
    }

    if (filterProgram !== "ALL") {
      filtered = filtered.filter(s => s.industry === filterProgram);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        s =>
          s.clientName.toLowerCase().includes(q) ||
          s.submissionId.toLowerCase().includes(q) ||
          s.clientEmail.toLowerCase().includes(q) ||
          s.industry.toLowerCase().includes(q) ||
          s.subtype.toLowerCase().includes(q)
      );
    }

    setSubmissions(filtered);
  };

  const filterSubmissions = () => {
    filterSubmissionsWithData(allSubmissions);
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">

        {/* STICKY PIPELINE BAR */}
        <div className="sticky top-0 z-20">
          <ISCPipelineBar
            stages={pipelineStages}
            activeStage={selectedStage}
            onChange={setSelectedStage}
          />
        </div>

        {/* CONTENT */}
        <section className="flex-1 p-4 bg-[#F5F6F7]">

          {/* FILTER BAR */}
          <div className="bg-white border px-4 py-1.5 flex items-center gap-3 mb-3">

            <input
              placeholder="Search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="border border-[#9CA3AF] px-3 py-1 text-[12px] text-[#020617] placeholder:text-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#374151]"
            />

            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="border border-[#9CA3AF] px-2 py-1 text-[12px] text-[#020617] focus:outline-none focus:ring-1 focus:ring-[#374151]"
            >
              <option value="ALL">All Types</option>
              <option value="SUBMITTED">New Business</option>
              <option value="ROUTED">Renewal</option>
            </select>

            <select
              value={filterProgram}
              onChange={e => setFilterProgram(e.target.value)}
              className="border border-[#9CA3AF] px-2 py-1 text-[12px] text-[#020617] focus:outline-none focus:ring-1 focus:ring-[#374151]"
            >
              <option value="ALL">All Programs</option>
              {Array.from(new Set(allSubmissions.map(s => s.industry))).map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>

            <input
              type="date"
              value={filterStartDate}
              onChange={e => setFilterStartDate(e.target.value)}
              className="border border-[#9CA3AF] px-2 py-1 text-[12px] text-[#020617] focus:outline-none focus:ring-1 focus:ring-[#374151]"
            />

            <div className="ml-auto text-xs text-gray-500">
              {submissions.length} of {allSubmissions.length}
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white border overflow-hidden">
            {loading ? (
              <div className="text-center py-20 text-gray-600">
                Loading submissions...
              </div>
            ) : submissions.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-700">No submissions found</p>
                <Link
                  href="/agency/submit"
                  className="inline-block mt-4 bg-gray-800 hover:bg-gray-900 transition text-white px-5 py-2 text-xs font-medium"
                >
                  + New Submission
                </Link>
              </div>
            ) : (
              <table className="w-full text-[13px] text-gray-800 border-collapse">
                <thead className="bg-[#E5E7EB] text-gray-600 uppercase text-[11px] tracking-wide sticky top-[44px] z-10">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">App ID</th>
                    <th className="px-4 py-3 text-left font-medium">Applicant Company</th>
                    <th className="px-4 py-3 text-left font-medium">Program</th>
                    <th className="px-4 py-3 text-left font-medium">Line of Business</th>
                    <th className="px-4 py-3 text-left font-medium">Effective Date</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map(sub => (
                    <tr
                      key={sub._id}
                      className="border-t hover:bg-[#F9FAFB] transition"
                    >
                      <td className="px-4 py-2 font-medium">
                        <Link
                          href={`/agency/submissions/${sub._id}`}
                          className="hover:text-blue-600"
                        >
                          {sub.submissionId}
                        </Link>
                      </td>
                      <td className="px-4 py-2">{sub.clientName}</td>
                      <td className="px-4 py-2">{sub.industry}</td>
                      <td className="px-4 py-2">{sub.subtype}</td>
                      <td className="px-4 py-2">
                        {new Date(sub.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default function AgencyDashboard() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-600"></div>
        </div>
      }
    >
      <AgencyDashboardContent />
    </Suspense>
  );
}