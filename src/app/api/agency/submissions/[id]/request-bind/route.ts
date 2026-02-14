import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/mongodb";
import Submission from "@/models/Submission";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const submission = await Submission.findById(params.id);

    if (!submission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    // Update bind request fields
    submission.bindRequested = true;
    submission.bindRequestedAt = new Date();
    submission.status = "BIND_REQUESTED";

    await submission.save();

    return NextResponse.json({
      success: true,
      message: "Bind request submitted successfully",
    });
  } catch (error: any) {
    console.error("Request bind error:", error);
    return NextResponse.json(
      { error: "Failed to request bind" },
      { status: 500 }
    );
  }
}