import { z } from "zod";
import dayjs from "dayjs";

const validateDateFormat = (val: string | undefined) =>
  dayjs(val, "YYYY-MM-DD").isValid();

const params = z.object({
  id: z.string(),
});

export const MenuSummaryQuerySchema = z.object({
  query: z.object({
    startDate: z.string().optional().refine(validateDateFormat),
    endDate: z.string().optional().refine(validateDateFormat),
  }),
});

export type MenuSummaryQuery = z.infer<typeof MenuSummaryQuerySchema>["query"];

export const MenuSummarySchema = z
  .object({
    date: z.date().transform((date) => dayjs(date).format("YYYY-MM-DD")),
    count: z.number(),
  })
  .array();

export type MenuSummary = z.infer<typeof MenuSummarySchema>;

export const MenuDetailsQuerySchema = z.object({
  query: z.object({
    date: z.string().optional().refine(validateDateFormat),
  }),
});

export type MenuDetailsQuery = z.infer<typeof MenuDetailsQuerySchema>["query"];

export const MenuSchema = z
  .object({
    id: z.string(),
    portions: z.number(),
    recipe: z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      graphicURL: z.string().optional(),
    }),
  })
  .array();

export type Menu = z.infer<typeof MenuSchema>;

export const MenuItemIdSchema = z.object({ params });

export type MenuItemId = z.infer<typeof MenuItemIdSchema>["params"];

export const CreateMenuItemSchema = z.object({
  body: z.object({
    date: z.string().refine(validateDateFormat),
    portions: z.number(),
    recipeId: z.string(),
  }),
});

export type CreateMenuItemBody = z.infer<typeof CreateMenuItemSchema>["body"];

export const UpdateMenuItemSchema = z.object({
  params,
  body: z.object({
    portions: z.number(),
    recipeId: z.string(),
  }),
});

export type UpdateMenuItemBody = z.infer<typeof UpdateMenuItemSchema>["body"];
