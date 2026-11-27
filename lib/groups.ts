import sql from "./db";
import type { StudyGroupWithOwner } from "./types";

export async function getGroups(
  subject: string = "",
  q: string = ""
): Promise<StudyGroupWithOwner[]> {
  const search = `%${q}%`;
  const rows = await sql`
    SELECT g.*, u.name AS owner_name
    FROM study_groups g
    JOIN users u ON u.id = g.owner_id
    WHERE (${subject} = '' OR g.subject = ${subject})
      AND (${q} = '' OR g.name ILIKE ${search} OR g.description ILIKE ${search})
    ORDER BY g.created_at DESC
  `;
  return rows as StudyGroupWithOwner[];
}

export async function getSubjects(): Promise<string[]> {
  const rows = await sql`SELECT DISTINCT subject FROM study_groups ORDER BY subject`;
  return rows.map((r) => r.subject as string);
}
