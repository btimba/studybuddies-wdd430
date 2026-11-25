import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { StudyGroup } from "@/lib/types";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const result = await sql<StudyGroup[]>`
      SELECT * FROM study_groups WHERE id = ${id}
    `;
    if (result.length === 0) {
      return NextResponse.json({ error: "Study group not found" }, { status: 404 });
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error fetching study group:", error);
    return NextResponse.json({ error: "Failed to fetch study group" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const { name, description, subject } = body;

    const result = await sql<StudyGroup[]>`
      UPDATE study_groups
      SET
        name = COALESCE(${name ?? null}, name),
        description = COALESCE(${description ?? null}, description),
        subject = COALESCE(${subject ?? null}, subject)
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: "Study group not found" }, { status: 404 });
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error updating study group:", error);
    return NextResponse.json({ error: "Failed to update study group" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const result = await sql<StudyGroup[]>`
      DELETE FROM study_groups WHERE id = ${id} RETURNING *
    `;
    if (result.length === 0) {
      return NextResponse.json({ error: "Study group not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Study group deleted successfully" });
  } catch (error) {
    console.error("Error deleting study group:", error);
    return NextResponse.json({ error: "Failed to delete study group" }, { status: 500 });
  }
}
