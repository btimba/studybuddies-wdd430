export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-sm">
            © 2026 StudyBuddies. All rights reserved.
          </p>
          <p className="text-sm">Built collaboratively by the StudyBuddies team.</p>
        </div>
      </div>
    </footer>
  );
}