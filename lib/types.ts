export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar_url: string | null;
  created_at: string;
};

export type StudyGroup = {
  id: number;
  name: string;
  description: string | null;
  subject: string;
  owner_id: number;
  created_at: string;
};

export type GroupMember = {
  id: number;
  group_id: number;
  user_id: number;
  joined_at: string;
};

export type StudySession = {
  id: number;
  group_id: number;
  title: string;
  description: string | null;
  scheduled_at: string;
  location: string | null;
  created_at: string;
};

export type Resource = {
  id: number;
  group_id: number;
  uploaded_by: number;
  title: string;
  url: string;
  created_at: string;
};

export type NewUser = Omit<User, "id" | "created_at">;
export type NewStudyGroup = Omit<StudyGroup, "id" | "created_at">;
export type NewStudySession = Omit<StudySession, "id" | "created_at">;
export type NewResource = Omit<Resource, "id" | "created_at">;

export type StudyGroupWithOwner = StudyGroup & { owner_name: string };
export type StudySessionWithGroup = StudySession & { group_name: string };