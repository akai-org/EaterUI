## What is request? - communicating with REST API - example getUserInfo

- async operations
- request, response, headers, HTTP methods, authorization

## Promise recap

## Fetch

- show fetch from console

- fill in `src/api/recipes.js`

  - show `request` wrapper function

- fill in `RecipeListing`

  - show the whole flow on how to fetch data
  - (`RecipeDetails` should be already done)

- import createRecipe components and show how to POST is not much different than GET

  - indicate that we need to add `onRecipeAdded` to add the element to the list

- extract everything to hooks

## React Query

- react query provider + client?

- React Query devtools - show the state of queries

- redo `useRecipes`
  - show that we're caching it
- redo `useRecipe`
  - show that there are no loadings between subsequent calls
- prepopulate `useRecipe` with initial data from `useRecipes`
- `useCreateRecipe`
  - 1. invalidate - show that we show stale data and fetch new one - 2 requets
  - 2. we can do better? - update cache once the POST call - 1 request
  - 3. can we faster? - optimistic update
