# `ms-git-collab` — Collaborate through a reviewed pull request

**Outcome:** demonstrate a safe fork, branch, commit, synchronization, and review workflow.

## Scenario

The practice workspace needs one small documentation improvement. Choose a confusing sentence in `README.md`, `docs/setup.md`, or `foundations/README.md` and make it clearer without changing its meaning.

## Steps

1. Synchronize your fork using `docs/git-workflow.md`.
2. Create `assignment/ms-git-collab-short-description` from updated `main`.
3. Make one focused documentation improvement.
4. Ask another learner or your mentor to change the same sentence on a temporary local branch, or create that conflicting edit yourself. Merge it into your assignment branch and resolve the conflict deliberately.
5. Run the verification commands and open a pull request into `main` in your fork, following [`docs/git-workflow.md`](../docs/git-workflow.md).
6. Respond to at least one review comment with a follow-up commit.

## Acceptance checks

- Work is on the assignment branch, never directly on `main`.
- The final file contains no conflict markers and preserves both intended ideas.
- Commits make the conflict resolution and review response understandable.
- The PR explains the change, conflict, and verification.

## Verify

```bash
git status
git log --oneline -5
git diff --check main...HEAD
npm ci
npm run build
```

## Explain in your PR

What caused the conflict? How did you decide which content to keep? What would make the same conflict less likely on a real team?
