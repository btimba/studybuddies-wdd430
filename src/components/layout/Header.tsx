import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="flex w-fit items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          aria-label="StudyBuddies home"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
            SB
          </span>
          <span className="text-xl font-bold text-slate-900">
            StudyBuddies
          </span>
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium">
            <li>
              <Link
                href="/"
                className="rounded-md text-slate-700 transition hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/groups"
                className="rounded-md text-slate-700 transition hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                Study Groups
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="block rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
