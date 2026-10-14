import { practiceItems } from "./practice-items";
import type { PracticeItem } from "./practice-items";

export async function loadPracticeItems(): Promise<PracticeItem[]> {
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
  return practiceItems;
}
