
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getDashboard } from "@/lib/api";
import type {
  DashboardResponse,
  StudySession,
} from "@/lib/types";

function formatSessionDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

function SessionCard({ session }: { session: StudySession }) {
  return (
    <article className="session-card">
      <div>
        <h3>{session.title}</h3>
        <p>{session.groupName}</p>
        <p className="session-date">
          {formatSessionDate(session.startsAt)}
        </p>

        {session.durationMinutes && (
          <p>{session.durationMinutes} minutes</p>
        )}
      </div>

      <Link
        href={`/study-groups/${encodeURIComponent(session.groupId)}`}
        className="text-link"
      >
        View group →
      </Link>
    </article>
  );
}

export default function DashboardPage() {
  const [dashboard, setDashboard] =
    useState<DashboardResponse | null>(null);

  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [completedRequest, setCompletedRequest] = useState(-1);

  // Loading is derived from the request state.
  const loading = completedRequest !== retryCount;

  useEffect(() => {
    let cancelled = false;

    async function fetchDashboard() {
      try {
        const result = await getDashboard();

        if (!cancelled) {
          setDashboard(result);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load your dashboard."
          );
        }
      } finally {
        if (!cancelled) {
          setCompletedRequest(retryCount);
        }
      }
    }

    void fetchDashboard();

    return () => {
      cancelled = true;
    };
  }, [retryCount]);

  if (loading) {
    return (
      <main className="page-container">
        <p className="status-message" role="status">
          Loading your dashboard...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-container">
        <div className="error-message" role="alert">
          <h1>We couldn&apos;t load your dashboard</h1>
          <p>{error}</p>

          <button
            type="button"
            className="primary-button"
            onClick={() => setRetryCount((count) => count + 1)}
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  if (!dashboard) {
    return (
      <main className="page-container">
        <div className="empty-state">
          <h2>Dashboard unavailable</h2>
          <p>There is no dashboard data to display.</p>

          <button
            type="button"
            className="primary-button"
            onClick={() => setRetryCount((count) => count + 1)}
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container">
      <section className="page-heading">
        <div>
          <p className="eyebrow">YOUR STUDY SPACE</p>
          <h1>Personal dashboard</h1>
          <p>
            Keep track of your study groups and upcoming sessions.
          </p>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h2>My study groups</h2>
            <p>Groups you have joined.</p>
          </div>

          <span className="count-badge">
            {dashboard.groups.length}
          </span>
        </div>

        {dashboard.groups.length === 0 ? (
          <div className="empty-state">
            <h3>You haven&apos;t joined a study group yet</h3>
            <p>
              Browse available groups and find one that matches
              your learning goals.
            </p>

            <Link
              href="/study-groups"
              className="primary-link"
            >
              Explore study groups
            </Link>
          </div>
        ) : (
          <div className="group-grid">
            {dashboard.groups.map((group) => (
              <article className="group-card" key={group.id}>
                <div className="group-card-top">
                  <span className="group-subject">
                    {group.subject}
                  </span>
                </div>

                <h3>{group.name}</h3>

                <p className="group-description">
                  {group.description ||
                    "Continue learning with your group."}
                </p>

                <div className="group-card-bottom">
                  <span className="member-count">
                    {group.memberCount} members
                  </span>

                  <Link
                    href={`/study-groups/${encodeURIComponent(group.id)}`}
                    className="text-link"
                  >
                    Open group →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h2>Upcoming study sessions</h2>
            <p>See what&apos;s coming up next.</p>
          </div>

          <span className="count-badge">
            {dashboard.upcomingSessions.length}
          </span>
        </div>

        {dashboard.upcomingSessions.length === 0 ? (
          <div className="empty-state">
            <h3>No upcoming sessions</h3>
            <p>
              Your upcoming group sessions will appear here.
            </p>
          </div>
        ) : (
          <div className="session-list">
            {dashboard.upcomingSessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

