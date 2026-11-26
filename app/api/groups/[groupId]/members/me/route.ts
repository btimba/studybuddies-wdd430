import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/membership/current-user";
import { errorResponse, parseGroupId } from "@/lib/membership/http";
import { leaveGroup } from "@/lib/membership/store";

/**
 * DELETE /api/groups/{groupId}/members/me
 * Leave a group as the current user. Owners must transfer or delete instead.
 */
export async function DELETE(
  request: Request,
  context: { params: Promise<{ groupId: string }> },
) {
  const userId = getCurrentUserId(request);
  if (userId === null) {
    return errorResponse("NOT_AUTHENTICATED", "You must be signed in to leave a group.", 401);
  }

  const { groupId } = await context.params;
  const id = parseGroupId(groupId);
  if (id === null) {
    return errorResponse("INVALID_GROUP_ID", "The group id must be a number.", 400);
  }

  const result = await leaveGroup(id, userId);
  if (!result.ok) return errorResponse(result.code, result.message, result.status);

  return NextResponse.json({ message: "Left group", group: result.group });
}
