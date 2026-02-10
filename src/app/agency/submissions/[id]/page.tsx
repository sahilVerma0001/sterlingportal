"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
export const dynamic = 'force-dynamic';

import {
  ArrowLeft,
  User,
  MapPin,
  Phone,
  Mail,
  Heart,
  UserPlus,
  Copy,
  Share2,
} from "lucide-react";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

interface SubmissionDetails {
  submission: {
    _id: string;
    agencyId: string;
    templateId: any;
    payload: Record<string, any>;
    files: Array<{
      fieldKey: string;
      fileUrl: string;
      fileName: string;
      fileSize: number;
      mimeType: string;
    }>;
    status: string;
    clientContact: {
      name: string;
      phone: string;
      email: string;
      EIN?: string;
      businessAddress: {
        street: string;
        city: string;
        state: string;
        zip: string;
      };
    };
    ccpaConsent: boolean;
    state: string;
    createdAt: string;
    updatedAt: string;
    programId?: string;
    programName?: string;
    submissionId?: string;
    adminNotes?: string;
  };
  routingLogs: Array<{
    _id: string;
    submissionId: string;
    carrierId: {
      _id: string;
      name: string;
      email: string;
    } | null;
    status: string;
    notes?: string;
    createdAt: string;
  }>;
  quotes: Array<{
    _id: string;
    submissionId: string;
    carrierId: {
      _id: string;
      name: string;
      email: string;
    } | null;
    carrierQuoteUSD: number;
    brokerFeeAmountUSD: number;
    finalAmountUSD: number;
    status: string;
    createdAt: string;
    binderPdfUrl?: string;
    proposalPdfUrl?: string;
  }>;
}

