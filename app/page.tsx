
import Link from "next/link";

export default function Home() {
  return (
    <main className="page-container">
      <section className="page-heading">
        <div>
          <p className="eyebrow">WELCOME TO STUDYBUDDIES</p>
          <h1>Better learning starts together.</h1>
          <p>
            Find study partners, join learning communities,
            and keep your study sessions organized.
          </p>
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2">
        <article className="group-card">
          <h2>Discover study groups</h2>
          <p className="group-description">
            Explore study groups, search by subject, and find
            students with similar learning goals.
          </p>
          <Link href="/study-groups" className="primary-link">
            Browse study groups
          </Link>
        </article>

        <article className="group-card">
          <h2>Your personal dashboard</h2>
          <p className="group-description">
            View the groups you have joined and your upcoming
            study sessions.
          </p>
          <Link href="/dashboard" className="primary-link">
            Open dashboard
          </Link>
        </article>
      </section>
    </main>
  );
}

