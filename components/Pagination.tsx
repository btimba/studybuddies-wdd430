
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  search: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  search,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  function pageUrl(page: number) {
    const params = new URLSearchParams();

    if (search) {
      params.set("q", search);
    }

    params.set("page", String(page));

    return `/study-groups?${params.toString()}`;
  }

  return (
    <nav
      className="pagination"
      aria-label="Study group pages"
    >
      {currentPage > 1 ? (
        <Link
          href={pageUrl(currentPage - 1)}
          className="pagination-link"
        >
          ← Previous
        </Link>
      ) : (
        <span className="pagination-disabled">
          ← Previous
        </span>
      )}

      <span className="pagination-status">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={pageUrl(currentPage + 1)}
          className="pagination-link"
        >
          Next →
        </Link>
      ) : (
        <span className="pagination-disabled">
          Next →
        </span>
      )}
    </nav>
  );
}
