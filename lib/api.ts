
import type {
  DashboardResponse,
  GroupsResponse,
} from "@/lib/types";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    let message = "Something went wrong. Please try again.";

    try {
      const body = await response.json();
      message = body.message || message;
    } catch {
      // Keep the safe default message.
    }

    throw new ApiError(message, response.status);
  }

  return response.json() as Promise<T>;
}

export function getGroups(
  search: string,
  page: number,
  pageSize = 6,
): Promise<GroupsResponse> {
  const params = new URLSearchParams();

  if (search.trim()) {
    params.set("q", search.trim());
  }

  params.set("page", String(page));
  params.set("pageSize", String(pageSize));

  return getJson<GroupsResponse>(
    `/api/groups?${params.toString()}`,
  );
}

export function getDashboard(): Promise<DashboardResponse> {
  return getJson<DashboardResponse>("/api/dashboard");
}
