import request from "./request";

export function listRecipes() {
  return request("/recipes");
}

export function getRecipesById(recipeId) {
  return request(`/recipes/${recipeId}`);
}

export function createRecipe(body) {
  return request("/recipes", { method: "POST", body });
}
