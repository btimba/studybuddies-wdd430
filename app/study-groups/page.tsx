
"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import GroupCard from "@/components/GroupCard";
import GroupSearch from "@/components/GroupSearch";
import Pagination from "@/components/Pagination";
import { getGroups } from "@/lib/api";
import type { StudyGroup } from "@/lib/types";

function StudyGroupsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("q") || "";

  const requestedPage = Number(
    searchParams.get("page") || "1"
  );

  const page =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  const [retryCount, setRetryCount] = useState(0);
  const [completedRequestKey, setCompletedRequestKey] =
    useState("");

  // Each search, page change, or retry creates a new request key.
  const requestKey = `${search}:${page}:${retryCount}`;

  // Loading is derived instead of being changed inside the effect.
  const loading = completedRequestKey !== requestKey;

  useEffect(() => {
    let cancelled = false;

    async function fetchGroups() {
      try {
        const result = await getGroups(search, page);

        if (!cancelled) {
          setGroups(result.groups);

          setTotalPages(
            Math.max(1, result.pagination.totalPages)
          );

          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load study groups."
          );
        }
      } finally {
        if (!cancelled) {
          setCompletedRequestKey(requestKey);
        }
      }
    }

    void fetchGroups();

    return () => {
      cancelled = true;
    };
  }, [search, page, requestKey]);

  function handleSearch(value: string) {
    const params = new URLSearchParams();

    if (value.trim()) {
      params.set("q", value.trim());
    }

    // Every new search starts at page 1.
    params.set("page", "1");

    router.push(`/study-groups?${params.toString()}`);
  }

  function handleRetry() {
    setError("");
    setRetryCount((count) => count + 1);
  }

  return (
    <main className="page-container">
      <section className="page-heading">
        <div>
          <p className="eyebrow">DISCOVER YOUR COMMUNITY</p>
          <h1>Study groups</h1>
          <p>
            Find students who are learning the same subjects
            and working toward similar goals.
          </p>
        </div>
      </section>

      <GroupSearch
        initialSearch={search}
        onSearch={handleSearch}
      />

      {loading && (
        <p className="status-message" role="status">
          Loading study groups...
        </p>
      )}

      {!loading && error && (
        <div className="error-message" role="alert">
          <p>{error}</p>

          <button
            type="button"
            className="secondary-button"
            onClick={handleRetry}
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && groups.length === 0 && (
        <section className="empty-state">
          <h2>No study groups found</h2>

          <p>
            {search
              ? "Try a different group name or subject."
              : "There are no study groups to display yet. Check back soon."}
          </p>
        </section>
      )}

      {!loading && !error && groups.length > 0 && (
        <>
          <section
            className="group-grid"
            aria-label="Available study groups"
          >
            {groups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
              />
            ))}
          </section>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            search={search}
          />
        </>
      )}
    </main>
  );
}

export default function StudyGroupsPage() {
  return (
    <Suspense
      fallback={
        <main className="page-container">
          <p className="status-message" role="status">
            Loading study groups...
          </p>
        </main>
      }
    >
      <StudyGroupsContent />
    </Suspense>
  );
}

