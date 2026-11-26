/**
 * TEMPORARY in-memory membership store (issue #4).
 *
 * Every function is async and returns plain objects on purpose: when the
 * database connection (lib/db.ts) is ready, only the inside of these
 * functions changes. The API routes stay exactly the same.
 *
 * Seed data below mimics the schema: numeric group ids, numeric user ids,
 * one owner per group, and a unique (group, user) membership.
 */

export interface GroupSummary {
  id: number;
  name: string;
  memberCount: number;
  isMember: boolean;
  isOwner: boolean;
}

export type StoreFailure = {
  ok: false;
  code: "GROUP_NOT_FOUND" | "OWNER_CANNOT_LEAVE" | "NOT_A_MEMBER";
  message: string;
  status: number;
};

export type JoinResult =
  | { ok: true; created: boolean; group: GroupSummary }
  | StoreFailure;

export type LeaveResult = { ok: true; group: GroupSummary } | StoreFailure;

interface GroupRecord {
  id: number;
  name: string;
  ownerId: number;
  memberIds: Set<number>;
}

function seed(): Map<number, GroupRecord> {
  const groups: GroupRecord[] = [
    { id: 1, name: "Advanced TypeScript & React", ownerId: 1, memberIds: new Set([1, 3]) },
    { id: 2, name: "Calculus III Study Circle", ownerId: 2, memberIds: new Set([2]) },
    { id: 3, name: "Organic Chemistry Review", ownerId: 3, memberIds: new Set([3]) },
  ];
  return new Map(groups.map((g) => [g.id, g]));
}

// Keep the data across hot reloads in development.
const globalForStore = globalThis as unknown as {
  __membershipGroups?: Map<number, GroupRecord>;
};
const groups = (globalForStore.__membershipGroups ??= seed());

function summarize(group: GroupRecord, userId: number): GroupSummary {
  return {
    id: group.id,
    name: group.name,
    memberCount: group.memberIds.size,
    isMember: group.memberIds.has(userId),
    isOwner: group.ownerId === userId,
  };
}

const notFound: StoreFailure = {
  ok: false,
  code: "GROUP_NOT_FOUND",
  message: "That study group does not exist.",
  status: 404,
};

/** Join a group. Joining twice is harmless (created = false). */
export async function joinGroup(groupId: number, userId: number): Promise<JoinResult> {
  const group = groups.get(groupId);
  if (!group) return notFound;

  const created = !group.memberIds.has(userId);
  group.memberIds.add(userId);
  return { ok: true, created, group: summarize(group, userId) };
}

/** Leave a group. The owner must transfer ownership or delete the group instead. */
export async function leaveGroup(groupId: number, userId: number): Promise<LeaveResult> {
  const group = groups.get(groupId);
  if (!group) return notFound;

  if (group.ownerId === userId) {
    return {
      ok: false,
      code: "OWNER_CANNOT_LEAVE",
      message: "Owners cannot leave their own group. Transfer ownership or delete the group first.",
      status: 400,
    };
  }
  if (!group.memberIds.has(userId)) {
    return {
      ok: false,
      code: "NOT_A_MEMBER",
      message: "You are not a member of this group.",
      status: 400,
    };
  }

  group.memberIds.delete(userId);
  return { ok: true, group: summarize(group, userId) };
}
