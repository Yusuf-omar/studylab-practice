# `ms-react-ui` — Build an accessible filterable list

Follow the shared [`docs/git-workflow.md`](../docs/git-workflow.md) and submit the reviewed PR from your fork in Astudylab.

**Outcome:** implement controlled state, derived results, and complete async UI states without breaking keyboard or screen-reader access.

## Scenario

The practice backlog needs status filtering and a refresh action that behaves like a real request.

## Steps

1. Create `assignment/ms-react-ui-short-description` from updated `main`.
2. Extend `PracticeList` with a controlled status filter.
3. Add a small asynchronous data helper and model loading, empty, error, and success states explicitly.
4. Keep filtering derived from source data; do not synchronize duplicated filtered data with an effect.
5. Preserve focus after refresh and announce meaningful state changes.
6. Add component tests for each state and keyboard operation.

## Acceptance checks

- Search and status filters are controlled and compose correctly.
- Loading, empty, error, and success are visually and programmatically distinct.
- Every control has an accessible name and visible keyboard focus.
- Tests assert behavior through roles and names rather than implementation details.

## Verify

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

## Explain in your PR

Which state is source state and which is derived? How did you verify keyboard and assistive-technology behavior?
