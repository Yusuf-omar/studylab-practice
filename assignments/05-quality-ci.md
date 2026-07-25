# `ms-realworld-ci` — Add tests and a green CI pipeline

Follow the shared [`docs/git-workflow.md`](../docs/git-workflow.md) and submit the reviewed PR from your fork in Astudylab.

**Outcome:** design a proportionate safety net and make it reproducible on every pull request.

## Scenario

Choose one behavior added in an earlier assignment whose regression would harm a learner. Improve its tests and the repository’s automated feedback.

## Steps

1. Create `assignment/ms-realworld-ci-short-description` from updated `main`.
2. Write down the failure you want the test to catch.
3. Prove the new test fails for the broken behavior, then restore the implementation.
4. Improve one diagnostic detail in `.github/workflows/ci.yml` without renaming or weakening the required `Practice quality` job. The baseline already runs install, lint, typecheck, catalog validation, tests, and build.
5. Keep passing output concise and make failures point to the affected layer.

## Acceptance checks

- Tests verify user-visible or domain behavior, not private implementation details.
- The test is demonstrated red before green in the PR notes.
- CI uses `npm ci`, the repository Node version, and read-only default permissions.
- All required jobs are green on the submitted PR.

## Verify

```bash
npm ci
npm run check
git diff --check
```

## Explain in your PR

What regression does each test prevent? Why did you choose that test level? What CI failure would be easiest to diagnose now?
