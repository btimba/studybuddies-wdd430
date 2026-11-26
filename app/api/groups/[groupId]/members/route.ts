import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/membership/current-user";
import { errorResponse, parseGroupId } from "@/lib/membership/http";
import { joinGroup } from "@/lib/membership/store";

/**
 * POST /api/groups/{groupId}/members
 * Join a group as the current user.
 * 201 = newly joined, 200 = already a member (safe to retry).
 */
export async function POST(
  request: Request,
  context: { params: Promise<{ groupId: string }> },
) {
  const userId = getCurrentUserId(request);
  if (userId === null) {
    return errorResponse("NOT_AUTHENTICATED", "You must be signed in to join a group.", 401);
  }

  const { groupId } = await context.params;
  const id = parseGroupId(groupId);
  if (id === null) {
    return errorResponse("INVALID_GROUP_ID", "The group id must be a number.", 400);
  }

  const result = await joinGroup(id, userId);
  if (!result.ok) return errorResponse(result.code, result.message, result.status);

  return NextResponse.json(
    {
      message: result.created ? "Joined group" : "Already a member",
      group: result.group,
    },
    { status: result.created ? 201 : 200 },
  );
}
