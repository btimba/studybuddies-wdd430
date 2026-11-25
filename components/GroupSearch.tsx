
"use client";

import { FormEvent, useState } from "react";

interface GroupSearchProps {
  initialSearch: string;
  onSearch: (value: string) => void;
}

export default function GroupSearch({
  initialSearch,
  onSearch,
}: GroupSearchProps) {
  const [search, setSearch] = useState(initialSearch);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(search.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <label htmlFor="group-search" className="sr-only">
        Search study groups
      </label>

      <input
        id="group-search"
        type="search"
        placeholder="Search by group name or subject..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <button type="submit" className="primary-button">
        Search
      </button>

      {search && (
        <button
          type="button"
          className="secondary-button"
          onClick={() => {
            setSearch("");
            onSearch("");
          }}
        >
          Clear
        </button>
      )}
    </form>
  );
}
