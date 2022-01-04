import { useMutation, useQuery } from "react-query";
import request from "@/api/request";

function useRecipes() {
  const state = useQuery("recipes", () => request("/recipes"));
  const addRecipe = (ingredient) =>
    useMutation("recipes", () =>
      request("recipes/new", {
        method: "POST",
        body: ingredient,
      }),
    );

  return { state, addRecipe };
}

export default useRecipes;
