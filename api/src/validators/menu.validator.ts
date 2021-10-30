import { z } from "zod";
import dayjs from "dayjs";

export const MenuSummarySchema = z
  .object({
    date: z.date().transform((date) => dayjs(date).format("YYYY-MM-DD")),
    count: z.number(),
  })
  .array();

export type MenuSummary = z.infer<typeof MenuSummarySchema>;

export const MenuSchema = z
  .object({
    id: z.number(),
    portions: z.number(),
    recipe: z.object({
      id: z.number(),
      name: z.string(),
      description: z.string(),
      graphicURL: z.string().optional(),
    }),
  })
  .array();

export type Menu = z.infer<typeof MenuSchema>;

export const CreateMenuItemSchema = z.object({
  date: z.date(),
  portions: z.number(),
  recipeId: z.number(),
});

export type CreateMenuItemDto = z.infer<typeof CreateMenuItemSchema>;

export const MenuItemIdSchema = z.object({
  id: z.number(),
});

export type MenuItemId = z.infer<typeof MenuItemIdSchema>;

export const UpdateMenuItemSchema = z.object({
  portions: z.number(),
  recipeId: z.number(),
});

export type UpdateMenuItemDto = z.infer<typeof UpdateMenuItemSchema>;
