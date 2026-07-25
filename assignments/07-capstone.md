# `capstone-frontend` — Ship a cumulative frontend feature

Follow the shared [`docs/git-workflow.md`](../docs/git-workflow.md) and submit the reviewed PR from your fork in Astudylab.

**Outcome:** deliver a small, complete product slice that demonstrates the pathway’s required capabilities and can be defended in review.

## Product brief

Turn the starter backlog into a personal practice planner. A learner can view, filter, create, update, and complete practice items while data access remains scoped to the signed-in user boundary you design.

## Required capabilities

- Semantic landmarks, heading hierarchy, labels, focus management, and keyboard operation.
- Responsive design without clipping at 320px or unnecessary empty desktop space.
- Precise TypeScript and runtime validation for external/form data.
- Deliberate React state, effects only for external synchronization, and explicit UI states.
- Next.js App Router detail route, Server Action or Route Handler, and server-enforced data/auth boundary.
- Unit and component/integration tests covering critical behavior.
- Green pull-request CI and a live deployment.
- A concise engineering rationale and an accountable AI-assistance decision record.

## Delivery stages

1. Create `assignment/capstone-frontend-short-description` from updated `main`, then define the user problem, non-goals, data contract, and acceptance criteria in the PR draft.
2. Draw the server/client and trust boundaries before implementation.
3. Deliver the smallest vertical slice and keep checks green.
4. Add error, empty, loading, success, and recovery behavior.
5. Test accessibility and responsive behavior manually and automatically where useful.
6. Deploy, run a production smoke test, and request mentor review.

## Verify

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
git diff --check
```

## Submit

Provide the pull-request URL from your fork and deployment URL in Astudylab. In the PR, explain the architecture, key tradeoffs, verification evidence, limitations, and what AI assisted with. A deployment alone is not passing evidence; the mentor reviews the implementation and rationale against the Astudylab rubric.
