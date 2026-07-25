# `ms-ai-workflow` — Deliver a defensible AI-assisted change

Follow the shared [`docs/git-workflow.md`](../docs/git-workflow.md) and submit the reviewed PR from your fork in Astudylab.

**Outcome:** use AI as assistance while preserving privacy, judgment, and evidence.

## Scenario

Add a small “clear filters” interaction to the practice backlog. You may ask an AI assistant for options, tests, or review—but you must decide and verify the final solution.

## Steps

1. Create `assignment/ms-ai-workflow-short-description` from updated `main`.
2. Write a short acceptance contract before prompting.
3. Use only public repository context; never paste secrets, private learner data, or organization data.
4. Record a compact decision log in the PR: suggestions accepted, changed, and rejected, with reasons.
5. Review every generated line and verify the behavior yourself.

## Acceptance checks

- Clear filters is keyboard-operable and appears only when useful.
- Tests cover its user-visible behavior.
- No secret, private data, fabricated test result, or unreviewed generated code appears.
- The PR decision log demonstrates understanding rather than copying a transcript.

## Verify

```bash
npm ci
npm run check
git diff --check
```

## Explain in your PR

What did the assistant get right? What did you change or reject? Which evidence makes you confident the final result is correct?
