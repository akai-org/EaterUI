import dayjs from "dayjs";
import { z } from "zod";

const formatDate = (date: Date) => dayjs(date).format("YYYY-MM-DD");

export const ShoppingListQuerySchema = z.object({
  query: z.object({
    limit: z.number().optional(),
    offset: z.number().optional(),
  }),
});

export type ShoppingListQuery = z.infer<
  typeof ShoppingListQuerySchema
>["query"];

export const ShoppingListSummarySchema = z
  .object({
    id: z.number(),
    startsAt: z.date().transform(formatDate),
    endsAt: z.date().transform(formatDate),
    ingredients: z.number(),
    markedIngredients: z.number(),
  })
  .array();

export type ShoppingListSummary = z.infer<typeof ShoppingListSummarySchema>;

export const ShoppingListIdParamSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export type ShoppingListId = z.infer<
  typeof ShoppingListIdParamSchema
>["params"];

export const ShoppingListDetailsSchema = z.object({
  id: z.number(),
  startsAt: z.date().transform(formatDate),
  endsAt: z.date().transform(formatDate),
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

export type ShoppingListDetails = z.infer<typeof ShoppingListDetailsSchema>;

export const CreateShoppingListSchema = z.object({
  body: z.object({
    startDate: z.string(),
    endDate: z.string(),
  }),
});

export type CreateShoppingListBody = z.infer<
  typeof CreateShoppingListSchema
>["body"];

export const UpdateShoppingListItemSchema = z.object({
  params: z.object({
    id: z.string(),
    itemId: z.string(),
  }),
  body: z.object({
    marked: z.boolean(),
  }),
});

type UpdateShoppingListItem = z.infer<typeof UpdateShoppingListItemSchema>;
export type UpdateShoppingListItemParams = UpdateShoppingListItem["params"];
export type UpdateShoppingListItemBody = UpdateShoppingListItem["body"];
