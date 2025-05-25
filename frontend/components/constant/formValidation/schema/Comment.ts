// schemas/auth.ts
import { z } from "zod";

export const titleSchema = z
  .string()
  .min(8, "عنوان باید حداقل ۸ کاراکتر باشد")
  .max(60, "عنوان باید کمتر از ۶۰ کاراکتر باشد")

export const applyCommentSchema = z.object({
  title: titleSchema,
  comment: z.string().min(20, "دیدگاه باید حداقل 20 کاراکتر باشد"),
});

export type CommentFormData = z.infer<typeof applyCommentSchema>;