import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { StudyGroup, NewStudyGroup } from "@/lib/types";

export async function GET() {
  try {
    const groups = await sql<StudyGroup[]>`
      SELECT * FROM study_groups ORDER BY created_at DESC
    `;
    return NextResponse.json(groups);
  } catch (error) {
    console.error("Error fetching study groups:", error);
    return NextResponse.json(
      { error: "Failed to fetch study groups" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: NewStudyGroup = await request.json();
    const { name, description, subject, owner_id } = body;

    if (!name || !subject || !owner_id) {
      return NextResponse.json(
        { error: "name, subject, and owner_id are required" },
        { status: 400 }
      );
    }

    const result = await sql<StudyGroup[]>`
      INSERT INTO study_groups (name, description, subject, owner_id)
      VALUES (${name}, ${description ?? null}, ${subject}, ${owner_id})
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating study group:", error);
    return NextResponse.json(
      { error: "Failed to create study group" },
      { status: 500 }
    );
  }
}
