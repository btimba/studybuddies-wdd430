
export interface StudyGroup {
  id: string;
  name: string;
  subject: string;
  description?: string;
  visibility?: "public" | "private";
  memberCount: number;
}

export interface StudySession {
  id: string;
  title: string;
  startsAt: string;
  durationMinutes?: number;
  groupId: string;
  groupName: string;
}

export interface GroupsResponse {
  groups: StudyGroup[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface DashboardResponse {
  groups: StudyGroup[];
  upcomingSessions: StudySession[];
}
