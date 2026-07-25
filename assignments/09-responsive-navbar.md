# `tt-responsive-navbar` — Build a responsive navigation bar

Follow the shared [`docs/git-workflow.md`](../docs/git-workflow.md) and submit the reviewed PR from your fork in Astudylab.

## Objective

Turn a narrow-screen navigation idea into a usable responsive component whose links remain reachable by keyboard and screen reader.

## Starter context

The starter app has a simple page shell and a small CSS surface. Add a navigation component to the app shell or replace an intentionally minimal navigation region. Keep the existing practice backlog behavior intact.

## Steps

1. Create `assignment/tt-responsive-navbar-short-description` from updated `main`.
2. Define the navigation landmarks and a small set of real links before styling.
3. Make the layout adapt at a narrow viewport without horizontal scrolling or clipped labels.
4. If you add a menu button, implement an accessible name, expanded state, Escape handling, and focus behavior; do not hide links from keyboard users.
5. Add component tests for collapsed/expanded behavior and run the responsive verification commands.

## Evidence

Submit a pull request with screenshots or a short recording at 320px and desktop widths, the keyboard path through every link, and the test output.

## Acceptance checks

- Navigation has one labelled landmark and every link has a meaningful accessible name.
- The layout works at 320px without horizontal overflow; labels wrap or reflow instead of being clipped.
- Any menu state is controlled, keyboard-operable, and announced through `aria-expanded` where applicable.
- Existing content remains reachable after opening and closing the navigation.

## Verify

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

## Explain in your PR

Which breakpoint and interaction state did you choose, and what evidence shows the navigation remains usable without a mouse?
