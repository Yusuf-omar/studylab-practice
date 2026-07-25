# `ms-ts-types` — Type a data boundary

Follow the shared [`docs/git-workflow.md`](../docs/git-workflow.md) and submit the reviewed PR from your fork in Astudylab.

**Outcome:** model domain states precisely and validate unknown data before it reaches UI code.

## Scenario

`src/data/practice-items.ts` currently exports trusted in-repository data. Add a boundary that can accept the same items from an external JSON response without trusting its shape.

## Steps

1. Create `assignment/ms-ts-types-short-description` from updated `main`.
2. Define a discriminated status type and a precise item schema in `src/lib/`.
3. Parse an `unknown` payload into typed practice items. Return an explicit success/error result instead of casting.
4. Update the page or list to consume only validated data.
5. Add tests for valid data, a missing field, an unknown status, and an unexpected extra value.

## Acceptance checks

- No explicit or implicit `any`, unchecked cast, or non-null assertion hides uncertainty.
- External data is `unknown` until validation succeeds.
- Call sites narrow a result before accessing data.
- Error behavior is predictable and tested.

## Verify

```bash
npm ci
npm run typecheck
npm test
npm run build
```

## Explain in your PR

Where does trust begin? Why is a TypeScript type alone insufficient for network data?
