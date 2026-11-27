import { NextResponse } from "next/server";
import { getGroups } from "@/lib/groups";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get("subject") ?? "";
    const q = searchParams.get("q") ?? "";
    const groups = await getGroups(subject, q);
    return NextResponse.json({ groups });
  } catch {
    return NextResponse.json(
      { error: "SERVER_ERROR", message: "Could not load groups." },
      { status: 500 }
    );
  }
}
