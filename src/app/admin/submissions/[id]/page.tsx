"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";

interface SubmissionDetails {
  submission: any;
  routingLogs: any[];
  quotes: any[];
}

// Component to display application form data
function ApplicationDataViewer({ data }: { data: any }) {
  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return "N/A";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (typeof value === "object") {
      if (Array.isArray(value)) return value.join(", ");
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  };

  const formatFieldName = (key: string): string => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  const isImportantField = (key: string): boolean => {
    const importantFields = [
      "companyName",
      "estimatedGrossReceipts",
      "generalLiabilityLimit",
      "classCodeWork",
      "effectiveDate",
      "statesOfOperation",
      "carrierApprovedDescription",
    ];
    return importantFields.includes(key);
  };

  // Separate important and other fields
  const importantFields: [string, any][] = [];
  const otherFields: [string, any][] = [];

  Object.entries(data).forEach(([key, value]) => {
    if (isImportantField(key)) {
      importantFields.push([key, value]);
    } else {
      otherFields.push([key, value]);
    }
  });

  return (
    <div className="space-y-6">
      {/* Important Fields Section */}
      {importantFields.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            Key Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {importantFields.map(([key, value]) => (
              <div key={key} className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-amber-200/60 hover:border-amber-300 hover:shadow-md transition-all duration-200">
                <span className="text-xs font-bold text-gray-500 block mb-1.5 uppercase tracking-wide">
                  {formatFieldName(key)}
                </span>
                <p className="text-sm text-gray-900 font-semibold break-words">
                  {key === "classCodeWork" && typeof value === "object" ? (
                    <div className="space-y-1">
                      {Object.entries(value as Record<string, any>).map(([code, percent]) => (
                        <div key={code} className="text-sm">
                          <span className="font-bold">{code}:</span> {percent}%
                        </div>
                      ))}
                    </div>
                  ) : (
                    formatValue(value)
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other Fields Section */}
      {otherFields.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            Additional Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            {otherFields.map(([key, value]) => (
              <div key={key} className="bg-white/60 backdrop-blur-sm p-3 rounded-lg border border-gray-200/60 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
                <span className="text-xs font-bold text-gray-500 block mb-1 uppercase tracking-wide">
                  {formatFieldName(key)}
                </span>
                <p className="text-sm text-gray-900 font-medium break-words">
                  {formatValue(value)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminSubmissionDetailsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const submissionId = params?.id as string;

  const [data, setData] = useState<SubmissionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [editingNotes, setEditingNotes] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    } else if (status === "authenticated") {
      const userRole = (session?.user as any)?.role;
      // Only system_admin can access admin pages
      if (userRole !== "system_admin") {
        router.push("/agency/dashboard");
      }
    }
  }, [status, session, router]);

  useEffect(() => {
    if (status === "authenticated" && submissionId) {
      fetchData();
    }
  }, [status, submissionId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/submissions/${submissionId}`);
      const data = await response.json();
      if (data.submission) {
        setData(data);
        setAdminNotes(data.submission.adminNotes || "");
      } else if (data.error) {
        setError(data.error);
      }
    } catch (err: any) {
      console.error("Error fetching submission:", err);
      setError("Failed to load submission");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "SUBMITTED":
        return "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border border-blue-200";
      case "ROUTED":
        return "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border border-yellow-200";
      case "QUOTED":
        return "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200";
      case "BIND_REQUESTED":
        return "bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border border-orange-200";
      case "BOUND":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200";
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-200";
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="text-center">
          <div className="relative w-12 h-12 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-sm text-gray-600 font-medium">Loading submission details...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/60 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link href="/admin/dashboard" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300">
                  <span className="text-white font-bold text-lg">SP</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Sterling Portal
                </span>
              </Link>
            </div>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-200/60 p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
              <p className="text-red-600 mb-6">{error || "Submission not found"}</p>
              <Link 
                href="/admin/submissions" 
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Submissions
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const { submission, routingLogs, quotes } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/60 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/admin/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300">
                <span className="text-white font-bold text-lg">SP</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Sterling Portal
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 font-medium">
                {session?.user?.name || session?.user?.email}
              </span>
              <button
                onClick={() => window.location.href = '/api/auth/signout'}
                className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/admin/submissions"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Submissions
          </Link>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-200/60 hover:shadow-xl hover:border-blue-200 transition-all duration-300 p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Submission Details
            </h1>
            <span
              className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold shadow-sm ${getStatusBadgeColor(
                submission.status
              )}`}
            >
              {submission.status.replace("_", " ")}
            </span>
          </div>

          {/* Program Info */}
          {(submission.programName || submission.templateId) && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                Program Information
              </h2>
              <div className="grid grid-cols-2 gap-4 p-4 bg-gradient-to-br from-purple-50 to-indigo-50/50 rounded-xl border border-purple-200/60">
                {submission.programName && (
                  <>
                    <div>
                      <span className="text-xs text-gray-500 font-medium mb-1 block">Program Name</span>
                      <p className="text-sm text-gray-900 font-bold">{submission.programName}</p>
                    </div>
                    {submission.programId && (
                      <div>
                        <span className="text-xs text-gray-500 font-medium mb-1 block">Program ID</span>
                        <p className="text-sm text-gray-900 font-bold">{submission.programId}</p>
                      </div>
                    )}
                  </>
                )}
                {submission.templateId && (
                  <>
                    <div>
                      <span className="text-xs text-gray-500 font-medium mb-1 block">Industry</span>
                      <p className="text-sm text-gray-900 font-bold">{submission.templateId.industry}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 font-medium mb-1 block">Subtype</span>
                      <p className="text-sm text-gray-900 font-bold">{submission.templateId.subtype}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Client Info */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              Client Information
            </h2>
            <div className="grid grid-cols-2 gap-4 p-4 bg-gradient-to-br from-blue-50 to-cyan-50/50 rounded-xl border border-blue-200/60">
              <div>
                <span className="text-xs text-gray-500 font-medium mb-1 block">Name</span>
                <p className="text-sm text-gray-900 font-bold">
                  {submission.clientContact?.name || "N/A"}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-500 font-medium mb-1 block">Email</span>
                <p className="text-sm text-gray-900 font-bold">
                  {submission.clientContact?.email || "N/A"}
                </p>
              </div>
              {submission.clientContact?.phone && (
                <div>
                  <span className="text-xs text-gray-500 font-medium mb-1 block">Phone</span>
                  <p className="text-sm text-gray-900 font-bold">
                    {submission.clientContact.phone}
                  </p>
                </div>
              )}
              {submission.clientContact?.EIN && (
                <div>
                  <span className="text-xs text-gray-500 font-medium mb-1 block">EIN</span>
                  <p className="text-sm text-gray-900 font-bold">
                    {submission.clientContact.EIN}
                  </p>
                </div>
              )}
              {submission.clientContact?.businessAddress && (
                <div className="col-span-2">
                  <span className="text-xs text-gray-500 font-medium mb-1 block">Business Address</span>
                  <p className="text-sm text-gray-900 font-bold">
                    {submission.clientContact.businessAddress.street}, {submission.clientContact.businessAddress.city}, {submission.clientContact.businessAddress.state} {submission.clientContact.businessAddress.zip}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Admin Notes Section */}
          <div className="mb-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-200/60 hover:shadow-xl hover:border-rose-200 transition-all duration-300 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-rose-100 to-pink-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                Admin Notes
              </h2>
              {!editingNotes && (
                <button
                  onClick={() => setEditingNotes(true)}
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 rounded-xl shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-all duration-300 inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {adminNotes ? "Edit Notes" : "Add Notes"}
                </button>
              )}
            </div>

            {editingNotes ? (
              <div className="space-y-4">
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add notes for the agency (visible to agency users)..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                  rows={6}
                />
                <div className="flex gap-3">
                  <button
                    onClick={async () => {
                      setSavingNotes(true);
                      try {
                        const response = await fetch(`/api/admin/submissions/${submissionId}/notes`, {
                          method: "PATCH",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ adminNotes }),
                        });

                        if (response.ok) {
                          toast.success("Admin notes saved successfully");
                          setEditingNotes(false);
                          // Refresh data
                          await fetchData();
                        } else {
                          const errorData = await response.json();
                          throw new Error(errorData.error || "Failed to save notes");
                        }
                      } catch (err: any) {
                        toast.error(err.message || "Failed to save notes");
                      } finally {
                        setSavingNotes(false);
                      }
                    }}
                    disabled={savingNotes}
                    className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 rounded-xl shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-all duration-300 inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {savingNotes ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Save Notes
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setEditingNotes(false);
                      // Reset to original value
                      setAdminNotes(data?.submission?.adminNotes || "");
                    }}
                    disabled={savingNotes}
                    className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-rose-50/50 to-pink-50/30 rounded-xl p-4 border border-rose-200/60">
                {adminNotes ? (
                  <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{adminNotes}</p>
                ) : (
                  <p className="text-sm text-gray-500 italic">No admin notes added yet. Click "Add Notes" to add notes for the agency.</p>
                )}
              </div>
            )}
          </div>

          {/* Application Form Data */}
          {submission.payload && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                Application Details
              </h2>
              <div className="bg-gradient-to-br from-teal-50/50 to-emerald-50/30 rounded-xl p-6 border border-teal-200/60">
                <ApplicationDataViewer data={submission.payload} />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mb-6 flex gap-3">
            <a
              href={`/api/admin/submissions/${submissionId}/pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-sm font-semibold text-gray-700 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 inline-flex items-center gap-2 group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Download PDF
            </a>
            {submission.status === "SUBMITTED" && (
              <Link
                href={`/admin/submissions/${submissionId}/quote`}
                className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 inline-flex items-center gap-2 group"
              >
                Enter Quote
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            )}
          </div>

          {/* Post Quote Action for ENTERED_BY_ADMIN quotes */}
          {quotes && quotes.length > 0 && quotes.some((q: any) => q.status === "ENTERED_BY_ADMIN") && (
            <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200/60">
              <p className="text-sm text-gray-700 font-semibold mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Quotes ready to post:
              </p>
              <div className="flex flex-wrap gap-2">
                {quotes
                  .filter((q: any) => q.status === "ENTERED_BY_ADMIN")
                  .map((quote: any) => (
                    <Link
                      key={quote._id}
                      href={`/admin/quotes/${quote._id}/post`}
                      className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300 inline-flex items-center gap-2 group"
                    >
                      Post Quote {quote.carrierId?.name || ""}
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Routing Logs */}
        {routingLogs && routingLogs.length > 0 && (
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-200/60 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              Routing Logs
            </h2>
            <div className="space-y-3">
              {routingLogs.map((log: any) => (
                <div
                  key={log._id}
                  className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50/50 rounded-xl border border-indigo-200/60 hover:border-indigo-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-gray-900">
                        {log.carrierId?.name || "Unknown Carrier"}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{log.carrierId?.email}</p>
                      {log.notes && (
                        <p className="text-xs text-gray-500 mt-2 bg-white/50 rounded-lg px-3 py-2 border border-gray-200/60">
                          {log.notes}
                        </p>
                      )}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-bold shadow-sm ${
                        log.status === "SENT"
                          ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200"
                          : "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border border-red-200"
                      }`}
                    >
                      {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quotes */}
        {quotes && quotes.length > 0 && (
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-200/60 hover:shadow-xl hover:border-rose-200 transition-all duration-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-rose-100 to-pink-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              Quotes
            </h2>
            <div className="space-y-3">
              {quotes.map((quote: any) => (
                <div
                  key={quote._id}
                  className="p-5 bg-gradient-to-br from-rose-50 to-pink-50/50 rounded-xl border border-rose-200/60 hover:border-rose-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-bold text-gray-900 text-lg">
                        {quote.carrierId?.name || "Unknown Carrier"}
                      </p>
                      <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                        <span className="font-medium">Final Amount:</span>
                        <span className="text-lg font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                          ${quote.finalAmountUSD.toFixed(2)}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm ${
                          quote.status === "APPROVED"
                            ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200"
                            : "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border border-blue-200"
                        }`}
                      >
                        {quote.status}
                      </span>
                      {quote.binderPdfUrl && (
                        <a
                          href={quote.binderPdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white text-xs font-semibold rounded-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 inline-flex items-center gap-2 group"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download Binder
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

