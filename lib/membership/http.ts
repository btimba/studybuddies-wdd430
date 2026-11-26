import { NextResponse } from "next/server";

/** One error shape for every membership response: { error: { code, message } } */
export function errorResponse(code: string, message: string, status: number) {
  return NextResponse.json({ error: { code, message } }, { status });
}

/** Turn the [groupId] URL segment into a number, or null if it is not one. */
export function parseGroupId(value: string): number | null {
  return /^\d+$/.test(value) ? Number(value) : null;
}
