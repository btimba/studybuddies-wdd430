/**
 * Who is making this request?
 *
 * TEMPORARY: login (#16) does not create a session yet, so for now the caller
 * sends their numeric user id in an "x-user-id" header. This is NOT secure
 * (anyone could claim any id). When sessions exist, change ONLY this
 * function to read the verified session instead.
 */
export function getCurrentUserId(request: Request): number | null {
  const raw = request.headers.get("x-user-id");
  if (!raw || !/^\d+$/.test(raw)) return null;
  return Number(raw);
}
