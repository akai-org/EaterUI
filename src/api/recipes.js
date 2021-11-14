// import { rootUrl } from "./index";
// import { getToken } from "../utils/auth";
import request from "./request";

export function listRecipes() {
  //   const token = getToken();

  // return fetch(`${rootUrl}/recipes`, {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // }).then((res) => res.json());

  // --

  return request("/recipes");
}

export function getRecipe(recipeId) {
  //   const token = getToken();

  //   return fetch(`${rootUrl}/recipes/${recipeId}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }).then(res => res.json());

  // --

  return request(`/recipes/${recipeId}`);
}

export function createRecipe(body) {
  //   const token = getToken();

  //   return fetch(`${rootUrl}/recipes`, {
  //     method: "POST",
  //     body: JSON.stringify(body),
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }).then(res => res.json());

  // --

  return request("/recipes", { method: "POST", body });
}
