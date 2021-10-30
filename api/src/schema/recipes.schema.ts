import { z } from "zod";

const params = z.object({
  id: z.string(),
});

const recipeProperties = {
  name: z.string(),
  description: z.string(),
  graphicURL: z.string().optional(),
};

const ingredients = z
  .object({
    name: z.string(),
    amount: z.number(),
    measure: z.string(),
  })
  .array();

export const RecipesQuerySchema = z.object({
  query: z.object({
    query: z.string().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
  }),
});

export type RecipesQuery = z.infer<typeof RecipesQuerySchema>["query"];

export const RecipeSchemaInfoBatchSchema = z
  .object({
    id: z.number(),
    ...recipeProperties,
  })
  .array();

export type RecipeSchemaInfoBatch = z.infer<typeof RecipeSchemaInfoBatchSchema>;

export const RecipeIdParamSchema = z.object({ params });

export type RecipeId = z.infer<typeof RecipeIdParamSchema>["params"];

export const RecipeSchema = z.object({
  id: z.number(),
  ...recipeProperties,
  ingredients,
});

export type Recipe = z.infer<typeof RecipeSchema>;

export const CreateRecipeSchema = z.object({
  body: z.object({
    ...recipeProperties,
    ingredients,
  }),
});

export type CreateRecipeBody = z.infer<typeof CreateRecipeSchema>["body"];

export const UpdateRecipeSchema = z.object({
  params,
  body: z.object({
    ...recipeProperties,
    ingredients,
  }),
});

export type UpdateRecipeBody = z.infer<typeof UpdateRecipeSchema>["body"];
