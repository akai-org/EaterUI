import dayjs from "dayjs";
import { z } from "zod";

export const ShoppingListFilterSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

export const ShoppingListOverviewSchema = z
  .object({
    id: z.number(),
    startsAt: z.date().transform((date) => dayjs(date).format("YYYY-MM-DD")),
    endsAt: z.date().transform((date) => dayjs(date).format("YYYY-MM-DD")),
    ingredients: z.number(),
    markedIngredients: z.number(),
  })
  .array();

export const ShoppingListSchema = z.object({
  id: z.number(),
  startsAt: z.date().transform((date) => dayjs(date).format("YYYY-MM-DD")),
  endsAt: z.date().transform((date) => dayjs(date).format("YYYY-MM-DD")),
  ingredients: z
    .object({
      id: z.number(),
      name: z.string(),
      marked: z.boolean(),
      amounts: z
        .object({
          amount: z.number(),
          measure: z.string(),
        })
        .array(),
    })
    .array(),
});

export const CreateShoppingListSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

export type CreateShoppingListDto = z.infer<typeof CreateShoppingListSchema>;

export const UpdateShoppingListItemSchema = z.object({ marked: z.boolean() });
