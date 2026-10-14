import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PracticeList } from "@/src/components/PracticeList";
import { practiceItems } from "@/src/data/practice-items";

afterEach(() => {
  cleanup();
});

describe("PracticeList", () => {
  it("shows loading before the request resolves", async () => {
    let resolveRequest!: (items: typeof practiceItems) => void;
    const requestItems = vi.fn(
      () =>
        new Promise<typeof practiceItems>((resolve) => {
          resolveRequest = resolve;
        }),
    );

    render(<PracticeList requestItems={requestItems} />);

    expect(screen.getByRole("status")).toHaveTextContent(
      /loading practice items/i,
    );

    resolveRequest(practiceItems);

    expect(
      await screen.findByText("Make the profile summary semantic"),
    ).toBeVisible();

    expect(requestItems).toHaveBeenCalledTimes(1);
  });

  it("shows a distinct message when the request returns no items", async () => {
    const requestItems = vi.fn().mockResolvedValue([]);

    render(<PracticeList requestItems={requestItems} />);

    expect(
      await screen.findByText("No practice items are available."),
    ).toBeVisible();

    expect(
      screen.queryByText("No practice items match that filter."),
    ).not.toBeInTheDocument();
  });

  it("filters by visible task content and announces no matches", async () => {
    const requestItems = vi.fn().mockResolvedValue(practiceItems);

    render(<PracticeList requestItems={requestItems} />);

    const filter = await screen.findByRole("searchbox", {
      name: /filter the backlog/i,
    });

    fireEvent.change(filter, { target: { value: "semantic" } });

    expect(screen.getByText("Make the profile summary semantic")).toBeVisible();

    expect(screen.queryByText("Validate a task form")).not.toBeInTheDocument();

    fireEvent.change(filter, { target: { value: "no match" } });

    expect(screen.getByRole("status")).toHaveTextContent(
      /no practice items match that filter/i,
    );
  });

  it("keeps Retry available during loading and focuses the filter after success", async () => {
    let resolveRetry!: (items: typeof practiceItems) => void;

    const requestItems = vi
      .fn<() => Promise<typeof practiceItems>>()
      .mockRejectedValueOnce(new Error("Request failed"))
      .mockImplementationOnce(
        () =>
          new Promise<typeof practiceItems>((resolve) => {
            resolveRetry = resolve;
          }),
      );

    render(<PracticeList requestItems={requestItems} />);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /failed to load/i,
    );

    const retryButton = screen.getByRole("button", { name: /retry/i });

    retryButton.focus();
    fireEvent.click(retryButton);

    expect(retryButton).toBeInTheDocument();
    expect(retryButton).toHaveAttribute("aria-disabled", "true");

    resolveRetry(practiceItems);

    const filter = await screen.findByRole("searchbox", {
      name: /filter the backlog/i,
    });

    await waitFor(() => {
      expect(filter).toHaveFocus();
    });

    expect(requestItems).toHaveBeenCalledTimes(2);
  });

  it("shows an error and recovers after retry", async () => {
    const requestItems = vi
      .fn<() => Promise<typeof practiceItems>>()
      .mockRejectedValueOnce(new Error("Request failed"))
      .mockResolvedValueOnce(practiceItems);

    render(<PracticeList requestItems={requestItems} />);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /failed to load/i,
    );

    fireEvent.click(screen.getByRole("button", { name: /retry/i }));

    expect(
      await screen.findByText("Make the profile summary semantic"),
    ).toBeVisible();

    expect(requestItems).toHaveBeenCalledTimes(2);
  });
});
