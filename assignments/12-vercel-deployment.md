# `tt-deploy-vercel` — Deploy your fork to Vercel

Follow the shared [`docs/git-workflow.md`](../docs/git-workflow.md) and submit the reviewed PR from your fork in Astudylab.

## Objective

Produce a repeatable deployment of your fork and verify the same build that passed locally is healthy in a hosted environment.

## Starter context

The starter app is a Next.js project with a checked-in lockfile and a credential-free build. You may use a Vercel preview or another equivalent host, but do not commit provider tokens or private environment values.

## Steps

1. Create `assignment/tt-deploy-vercel-short-description` from updated `main`.
2. Run the repository checks locally and confirm the lockfile is unchanged by `npm ci`.
3. Import your fork into Vercel, keep the detected Next.js build settings, and configure only public/non-secret values.
4. Open the deployment URL, exercise the backlog filter, and inspect one narrow viewport.
5. Add a deployment smoke-test note to the PR, including the commit SHA and observed URL.

## Evidence

Submit the PR URL, deployment URL, commit SHA, local check output, and a smoke-test record covering the home page, filtering, keyboard focus, and a 320px viewport.

## Acceptance checks

- The deployed commit matches the reviewed PR and passes the same build as local CI.
- No token, secret, private learner data, or `.env.local` value appears in Git or the PR.
- The deployment loads over HTTPS, filtering works, and no horizontal overflow appears at 320px.
- The PR records a rollback path: redeploy the last known-good commit or disable the preview.

## Verify

```bash
npm ci
npm run check
git diff --check
```

## Explain in your PR

What did the deployment smoke test cover, which commit is live, and how would you roll back if the hosted build diverged from local checks?
