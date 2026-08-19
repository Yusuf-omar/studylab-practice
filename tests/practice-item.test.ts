import { describe , expect , it } from "vitest";
import { parsePracticeItems } from "@/src/lib/practice-item";


describe("parsePracticeItems", () => {
  it("accepts valid practice items", () => {
    const result = parsePracticeItems([
      {
        id: "semantic-profile",
        title: "Make the profile summary semantic",
        description: "Use landmarks and a heading hierarchy.",
        status: "ready",
      },
    ]);

    expect(result.success).toBe(true);
  });

  it("rejects an item with a missing field", () => {
    const result = parsePracticeItems([
      {
        id: "semantic-profile",
        title: "Make the profile summary semantic",
        status: "ready",
      },
    ]);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error).toBeDefined();
    }
  });

  it("rejects an unknown status", () => {
    const result = parsePracticeItems([
      {
        id: "semantic-profile",
        title: "Make the profile summary semantic",
        description: "Use landmarks and a heading hierarchy.",
        status: "completed",
      },
    ]);

    expect(result.success).toBe(false);
  });

  it("rejects an unexpected extra value", () => {
    const result = parsePracticeItems([
      {
        id: "semantic-profile",
        title: "Make the profile summary semantic",
        description: "Use landmarks and a heading hierarchy.",
        status: "ready",
        extra: "unexpected",
      },
    ]);

    expect(result.success).toBe(false);
  });
});