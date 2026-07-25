# `ms-next-route` — Ship an App Router route with a Server Action

Follow the shared [`docs/git-workflow.md`](../docs/git-workflow.md) and submit the reviewed PR from your fork in Astudylab.

**Outcome:** use the correct server/client boundaries for a dynamic route and validated mutation.

## Scenario

Learners need a detail page for each practice item and a form to update its reflection.

## Steps

1. Create `assignment/ms-next-route-short-description` from updated `main`.
2. Add `app/practice/[id]/page.tsx` as a Server Component.
3. Add route-level `loading.tsx`, `error.tsx`, and not-found behavior.
4. Create a Server Action that treats form values as unknown, validates them, and returns a typed result.
5. Revalidate the affected route only after a successful mutation.
6. Keep the client boundary limited to the interactive form state.

## Acceptance checks

- The dynamic route renders valid IDs on the server and rejects unknown IDs.
- Loading and error states are useful and accessible.
- Invalid input cannot reach the write boundary.
- The successful mutation revalidates the correct path.
- Secrets, authorization, and writes stay out of Client Components.

## Verify

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

## Explain in your PR

Why is each component server or client? What validation and authorization would be required before replacing the starter store with a database?
