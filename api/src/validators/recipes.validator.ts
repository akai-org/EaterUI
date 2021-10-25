import { z } from "zod";

export const RecipeFilterSchema = z.object({
  query: z.string().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});

export const RecipeSchemaInfoBatchSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    graphicURL: z.string().optional(),
  })
  .array();

export type RecipeSchemaInfoBatch = z.infer<typeof RecipeSchemaInfoBatchSchema>;

export const RecipeIngredientSchema = z.object({
  name: z.string(),
  amount: z.number(),
  measure: z.string(),
});

export const RecipeSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  graphicURL: z.string().optional(),
  ingredients: RecipeIngredientSchema.array(),
});

export type Recipe = z.infer<typeof RecipeSchema>;

export const CreateRecipeSchema = z.object({
  name: z.string(),
  description: z.string(),
  graphicURL: z.string().optional(),
  ingredients: z
    .object({
      name: z.string(),
      amount: z.number(),
      measure: z.string(),
    })
    .array(),
});

export type CreateRecipeDto = z.infer<typeof CreateRecipeSchema>;

export const UpdateRecipeSchema = z.object({
  name: z.string(),
  description: z.string(),
  graphicURL: z.string().optional(),
  ingredients: z
    .object({
      name: z.string(),
      amount: z.number(),
      measure: z.string(),
    })
    .array(),
});

export type UpdateRecipeDto = z.infer<typeof UpdateRecipeSchema>;