function SubmissionDetailsContent() {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (!submissionId) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);

      const res = await fetch(
        `/api/agency/submissions/${submissionId}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
const [noteFilters, setNoteFilters] = useState<string[]>(["Underwriter"]);

const toggleNoteFilter = (filter: string) => {
  setNoteFilters((prev) =>
    prev.includes(filter)
      ? prev.filter((f) => f !== filter)
      : [...prev, filter]
  );
};

      if (!res.ok) throw new Error("Upload failed");

      toast.success("Document uploaded successfully");

      // 🔁 refresh submission data
      fetchSubmission();
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload document");
    } finally {
      setUploading(false);
    }
  };
  const toggleNoteFilter = (filter: string) => {
  setNoteFilters((prev) =>
    prev.includes(filter)
      ? prev.filter((f) => f !== filter)
      : [...prev, filter]
  );
};
  // ✅ REQUIRED DOCUMENT CHECKLIST TOGGLE (ISC STYLE)
const toggleDoc = (doc: string) => {
  setCheckedDocs((prev) => ({
    ...prev,
    [doc]: !prev[doc],
  }));
};

  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const submissionId = params?.id as string;

  const [data, setData] = useState<SubmissionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [loadingActivity, setLoadingActivity] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [noteText, setNoteText] = useState("");
  const [noteFilters, setNoteFilters] = useState<string[]>(["Underwriter"]);

  // Check for success message from edit
  useEffect(() => {
    if (searchParams?.get("updated") === "true") {
      toast.success("Submission updated successfully!", {
        description: "Your changes have been saved.",
      });
      // Remove query param from URL
      router.replace(`/agency/submissions/${submissionId}`, { scroll: false });
    }
  }, [searchParams, router, submissionId]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated" && submissionId) {
      fetchSubmission();
      fetchActivityLogs();
    }
  }, [status, submissionId]);

  const fetchActivityLogs = async () => {
    if (!submissionId) return;
    setLoadingActivity(true);
    try {
      const response = await fetch(`/api/agency/submissions/${submissionId}/activity`);
      if (response.ok) {
        const data = await response.json();
        setActivityLogs(data.logs || []);
      }
    } catch (err) {
      console.error("Error fetching activity logs:", err);
    } finally {
      setLoadingActivity(false);
    }
  };

  const fetchSubmission = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/agency/submissions/${submissionId}`);
      const data = await response.json();

      if (data.submission) {
        setData({
          submission: data.submission,
          routingLogs: data.routingLogs || [],
          quotes: data.quotes || [],
        });
      } else if (data.error) {
        setError(data.error);
      }
    } catch (err: any) {
      console.error("Error fetching submission:", err);
      setError("Failed to load submission details");
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "SUBMITTED":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "ROUTED":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "QUOTED":
        return "bg-purple-100 text-purple-800 border border-purple-200";
      case "BIND_REQUESTED":
        return "bg-orange-100 text-orange-800 border border-orange-200";
      case "BOUND":
        return "bg-green-100 text-green-800 border border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const getQuoteStatusBadgeColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800 border border-green-200";
      case "ENTERED_BY_ADMIN":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "DECLINED":
        return "bg-red-100 text-red-800 border border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center py-20 bg-gray-50">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-cyan-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-sm text-gray-600 font-medium">Loading submission details...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  if (error || !data) {
    return (
      <div className="flex flex-col min-h-full">
        <aside className="w-[70px] bg-[#3A3C3F] flex flex-col items-center pt-6 pb-8 fixed h-full z-50 border-r border-gray-700">
          <Link href="/agency/dashboard" className="mb-8 group flex flex-col items-center">
            <div className="relative mb-3">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00BCD4] to-[#0097A7] rounded-xl blur-md opacity-40 group-hover:opacity-60 transition-all"></div>
              <div className="relative w-14 h-14 bg-gradient-to-br from-[#1A1F2E] via-[#2A3240] to-[#1A1F2E] rounded-xl flex items-center justify-center shadow-2xl border border-[#00BCD4]/20 group-hover:border-[#00BCD4]/40 transition-all overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00BCD4] to-transparent"></div>
                </div>
                <svg className="relative w-9 h-9" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 10 L80 25 L80 55 Q80 75 50 90 Q20 75 20 55 L20 25 Z" fill="url(#logoGradient1)" className="drop-shadow-lg" />
                  <path d="M50 25 L65 40 L50 70 L35 40 Z" fill="url(#logoGradient2)" className="drop-shadow-md" />
                  <path d="M50 30 L50 65" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" className="drop-shadow-sm" />
                  <path d="M40 47 L60 47" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
                  <defs>
                    <linearGradient id="logoGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00BCD4" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#0097A7" stopOpacity={0.95} />
                    </linearGradient>
                    <linearGradient id="logoGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#00BCD4] rounded-full opacity-60"></div>
                <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-[#00BCD4] rounded-full opacity-60"></div>
              </div>
            </div>
            <div className="text-center px-2">
              <p className="text-[9px] font-semibold text-gray-400 leading-tight tracking-wide uppercase group-hover:text-gray-300 transition-colors" style={{ letterSpacing: '0.05em' }}>Sterling</p>
              <p className="text-[8px] font-medium text-gray-500 leading-tight group-hover:text-gray-400 transition-colors">Wholesale Insurance</p>
            </div>
          </Link>
        </aside>
        <main className="flex-1 ml-[70px] p-8">
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
            <p className="text-red-600 mb-6">{error || "Submission not found"}</p>
            <Link href="/agency/dashboard" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00BCD4] text-white rounded-lg text-sm font-medium hover:bg-[#00ACC1] transition-colors">
              ← Back to Dashboard
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const { submission, routingLogs, quotes } = data;

  // Build timeline from submission history
  const timeline = [
    {
      date: submission.createdAt,
      title: "Submission Created",
      description: "Application submitted",
      icon: "📝",
      color: "blue",
    },
    ...routingLogs.map((log) => ({
      date: log.createdAt,
      title: `Routed to ${log.carrierId?.name || "Carrier"}`,
      description: log.status === "SENT" ? "Successfully sent" : "Failed to send",
      icon: log.status === "SENT" ? "✅" : "❌",
      color: log.status === "SENT" ? "green" : "red",
    })),
    ...quotes.map((quote) => ({
      date: quote.createdAt,
      title: `Quote Received from ${quote.carrierId?.name || "Carrier"}`,
      description: `Amount: $${quote.finalAmountUSD.toLocaleString()}`,
      icon: "💰",
      color: "purple",
    })),
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <DashboardLayout>
    
      {/* Sidebar - Matching Dashboard */}

      {/* Main Content */}
      <main className="flex-1 ml-[6px] bg-gray-50 overflow-x-hidden">
        {/* Header */}
        {/* ISC STYLE HEADER – NO BORDER */}
        <div className="bg-white px-6 pt-5 pb-4">
          <div className="flex items-start justify-between">

            {/* LEFT SIDE */}
           <div className="bg-white px-8 py-3">
              <Link href="/agency/dashboard" className="mt-1">
                <ArrowLeft className="w-5 h-5 text-gray-500 hover:text-black" />
              </Link>

              <div>
                {/* Title */}
                <h1 className="flex items-center gap-3 text-[24px] font-semibold text-gray-900 leading-[28px] leading-tight">
                  {submission.clientContact.name}
                   <span className="inline-flex items-center rounded-md bg-gray-100 px-3 py-[4px] text-[13px] font-medium text-gray-700 ">
              {submission.status.replace("_", " ")}
            </span>
                </h1>

                {/* Meta Row */}
                <div className="flex items-center flex-wrap gap-x-5 gap-y-1 mt-2 text-[14px] text-gray-700">

                  <span className="flex items-center gap-1.5">
                    <User className="w-[18px] h-[18px] text-gray-500 text-gray-400" />
                    {submission.clientContact.name}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {submission.clientContact.businessAddress.city},{" "}
                    {submission.clientContact.businessAddress.state}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4" />
                    {submission.clientContact.phone}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4" />
                    {submission.clientContact.email}
                  </span>

                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-4">

              {/* ICON ACTIONS */}
              <div className="flex items-center gap-5">
                <button className="p-2 rounded-md hover:bg-gray-100">
                  <Heart className="w-[22px] h-[22px] text-gray-500 hover:text-gray-700" />
                </button>

                <button className="p-2 rounded-md hover:bg-gray-100">
                  <UserPlus className="w-[22px] h-[22px] text-gray-500 hover:text-gray-700" />
                </button>

                <button className="p-2 rounded-md hover:bg-gray-100">
                  <Copy className="w-[22px] h-[22px] text-gray-500 hover:text-gray-700" />
                </button>

                <button className="p-2 rounded-md hover:bg-gray-100">
                  <Share2 className="w-[22px] h-[22px] text-gray-500 hover:text-gray-700" />
                </button>
              </div>
              {/* APP ID */}
              <span className="text-[14px] text-gray-500 ml-2">
                App ID {submission.submissionId || submission._id.slice(-6)}
              </span>
            </div>
          </div>
        </div>
        {/* APP INFO ROW – ISC STYLE */}
        <div className="bg-white px-6 h-[64px] border-t border-gray-100">
          <div className="flex items-center justify-between w-full h-full">
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <h2 className="text-[16px] font-semibold text-gray-900">App Info</h2>
              <span className="px-3 py-[4px] rounded-md bg-gray-100 text-[13px] text-gray-700">
                {submission.status.replace("_", " ")}
              </span>
            </div>

            {/* RIGHT BUTTONS */}
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-[14px] font-medium text-gray-700">
                Quick Quote
              </button>

              <button className="px-4 py-2 border border-gray-300 rounded-md text-[14px] font-medium text-gray-400 cursor-not-allowed">
                App Packet
              </button>

              <button className="px-4 py-2 border border-gray-300 rounded-md text-[14px] font-medium text-gray-700">
                Edit
              </button>

              <button className="px-5 py-2 rounded-md bg-[#2DD4BF] text-white text-[14px] font-semibold">
                Request Approval
              </button>

              <button className="px-4 py-2 border border-gray-300 rounded-md text-[14px] font-medium text-gray-700">
                Cancel Quote
              </button>
            </div>
          </div>
        </div>
        {/* KEY INFO GRID – ISC STYLE */}
        {/* ISC STYLE – KEY INFO STRIP */}
        <div className="bg-white px-6 py-5 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-y-6 gap-x-14 text-[14px]">

            {/* Total Cost */}
            <div>
              <p className="text-gray-500 mb-1">Total Cost:</p>
              <p className="font-semibold text-gray-900">
                {quotes.length > 0
                  ? `$${quotes[0].finalAmountUSD.toLocaleString()}`
                  : "Not Quoted"}
              </p>
            </div>

            {/* Create Date */}
            <div>
              <p className="text-gray-500 mb-1">Create Date:</p>
              <p className="font-semibold text-gray-900">
                {new Date(submission.createdAt).toLocaleString()}
              </p>
            </div>

            {/* Agency */}
            <div>
              <p className="text-gray-500 mb-1">Agency:</p>
              <p className="font-semibold text-gray-900">
                {(session?.user as any)?.agencyName || "—"}
              </p>
            </div>

            {/* Agent */}
            <div>
              <p className="text-gray-500 mb-1">Agent:</p>
              <p className="font-semibold text-gray-900">
                {session?.user?.name || "—"}
              </p>
            </div>

            {/* Payment Option */}
            <div>
              <p className="text-gray-500 mb-1">Payment Option:</p>
              <p className="font-semibold text-gray-900">
                3rd Party Finance
              </p>
            </div>

            {/* Bind Date */}
            <div>
              <p className="text-gray-500 mb-1">Bind Date:</p>
              <p className="font-semibold text-gray-900">—</p>
            </div>

          </div>
        </div>
    {/* ISC STYLE – STANDARD GL A-RATED SECTION */}
    <div className="bg-white px-8 py-6 border-t border-gray-200">

      {/* SECTION TITLE */}
      <div className="mb-6">
        <h3 className="text-[15px] font-semibold text-gray-900 tracking-tight">
          Standard GL A-Rated - Claims Made
        </h3>
        <div className="mt-2 h-[1px] w-64 bg-gray-300" />
      </div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-6 text-[14px]">

        {/* LEFT */}
        <div className="space-y-4">
          <div className="flex">
            <span className="w-28 text-gray-500">Carrier:</span>
            <span className="font-medium text-gray-900 leading-[18px] tracking-tight">
              {quotes[0]?.carrierId?.name || "—"}
            </span>
          </div>

          <div className="flex">
            <span className="w-28 text-gray-500">Cost:</span>
            <span className="font-medium text-gray-900 leading-[18px] tracking-tight">
              {quotes.length > 0
                ? `$${quotes[0].finalAmountUSD.toLocaleString()}`
                : "Not Quoted"}
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          <div className="flex">
            <span className="w-36 text-gray-500">Policy Number:</span>
            <span className="font-medium text-gray-900 leading-[18px] tracking-tight">
              Not Bound
            </span>
          </div>

          <div className="flex">
            <span className="w-36 text-gray-500">Effective Date:</span>
            <span className="font-medium text-gray-900 leading-[18px] tracking-tight">
              {new Date(submission.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

      </div>
    </div>

    {/* ISC STYLE – UPLOAD DOCUMENTS */}
    <div className="bg-white px-8 py-6 grid grid-cols-1 lg:grid-cols-3 gap-10 border-b border-gray-200">

      {/* LEFT – UPLOADED DOCUMENTS */}
      <div className="lg:col-span-2">

        <h3 className="text-[15px] font-semibold text-gray-900 mb-4">
          Uploaded Documents
        </h3>

        {/* Upload Box */}
        <label className="border border-dashed border-gray-300 rounded-md p-6 flex items-center justify-between mb-6 cursor-pointer">
          <p className="text-[14px] text-gray-500">
            Drag and drop your files here to start uploading or
          </p>

          <input
            type="file"
            hidden
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
          />

          <span className="ml-4 px-5 py-2 bg-[#2DD4BF] text-white text-[14px] font-medium rounded-md">
            {uploading ? "Uploading..." : "Browse"}
          </span>
        </label>

        {/* TABLE HEADER */}
        <div className="bg-gray-100 px-4 py-2 grid grid-cols-3 text-[13px] font-medium text-gray-600">
          <span>Filename</span>
          <span>Uploaded On</span>
          <span>Action</span>
        </div>

        {/* FILE ROWS */}
        {submission.files.length === 0 ? (
          <div className="px-4 py-6 text-[14px] text-gray-400 border border-t-0 border-gray-200">
            No documents uploaded yet
          </div>
        ) : (
          submission.files.map((file, index) => (
            <div
              key={index}
              className="px-4 py-3 grid grid-cols-3 items-center text-[14px] border border-t-0 border-gray-200"
            >
              <span className="font-medium text-gray-900">
                {file.fileName}
              </span>

              <span className="text-gray-500">
                {new Date(submission.updatedAt).toLocaleDateString()}
              </span>

              <a
                href={file.fileUrl}
                download
                target="_blank"
                className="text-[#0A66C2] font-medium hover:underline"
              >
                Download
              </a>
            </div>
          ))
        )}
      </div>

      {/* RIGHT – REQUIRED DOCUMENTS CHECKLIST */}
      <div>
          <h3 className="text-[14px] font-semibold text-gray-900 mb-5 tracking-tight">
            Required Documents Checklist
          </h3>
          <div className="space-y-6 text-[14px]">
            {[
              "Signed GL Application",
              "Signed Loss Warranty Letter",
              "Invoice Statement",
              "Surplus Line Acknowledgment",
              "Terrorism Acknowledgment",
            ].map((doc) => {
              const checked = checkedDocs[doc];

              return (
                <div
                  key={doc}
                  onClick={() => toggleDoc(doc)}
                  className="flex items-center gap-4 cursor-pointer"
                >
                  {/* CLEAN ISC CIRCLE */}
                  <div
                    className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-all
                      ${
                        checked
                          ? "bg-[#2DD4BF] border-[#2DD4BF]"
                          : "border-gray-300"
                      }`}
                  >
                    {checked && (
                      <svg
                        className="w-3 h-3 text-white"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path d="M5 10l3 3 7-7" />
                      </svg>
                    )}
                  </div>

                  {/* TEXT */}
                  <span className="text-gray-800 leading-tight">
                    {doc}
                  </span>
                </div>
              );
            })}
          </div>
          
      </div>
    </div>
    {/* ================= NOTES – ISC STYLE ================= */}
<div className="bg-white px-8 py-6 border-t border-gray-200">
  {/* Tabs */}
  <div className="flex items-center gap-10 text-[14px] mb-6 border-b">
    {["Notes", "Status History", "Email History", "Rating Information", "Contact Information"].map(
      (tab, i) => (
        <span
          key={tab}
          className={`pb-3 cursor-pointer ${
            i === 0
              ? "border-b-2 border-black text-black font-medium"
              : "text-gray-400"
          }`}
        >
          {tab}
        </span>
      )
    )}
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
    {/* LEFT – ADD NOTE */}
    <div className="lg:col-span-2">
      <h3 className="text-[15px] font-semibold text-gray-900 mb-4">
        Add Note
      </h3>

      {/* Notify Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-[13px] text-gray-500 mr-2">Notify:</span>

        {[
          "Underwriter",
          "Accounting",
          "Endorsements",
          "Additional Insured Endorsements",
          "Cancellations",
          "Audits",
          "Inspections",
        ].map((item) => (
          <button
            key={item}
            onClick={() => toggleNoteFilter(item)}
            className={`px-3 py-1.5 rounded-md text-[13px] border transition ${
              noteFilters.includes(item)
                ? "bg-black text-white border-black"
                : "bg-gray-100 text-gray-700 border-gray-200"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Chat Box */}
      <div className="flex gap-4 items-start">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-[#2DD4BF] text-white flex items-center justify-center font-semibold">
          {session?.user?.name?.[0] || "U"}
        </div>

        {/* Textarea */}
        <div className="flex-1">
          <textarea
            rows={4}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Leave a note..."
            className="w-full border border-gray-300 rounded-md p-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]"
          />

          <div className="mt-3 flex justify-end">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-[#2DD4BF] text-white rounded-md text-[14px] font-medium"
            >
              <span className="text-lg leading-none">＋</span> Note
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* RIGHT – NOTES THREAD */}
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px] font-semibold text-gray-900">
          Notes Thread
        </h3>

        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-[13px] rounded-md bg-black text-white">
            Default
          </button>
          <button className="px-3 py-1.5 text-[13px] rounded-md bg-gray-100 text-gray-700">
            System Only
          </button>
        </div>
      </div>

      {/* Empty State */}
      <div className="border rounded-md p-8 flex flex-col items-center justify-center text-center bg-gray-50">
        <div className="w-20 h-16 bg-gray-300 rounded mb-4" />
        <p className="font-medium text-gray-700 mb-1">
          No notes added yet
        </p>
        <p className="text-[13px] text-gray-500">
          Drop in questions or comments to help us assist you.
        </p>
      </div>
    </div>
  </div>
</div>
{/* ================= END NOTES ================= */}   
        {/* Content */}
        <div className="px-6 py-4 space-y-3">
          {/* Submission Overview */}
          <div className="bg-white rounded-md border border-gray-100 px-4 py-3">
           <h2 className="text-[15px] font-semibold text-gray-900 mb-3">
            Overview
          </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-[13px] text-gray-500 font-medium mb-1">Industry</p>
                <p className="text-[15px] font-semibold text-gray-900">{submission.templateId?.industry || "N/A"}</p>
              </div>
              <div>
                <p className="text-[13px] text-gray-500 font-medium mb-1">Subtype</p>
                <p className="text-[15px] font-semibold text-gray-900">{submission.templateId?.subtype || "N/A"}</p>
              </div>
              <div>
                <p className="text-[13px] text-gray-500 font-medium mb-1">State</p>
                <p className="text-[15px] font-semibold text-gray-900">{submission.state || "N/A"}</p>
              </div>
              <div>
                <p className="text-[13px] text-gray-500 font-medium mb-1">Created</p>
                <p className="text-[15px] font-semibold text-gray-900">{new Date(submission.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Client Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Client Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-[13px] text-gray-500 font-medium mb-1">Name</p>
                <p className="text-[15px] font-semibold text-gray-900">{submission.clientContact.name}</p>
              </div>
              <div>
                <p className="text-[13px] text-gray-500 font-medium mb-1">Email</p>
                <p className="text-[15px] font-semibold text-gray-900">{submission.clientContact.email}</p>
              </div>
              <div>
                <p className="text-[13px] text-gray-500 font-medium mb-1">Phone</p>
                <p className="text-[15px] font-semibold text-gray-900">{submission.clientContact.phone}</p>
              </div>
              {submission.clientContact.EIN && (
                <div>
                  <p className="text-[13px] text-gray-500 font-medium mb-1">EIN</p>
                  <p className="text-[15px] font-semibold text-gray-900">{submission.clientContact.EIN}</p>
                </div>
              )}
              <div className="md:col-span-2">
                <p className="text-[13px] text-gray-500 font-medium mb-1">Business Address</p>
                <p className="text-[15px] font-semibold text-gray-900">
                  {submission.clientContact.businessAddress.street}<br />
                  {submission.clientContact.businessAddress.city}, {submission.clientContact.businessAddress.state} {submission.clientContact.businessAddress.zip}
                </p>
              </div>
            </div>
          </div>

          {/* Admin Notes Section */}
          {submission.adminNotes && (
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-l-4 border-[#00BCD4] rounded-lg p-5">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-[#00BCD4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">Admin Notes</h3>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{submission.adminNotes}</p>
                </div>
              </div>
            </div>
          )}

          {/* Timeline */}
          {timeline.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Timeline</h2>
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                        item.color === "green" ? "bg-green-100" :
                        item.color === "red" ? "bg-red-100" :
                        item.color === "purple" ? "bg-purple-100" :
                        "bg-blue-100"
                      }`}>
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex-1 pb-4 border-b border-gray-100 last:border-0">
                      <p className="text-[15px] font-semibold text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(item.date).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Routing Logs */}
          {routingLogs.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Routing Logs</h2>
              <div className="space-y-3">
                {routingLogs.map((log) => (
                  <div key={log._id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[15px] font-semibold text-gray-900">{log.carrierId?.name || "Unknown Carrier"}</p>
                        <p className="text-xs text-gray-600 mt-1">{log.carrierId?.email}</p>
                        {log.notes && (
                          <p className="text-xs text-gray-500 mt-2">{log.notes}</p>
                        )}
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        log.status === "SENT" ? "bg-green-100 text-green-800 border border-green-200" : "bg-red-100 text-red-800 border border-red-200"
                      }`}>
                        {log.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{new Date(log.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quotes */}
          {quotes.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quotes ({quotes.length})</h2>
              <div className="space-y-3">
                {quotes.map((quote) => (
                  <div key={quote._id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-[15px] font-semibold text-gray-900">{quote.carrierId?.name || "Unknown Carrier"}</p>
                        <p className="text-xs text-gray-600 mt-1">Final Amount: <span className="font-bold text-[#00BCD4]">${quote.finalAmountUSD.toLocaleString()}</span></p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getQuoteStatusBadgeColor(quote.status)}`}>
                          {quote.status}
                        </span>
                        <Link
                          href={`/agency/quotes/${quote._id}`}
                          className="px-3 py-[6px] bg-[#00BCD4] text-white rounded-md text-[12px] font-semibold hover:bg-[#00ACC1] transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-xs">
                      <div>
                        <p className="text-gray-500">Carrier Quote</p>
                        <p className="font-semibold text-gray-900">${quote.carrierQuoteUSD.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Broker Fee</p>
                        <p className="font-semibold text-gray-900">${quote.brokerFeeAmountUSD.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Created</p>
                        <p className="font-semibold text-gray-900">{new Date(quote.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity Log */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Activity Log</h2>
              {loadingActivity && (
                <div className="w-4 h-4 border-2 border-gray-300 border-t-cyan-500 rounded-full animate-spin"></div>
              )}
            </div>
            {activityLogs.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No activity recorded yet</p>
            ) : (
              <div className="space-y-3">
                {activityLogs.map((log) => (
                  <div key={log._id} className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex-shrink-0">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-[16px]">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-semibold text-gray-900">{log.description}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {log.performedBy.userName} ({log.performedBy.userRole}) • {new Date(log.createdAt).toLocaleString()}
                      </p>
                      {log.details && Object.keys(log.details).length > 0 && (
                        <div className="mt-2 text-xs text-gray-500">
                          {Object.entries(log.details).map(([key, value]) => (
                            <span key={key} className="mr-3">
                              <span className="font-medium">{key}:</span> {String(value)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Application Data */}
          {submission.payload && Object.keys(submission.payload).length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Application Data</h2>
                  <p className="text-xs text-gray-500 mt-1">{Object.keys(submission.payload).length} fields</p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(submission.payload, null, 2));
                    toast.success("Application data copied to clipboard!");
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-[#00BCD4] hover:bg-cyan-50 rounded-lg border border-[#00BCD4]/20 hover:border-[#00BCD4]/40 transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy All
                </button>
              </div>
              
              {/* Search Bar */}
              <div className="mb-4">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search fields..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BCD4] focus:border-[#00BCD4] outline-none"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(submission.payload)
                  .filter(([key, value]) => {
                    if (!searchTerm) return true;
                    const search = searchTerm.toLowerCase();
                    const formattedKey = key
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (str) => str.toUpperCase())
                      .trim()
                      .toLowerCase();
                    const valueStr = typeof value === 'object' 
                      ? JSON.stringify(value).toLowerCase()
                      : String(value).toLowerCase();
                    return formattedKey.includes(search) || valueStr.includes(search);
                  })
                  .map(([key, value]) => {
                    // Format the key to be more readable
                    const formattedKey = key
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (str) => str.toUpperCase())
                      .trim();
                    
                    // Format the value based on its type
                    let formattedValue: string;
                    let valueType: 'text' | 'boolean' | 'object' | 'number' | 'email' | 'url' | 'date' = 'text';
                    
                    if (value === null || value === undefined) {
                      formattedValue = 'N/A';
                    } else if (typeof value === 'boolean') {
                      formattedValue = value ? 'Yes' : 'No';
                      valueType = 'boolean';
                    } else if (typeof value === 'number') {
                      formattedValue = value.toLocaleString();
                      valueType = 'number';
                    } else if (typeof value === 'object') {
                      formattedValue = JSON.stringify(value, null, 2);
                      valueType = 'object';
                    } else {
                      formattedValue = String(value);
                      // Detect email
                      if (formattedValue.includes('@') && formattedValue.includes('.')) {
                        valueType = 'email';
                      }
                      // Detect URL
                      if (formattedValue.startsWith('http://') || formattedValue.startsWith('https://')) {
                        valueType = 'url';
                      }
                      // Detect date
                      if (/^\d{4}-\d{2}-\d{2}/.test(formattedValue) || formattedValue.match(/\d{1,2}\/\d{1,2}\/\d{4}/)) {
                        valueType = 'date';
                      }
                    }
                    
                    const handleCopy = () => {
                      const textToCopy = typeof value === 'object' 
                        ? JSON.stringify(value, null, 2)
                        : String(value);
                      navigator.clipboard.writeText(textToCopy);
                      setCopiedField(key);
                      toast.success("Copied to clipboard!");
                      setTimeout(() => setCopiedField(null), 2000);
                    };
                    
                    return (
                      <div 
                        key={key} 
                        className="bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            {valueType === 'email' && (
                              <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            )}
                            {valueType === 'url' && (
                              <svg className="w-4 h-4 text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                              </svg>
                            )}
                            {valueType === 'number' && (
                              <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                              </svg>
                            )}
                            {valueType === 'boolean' && (
                              <svg className={`w-4 h-4 flex-shrink-0 ${value ? 'text-green-500' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"} />
                              </svg>
                            )}
                            {valueType === 'date' && (
                              <svg className="w-4 h-4 text-orange-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            )}
                            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide truncate">{formattedKey}</p>
                          </div>
                          <button
                            onClick={handleCopy}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-gray-200 rounded text-gray-500 hover:text-[#00BCD4] flex-shrink-0"
                            title="Copy value"
                          >
                            {copiedField === key ? (
                              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            )}
                          </button>
                        </div>
                        {typeof value === 'object' && value !== null ? (
                          <div className="bg-gray-900 rounded-lg p-3 border border-gray-700 max-h-48 overflow-auto">
                            <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap break-words">
                              {formattedValue}
                            </pre>
                          </div>
                        ) : valueType === 'url' ? (
                          <a 
                            href={formattedValue} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-[#00BCD4] hover:text-[#00ACC1] break-all underline flex items-center gap-1"
                          >
                            {formattedValue}
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        ) : valueType === 'email' ? (
                          <a 
                            href={`mailto:${formattedValue}`}
                            className="text-sm font-semibold text-blue-600 hover:text-blue-700 break-all"
                          >
                            {formattedValue}
                          </a>
                        ) : (
                          <p className={`text-sm font-semibold break-words ${
                            valueType === 'boolean' 
                              ? (value ? 'text-green-600' : 'text-red-600')
                              : valueType === 'number'
                              ? 'text-green-700'
                              : 'text-gray-900'
                          }`}>
                            {formattedValue}
                          </p>
                        )}
                      </div>
                    );
                  })}
              </div>
              {Object.entries(submission.payload).filter(([key, value]) => {
                if (!searchTerm) return false;
                const search = searchTerm.toLowerCase();
                const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()).trim().toLowerCase();
                const valueStr = typeof value === 'object' ? JSON.stringify(value).toLowerCase() : String(value).toLowerCase();
                return !formattedKey.includes(search) && !valueStr.includes(search);
              }).length === Object.keys(submission.payload).length && searchTerm && (
                <div className="mt-4 text-center text-sm text-gray-500">
                  No fields match your search
                </div>
              )}
            </div>
          )}

          {/* Files */}
          {submission.files && submission.files.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Uploaded Files ({submission.files.length})</h2>
              <div className="space-y-2">
                {submission.files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <p className="text-[15px] font-semibold text-gray-900">{file.fileName}</p>
                      <p className="text-xs text-gray-600">{formatFileSize(file.fileSize)} • {file.mimeType}</p>
                    </div>
                    <a
                      href={file.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-[6px] bg-[#00BCD4] text-white rounded-md text-[12px] font-semibold hover:bg-[#00ACC1] transition-colors"
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Actions</h2>
            <div className="flex gap-3">
              <a
                href={`/api/admin/submissions/${submissionId}/pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}

export default function SubmissionDetailsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SubmissionDetailsContent />
    </Suspense>
  );
}