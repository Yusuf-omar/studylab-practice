# Assignments

Open the assignment whose ID matches the task in Astudylab. Do not work ahead merely to collect pull requests: each task assumes its prerequisite lessons and checks are complete.

## Your progress in your fork

Use this table as your personal progress tracker **in your own fork**. After a pull request has been approved and merged into your fork's `main`, replace that assignment's `- [ ]` with `- [x]`. Do not mark items complete in the canonical `TechArc-io` repository.

| Status | ID | Assignment | Evidence |
| --- | --- | --- | --- |
| - [ ] | `tt-fork-first-pr` | [Make your first focused pull request](08-first-fork-pr.md) | PR, Git history, build output |
| - [ ] | `tt-responsive-navbar` | [Build a responsive navigation bar](09-responsive-navbar.md) | PR, responsive and keyboard evidence |
| - [ ] | `tt-fix-broken-fetch` | [Add resilient data states to `PracticeList`](10-resilient-data-states.md) | PR, deterministic state tests |
| - [ ] | `tt-404-page` | [Add an App Router not-found experience](11-app-router-not-found.md) | PR, route-boundary tests |
| - [ ] | `tt-deploy-vercel` | [Deploy your fork to Vercel](12-vercel-deployment.md) | PR, deployment smoke test |
| - [ ] | `ms-git-collab` | [Collaborate through a reviewed pull request](01-git-collaboration.md) | PR and Git history |
| - [ ] | `ms-ts-types` | [Type a data boundary](02-typescript-data-boundary.md) | PR with typecheck and tests |
| - [ ] | `ms-react-ui` | [Build an accessible filterable list](03-react-accessible-list.md) | PR with UI-state evidence |
| - [ ] | `ms-next-route` | [Ship a route and Server Action](04-next-route-action.md) | PR with route and validation evidence |
| - [ ] | `ms-realworld-ci` | [Add tests and CI](05-quality-ci.md) | PR with green GitHub checks |
| - [ ] | `ms-ai-workflow` | [Deliver a defensible AI-assisted change](06-responsible-ai.md) | PR with decision record |
| - [ ] | `capstone-frontend` | [Ship the cumulative capstone](07-capstone.md) | PR, deployment, and rationale |

The repository provides a working baseline, not hidden answer code. Each assignment describes a real change to make in your fork. Your mentor evaluates the implementation and the evidence—not just whether a file exists.

For every assignment, follow [the shared Git workflow](../docs/git-workflow.md): branch from updated `main`, open a PR into your fork's `main`, wait for `Practice quality`, request mentor review, and submit the PR URL in Astudylab.

## Release contract

`curriculum-map.json` is the machine-readable contract for the 12 assignments. It is paired with
the immutable `release-foundation-2026` tag; application consumers must pin resource URLs to that
tag rather than `main`. The tag is created by a human only after this PR is merged and its checks
are green. Future edits require a new named release instead of moving the tag.
