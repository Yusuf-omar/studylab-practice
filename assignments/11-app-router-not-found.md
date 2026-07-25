# `tt-404-page` — Add an App Router not-found experience

Follow the shared [`docs/git-workflow.md`](../docs/git-workflow.md) and submit the reviewed PR from your fork in Astudylab.

## Objective

Add a clear, accessible not-found path for a dynamic practice detail route without leaking server-only data into client code.

## Starter context

The app has a home backlog but no detail route. Add `app/practice/[id]/page.tsx` backed by a small typed lookup. Unknown IDs must use the framework not-found boundary rather than rendering an empty success page.

## Steps

1. Create `assignment/tt-404-page-short-description` from updated `main`.
2. Add the dynamic page and a `notFound()` branch for unknown practice IDs.
3. Add route-level `loading.tsx` and `error.tsx` states where the route needs asynchronous work.
4. Provide a useful heading, a link back to the backlog, and a stable accessible error message.
5. Keep data lookup and any future mutation on the server boundary; add tests for known and unknown IDs.

## Evidence

Submit the PR URL with screenshots or test output for one valid ID and one unknown ID, plus the route-boundary rationale.

## Acceptance checks

- A valid ID renders its detail page with one clear heading and a route back to the backlog.
- An unknown ID reaches the not-found UI with a useful status and no stack trace or sensitive details.
- Loading/error boundaries are accessible and do not introduce horizontal overflow.
- Server-only work does not cross into a Client Component unnecessarily.

## Verify

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

## Explain in your PR

Why does the unknown-ID branch belong at the route boundary, and what evidence confirms that the error UI is safe to show learners?
