
import Link from "next/link";
import type { StudyGroup } from "@/lib/types";

interface GroupCardProps {
  group: StudyGroup;
}

export default function GroupCard({ group }: GroupCardProps) {
  return (
    <article className="group-card">
      <div className="group-card-top">
        <span className="group-subject">{group.subject}</span>

        {group.visibility && (
          <span className="group-visibility">
            {group.visibility}
          </span>
        )}
      </div>

      <h2>{group.name}</h2>

      <p className="group-description">
        {group.description || "Join this group to study together."}
      </p>

      <div className="group-card-bottom">
        <span className="member-count">
          {group.memberCount}{" "}
          {group.memberCount === 1 ? "member" : "members"}
        </span>

        <Link
          href={`/study-groups/${encodeURIComponent(group.id)}`}
          className="text-link"
        >
          View group
          <span aria-hidden="true"> →</span>
        </Link>
      </div>
    </article>
  );
}
