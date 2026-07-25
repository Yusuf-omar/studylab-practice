# `tt-fix-broken-fetch` — Add resilient data states to `PracticeList`

Follow the shared [`docs/git-workflow.md`](../docs/git-workflow.md) and submit the reviewed PR from your fork in Astudylab.

## Objective

Model a real asynchronous request in the practice backlog with explicit loading, empty, error, and success states while keeping filtering derived from source data.

## Starter context

`src/components/PracticeList.tsx` currently renders a synchronous `initialItems` prop. Introduce a small data helper or request seam that can be tested deterministically; do not add a production API or hide failures behind an empty list.

## Steps

1. Create `assignment/tt-fix-broken-fetch-short-description` from updated `main`.
2. Define the request result and error boundary before changing the component.
3. Render distinct loading, empty, error, and success states with useful status text.
4. Keep search/status filtering derived with `useMemo` or equivalent; do not synchronize duplicate filtered state in an effect.
5. Add tests that control the request outcome and exercise retry, filtering, and keyboard-accessible controls.

## Evidence

Submit the PR with the request contract, tests for all four states, and a brief note showing that a failed request cannot be mistaken for an empty result.

## Acceptance checks

- Loading, empty, error, and success are distinct in the DOM and understandable without color.
- Retry requests fresh data and preserves an accessible focus path.
- Filtering uses the latest successful source data and never renders stale results after an error.
- Tests assert roles, names, and user-visible behavior rather than implementation details.

## Verify

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

## Explain in your PR

What is the source of truth for items, how is the failed state represented, and how did you prove retry does not duplicate requests?
