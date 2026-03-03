import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import connectDB from "@/lib/mongodb";
import Submission from "@/models/Submission";

const s3Client = new S3Client({
  region: process.env.B2_REGION || "us-west-004",
  endpoint: process.env.B2_ENDPOINT || "https://s3.us-west-004.backblazeb2.com",
  credentials: {
    accessKeyId: process.env.B2_KEY_ID || "",
    secretAccessKey: process.env.B2_APPLICATION_KEY || "",
  },
});

export async function GET(req: NextRequest) {
  try {
    // 1. Authenticate user session
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse File URL Request
    const { searchParams } = new URL(req.url);
    const fileUrl = searchParams.get("url");

    if (!fileUrl) {
      return NextResponse.json({ error: "No file URL provided" }, { status: 400 });
    }

    // 3. Security Check - Verify this file exists in a submission the user has access to
    await connectDB();
    const userRole = (session.user as any).role;
    
    let submissionQuery: any = { "files.fileUrl": fileUrl };
    
    // Agencies can only download from their own submissions
    if (userRole === "agency_admin" || userRole === "agency_user") {
        submissionQuery.agencyId = (session.user as any).agencyId;
    } else if (userRole !== "system_admin") {
         return NextResponse.json({ error: "Forbidden access." }, { status: 403 });
    }

    const submission = await Submission.findOne(submissionQuery).lean();
    if (!submission) {
        return NextResponse.json({ error: "File not found or unauthorized access" }, { status: 404 });
    }

    // 4. Find original File Name from database metadata
    const fileMeta = submission.files.find((f: any) => f.fileUrl === fileUrl);
    const downloadFilename = fileMeta?.fileName || "downloaded-file";
    const contentType = fileMeta?.mimeType || "application/octet-stream";

    // 5. Connect to Backblaze B2 to Download File
    const bucketName = process.env.B2_BUCKET_NAME || "sterling-uploads";
    
    // Parse key out of the B2 URL (remove domain and bucket name)
    const urlObj = new URL(fileUrl);
    const keyPrefix = `/${bucketName}/`;
    let key = urlObj.pathname;
    
    if (key.startsWith(keyPrefix)) {
        key = key.substring(keyPrefix.length);
    } else if (key.startsWith("/")) {
        key = key.substring(1);
    }

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const s3Response = await s3Client.send(command);

    // 6. Return Data Stream cleanly mapped to Attachment headers
    // Convert Web Stream to standard Response
    if (!s3Response.Body) {
        throw new Error("Empty body returned from S3");
    }

    const headers = new Headers();
    headers.set("Content-Disposition", `attachment; filename="${downloadFilename}"`);
    headers.set("Content-Type", contentType);
    if (s3Response.ContentLength) {
        headers.set("Content-Length", s3Response.ContentLength.toString());
    }

    // We can cast the Node.js Readable stream into a valid Web stream using Next.js utilities
    // As of Next.js 14, standard responses handle ReadableStream directly or iterables!
    return new NextResponse(s3Response.Body as any, {
      status: 200,
      headers,
    });

  } catch (error: any) {
    console.error("Secure File Download Error:", error);
    return NextResponse.json(
      { error: "Failed to securely download file" },
      { status: 500 }
    );
  }
}
