import { z } from "zod";

export const practiceStatusSchema = z.enum([
    "ready",
    "in-progress",
    "review",
]);

export const practiceItemSchema = z.strictObject({
  id: z.string(),
    title : z.string(),
    description : z.string(),
    status : practiceStatusSchema,
});

export const practiceItemsSchema = z.array(practiceItemSchema);

export type ValidatedPracticeItem = z.infer<typeof practiceItemSchema>;
export type ValidatedPracticeItems = z.infer<typeof practiceItemsSchema>;
export function parsePracticeItems(input: unknown) {
  return practiceItemsSchema.safeParse(input);
}