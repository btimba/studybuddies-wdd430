# StudyBuddies – Copilot Instructions

## Stack
- Next.js App Router, TypeScript (strict), Tailwind CSS
- PostgreSQL on Neon. Connection string in DATABASE_URL (.env.local, never committed)

## Data model
Tables: users, study_groups, group_members, study_sessions, resources.
Shared TypeScript types live in app/lib/definitions.ts.

## Conventions
- Use parameterized SQL only, never string concatenation
- Use Server Components by default; add "use client" only when needed
- Components go in app/ui/, one component per file, PascalCase names
- Hash passwords. Never store them in plain text
- Tailwind only: blue-600 primary, slate neutrals, green-600 success, Inter font

## Workflow
- Branch per issue (feature/<issue-number>-short-name), PR into main, one teammate review before merging
