"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import ISCPipelineBar from "@/components/layout/ISCPipelineBar";

export const dynamic = "force-dynamic";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { signOut } from "next-auth/react";

interface Submission {
  _id: string;
  submissionId: string;
  industry: string;
  clientName: string;
  status: string;
  createdAt: string;
}

interface PipelineStage {
  id: string;
  label: string;
  count: number;
}

// ISC STATUS MAP
const stageToStatusMap: Record<string, string> = {
  IN_PROGRESS: "SUBMITTED",
  REQUIRES_REVIEW: "ROUTED",
  APPROVAL_REQUESTED: "ROUTED",
  CONDITIONALLY_APPROVED: "ROUTED",
  APPROVED_QUOTE: "QUOTED",
  PENDING_BIND: "BIND_REQUESTED",
  READY_TO_BIND: "BIND_REQUESTED", // Maps to same status as PENDING_BIND
  NEWLY_BOUND: "BOUND"

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

  const [pipelineStages, setPipelineStages] = useState<PipelineStage[]>([
    { id: "IN_PROGRESS", label: "In Progress", count: 0 },
    { id: "REQUIRES_REVIEW", label: "Requires Review", count: 0 },
    { id: "APPROVAL_REQUESTED", label: "Approval Requested", count: 0 },
    { id: "CONDITIONALLY_APPROVED", label: "Quote Conditionally Approved", count: 0 },
    { id: "APPROVED_QUOTE", label: "Approved Quote", count: 0 },
    { id: "PENDING_BIND", label: "Pending Bind", count: 0 },
    { id: "READY_TO_BIND", label: "Ready To Bind", count: 0 },
    { id: "NEWLY_BOUND", label: "Newly Bound", count: 0 }
  ]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  useEffect(() => {
    filterSubmissions();
  }, [selectedStage, searchQuery, filterType, filterProgram, allSubmissions]);

  useEffect(() => {
    if (searchParams.get("submitted") === "true") {
      fetchSubmissions();
      router.replace("/agency/dashboard");
    }
  }, [searchParams, router]);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/agency/submissions");
      const data = await res.json();
      const list = data.submissions || [];

      setAllSubmissions(list);

      const counts: Record<string, number> = {
        SUBMITTED: 0,
        ROUTED: 0,
        QUOTED: 0,
        BIND_REQUESTED: 0,
        BOUND: 0
      };

      list.forEach((s: Submission) => {
        if (counts[s.status] !== undefined) {
          counts[s.status]++;
        }
      });

      setPipelineStages([
        { id: "IN_PROGRESS", label: "In Progress", count: counts.SUBMITTED },
        { id: "REQUIRES_REVIEW", label: "Requires Review", count: Math.floor(counts.ROUTED / 3) },
        { id: "APPROVAL_REQUESTED", label: "Approval Requested", count: 0 },
        { id: "CONDITIONALLY_APPROVED", label: "Quote Conditionally Approved", count: 0 },
        { id: "APPROVED_QUOTE", label: "Approved Quote", count: counts.QUOTED },
        { id: "PENDING_BIND", label: "Pending Bind", count: 0 },
        { id: "READY_TO_BIND", label: "Ready To Bind", count: counts.BIND_REQUESTED },
        { id: "NEWLY_BOUND", label: "Newly Bound", count: counts.BOUND }
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

    const statusFilter = stageToStatusMap[selectedStage];
    if (statusFilter) {
      filtered = filtered.filter(s => s.status === statusFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        s =>
          s.clientName.toLowerCase().includes(q) ||
          s.submissionId.toLowerCase().includes(q) ||
          s.industry.toLowerCase().includes(q)
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

        {/* STICKY PIPELINE */}
        <div className="sticky top-0 z-20">
          <ISCPipelineBar
            stages={pipelineStages}
            activeStage={selectedStage}
            onChange={setSelectedStage}
          />
        </div>

        {/* CONTENT */}
        <section className="flex-1 p-6 bg-[#F3F0ED]">


          <div className="bg-white border border-[#E5E7EB] rounded-xl px-4 py-3 flex items-center gap-4 mb-4">


            <input
              placeholder="Search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#111827] placeholder:text-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#9A8B7A]"

            />

            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="border border-[#E5E7EB] px-2 py-1 text-[12px] text-[#020617] focus:outline-none focus:ring-1 focus:ring-[#9A8B7A] rounded-lg text-sm"

            >
              <option value="ALL">All Types</option>
              <option value="SUBMITTED">New Business</option>
              <option value="ROUTED">Renewal</option>
            </select>

            <select
              value={filterProgram}
              onChange={e => setFilterProgram(e.target.value)}
              className="border border-[#9CA3AF] px-2 py-1 text-[12px] text-[#020617] focus:outline-none focus:ring-1 focus:ring-[#374151]">
              <option value="ALL">All Programs</option>
            </select>

            <div className="ml-auto text-xs text-gray-500">
              {submissions.length} of {allSubmissions.length}
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">

            {loading ? (
              <div className="text-center py-20 text-gray-600">
                Loading submissions...
              </div>
            ) : submissions.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-700">No submissions found</p>
                <Link
                  href="/agency/submit"
                  className="inline-block mt-4 bg-[#9A8B7A] hover:bg-[#7A6F64] transition text-white px-6 py-2.5 text-sm font-medium rounded-lg"
                >
                  + New Submission
                </Link>
              </div>
            ) : (
              <table className="w-full text-[13px] text-gray-800 border-collapse">
                <thead className="bg-[#F3F0ED] text-[#6B7280] uppercase text-[11px] tracking-wide sticky top-[44px] z-10">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">App ID</th>
                    <th className="px-4 py-3 text-left font-medium">Applicant Company</th>
                    <th className="px-4 py-3 text-left font-medium">Program</th>
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
                        {sub.submissionId}
                      </td>
                      <td className="px-4 py-2">{sub.clientName}</td>
                      <td className="px-4 py-2">{sub.industry}</td>
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
      </div> //d dkashboard layout
    </DashboardLayout>
  );
}

export default function AgencyDashboard() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#9A8B7A]"></div>
        </div>
      }
    >
      <AgencyDashboardContent />
    </Suspense>
  );
}