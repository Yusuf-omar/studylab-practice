import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PracticeList } from "@/src/components/PracticeList";
import type { PracticeItem } from "@/src/data/practice-items";
import { loadPracticeItems } from "@/src/data/practice-data";

vi.mock("@/src/data/practice-data", () => ({
  loadPracticeItems: vi.fn(),
}));
afterEach(() => {
  cleanup();
});
const testItems = [
  {
    id: "task-1",
    title: "Build an accessible profile",
    description: "Improve keyboard navigation",
    status: "ready",
  },
  {
    id: "task-2",
    title: "Validate a task form",
    description: "Check required fields",
    status: "review",
  },
] satisfies PracticeItem[];

describe("PracticeList", () => {
  beforeEach(() => {
    vi.mocked(loadPracticeItems).mockReset();
    vi.mocked(loadPracticeItems).mockResolvedValue(testItems);
  });

  it("announces an error when loading practice items fails", async () => {
    vi.mocked(loadPracticeItems).mockRejectedValueOnce(
      new Error("Network error"),
    );

    render(<PracticeList initialItems={[]} />);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Could not load practice items.",
    );
  });

  it("filters by visible task content and announces an empty state", async () => {
    render(<PracticeList initialItems={testItems} />);

    await screen.findByText("Build an accessible profile");

    fireEvent.change(
      screen.getByRole("searchbox", { name: /filter the backlog/i }),
      { target: { value: "accessible" } },
    );
    expect(
      screen.getByRole("searchbox", { name: /filter the backlog/i }),
    ).toHaveValue("accessible");
    expect(screen.getByText("Build an accessible profile")).toBeVisible();
    expect(screen.queryByText("Validate a task form")).not.toBeInTheDocument();

    fireEvent.change(
      screen.getByRole("searchbox", { name: /filter the backlog/i }),
      { target: { value: "no-match-term" } },
    );

    expect(
      await screen.findByText("No practice items match that filter."),
    ).toBeVisible();
  });
});
