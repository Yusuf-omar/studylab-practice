import { PracticeList } from "@/src/components/PracticeList";
import { practiceItems } from "@/src/data/practice-items";
import { parsePracticeItems } from "@/src/lib/practice-item";

export default function HomePage() {
  const externalPayload: unknown = practiceItems;
  const result = parsePracticeItems(externalPayload);

  if (!result.success) {
    return <p>Unable to load practice items.</p>;
  }
  return (
    <main>
      <header className="hero">
        <p className="eyebrow">Astudylab practice workspace</p>
        <h1>Build evidence, one focused change at a time.</h1>
        <p className="lede">
          This starter product grows with your curriculum. Keep the baseline green,
          work on a focused branch, and make each pull request easy to review.
        </p>
      </header>

      <section aria-labelledby="practice-heading" className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Starter feature</p>
            <h2 id="practice-heading">Practice backlog</h2>
          </div>
          <a href="https://github.com/TechArc-io/studylab-practice/tree/main/assignments">
            View assignments
          </a>
        </div>
        <PracticeList initialItems={result.data} />
      </section>
    </main>
  );
}
