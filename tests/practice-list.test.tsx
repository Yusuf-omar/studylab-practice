import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PracticeList } from "@/src/components/PracticeList";
import { practiceItems } from "@/src/data/practice-items";
import { vi } from "vitest";
describe("PracticeList", () => {
  it("filters by visible task content and announces an empty state", async () => {
    render(<PracticeList />);

    fireEvent.change(
      await screen.findByRole("searchbox", { name: /filter the backlog/i }),
      {
        target: { value: "semantic" },
      },
    );
    expect(screen.getByText("Make the profile summary semantic")).toBeVisible();
    expect(screen.queryByText("Validate a task form")).not.toBeInTheDocument();

    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "no match" },
    });
    expect(screen.getByRole("status")).toHaveTextContent(/no practice items/i);
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

    const retryButton = screen.getByRole("button", { name: /retry/i });

    fireEvent.click(retryButton);

    expect(
      await screen.findByText("Make the profile summary semantic"),
    ).toBeVisible();

    expect(requestItems).toHaveBeenCalledTimes(2);
  });
});
