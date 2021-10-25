import { z } from "zod";

export const MenuItemsOverviewSchema = z
  .object({
    date: z.string(),
    count: z.number(),
  })
  .array();

export const MenuItemsWithRecipeDetails = z
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

export const CreateMenuItemSchema = z.object({
  date: z.date(),
  portions: z.number(),
  recipeId: z.number(),
});

export type CreateMenuItemDto = z.infer<typeof CreateMenuItemSchema>;

export const MenuItemSchema = z.object({
  id: z.number(),
  date: z.string(),
  portions: z.number(),
  recipeId: z.number(),
});

export const UpdateMenuItemSchema = z.object({
  portions: z.number(),
  recipeId: z.number(),
});

export type UpdateMenuItemDto = z.infer<typeof UpdateMenuItemSchema>;
