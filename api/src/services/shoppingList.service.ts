import {
  ShoppingList,
  ShoppingListItem,
  ShoppingListItemAmount,
} from ".prisma/client";
import db from "../db";
import { HttpError } from "../errors/HttpError";
import {
  ShoppingListSummarySchema,
  ShoppingListSummary,
  ShoppingListDetailsSchema,
  ShoppingListDetails,
} from "../schema/shoppingList.schema";

export async function shoppingListSummary(
  userId: string,
  { limit = 10, offset = 0 }: { limit?: number; offset?: number } = {}
): Promise<ShoppingListSummary> {
  const shoppingListOverview = await db.shoppingList.findMany({
    where: { userId },
    skip: offset,
    take: Math.min(limit, 50),
    orderBy: { startDate: "desc" },
    include: {
      ingredients: {
        select: {
          id: true,
          marked: true,
        },
      },
    },
  });

  const formattedOverview = shoppingListOverview.map(
    ({ id, startDate, endDate, ingredients }) => ({
      id,
      startDate,
      endDate,
      ingredients: ingredients.length,
      markedIngredients: ingredients.filter(({ marked }) => marked).length,
    })
  );

  return ShoppingListSummarySchema.parse(formattedOverview);
}

export async function shoppingListDetails(
  userId: string,
  id: string
): Promise<ShoppingListDetails> {
  const shoppingList = await db.shoppingList.findFirst({
    where: { userId, id },
    include: {
      ingredients: {
        include: {
          amounts: true,
        },
        orderBy: {
          id: "asc",
        },
      },
    },
  });

  if (!shoppingList) {
    throw new HttpError(404, `Shopping List with id ${id} does not exist`);
  }

  return ShoppingListDetailsSchema.parse(shoppingList);
}

type IngredientsToMeasueToValue = { [key: string]: { [keys: string]: number } };

export async function generateShoppingList(
  userId: string,
  { startDate, endDate }: { startDate: Date; endDate: Date }
): Promise<ShoppingListDetails | undefined> {
  try {
    await db.$queryRaw`BEGIN TRANSACTION`;

    const menuItems = await findIngredientsForMenuByDateRage(
      userId,
      startDate,
      endDate
    );

    // map returned data to struct with shape:
    //   {
    //       "ingredient": {
    //           "measure 1": value1,
    //           "measure 2": value2
    //       }
    //   }

    const ingredients = menuItems.reduce((acc, curItem) => {
      for (const ingredient of curItem.recipe.ingredients) {
        if (acc[ingredient.name]) {
          if (acc[ingredient.name][ingredient.measure]) {
            acc[ingredient.name][ingredient.measure] += ingredient.amount;
          } else {
            acc[ingredient.name][ingredient.measure] = ingredient.amount;
          }
        } else {
          acc[ingredient.name] = {
            [ingredient.measure]: ingredient.amount,
          };
        }
      }

      return acc;
    }, {} as IngredientsToMeasueToValue);

    const shoppingList = await createShoppingList(userId, startDate, endDate);
    const shoppingListItems = await createShoppingListItems(
      shoppingList.id,
      ingredients
    );

    const itemNameToId = shoppingListItems.reduce((acc, cur) => {
      acc[cur.name] = cur.id;

      return acc;
    }, {} as { [key: string]: string });

    const shoppingListItemAmounts = await createShoppingListItemAmount(
      ingredients,
      itemNameToId
    );

    const shoppingListStruct = buildShoppingListStruct(
      shoppingList,
      shoppingListItems,
      shoppingListItemAmounts
    );

    await db.$queryRaw`COMMIT`;

    return ShoppingListDetailsSchema.parse(shoppingListStruct);
  } catch (error) {
    await db.$queryRaw`ROLLBACK`;

    throw error;
  }
}

async function findIngredientsForMenuByDateRage(
  userId: string,
  startDate: Date,
  endDate: Date
) {
  return db.menuItem.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      recipe: {
        include: {
          ingredients: {
            orderBy: {
              id: "asc",
            },
          },
        },
      },
    },
  });
}

async function createShoppingList(
  userId: string,
  startDate: Date,
  endDate: Date
) {
  return db.shoppingList.create({
    data: {
      userId,
      startDate,
      endDate,
    },
  });
}

async function createShoppingListItems(
  shoppingListId: string,
  ingredientsData: IngredientsToMeasueToValue
) {
  return Promise.all(
    Object.keys(ingredientsData).map((name) =>
      db.shoppingListItem.create({
        data: { name, shoppingListId, marked: false },
      })
    )
  );
}

async function createShoppingListItemAmount(
  ingredientsData: IngredientsToMeasueToValue,
  itemNameToId: { [key: string]: string }
) {
  return Promise.all(
    Object.entries(ingredientsData)
      .map(([name, amounts]) =>
        Object.entries(amounts).map(([measure, amount]) =>
          db.shoppingListItemAmount.create({
            data: {
              measure,
              amount,
              shoppingListItemId: itemNameToId[name],
            },
          })
        )
      )
      .flat()
  );
}

function buildShoppingListStruct(
  shoppingList: ShoppingList,
  shoppingListItems: ShoppingListItem[],
  shoppingListItemAmounts: ShoppingListItemAmount[]
) {
  const ingredients = shoppingListItems.reduce((acc, cur) => {
    acc[cur.id] = { ...cur, amounts: [] };
    return acc;
  }, {} as { [keys: string]: ShoppingListItem & { amounts: ShoppingListItemAmount[] } });

  for (const item of shoppingListItemAmounts) {
    ingredients[item.shoppingListItemId].amounts.push(item);
  }

  return {
    ...shoppingList,
    ingredients: Object.values(ingredients),
  };
}

export async function markShoppingListItem(
  userId: string,
  shoppingListId: string,
  shoppingListItemId: string,
  marked: boolean
): Promise<void> {
  const item = await db.shoppingListItem.findFirst({
    where: {
      id: shoppingListItemId,
      shoppingList: {
        userId,
        id: shoppingListId,
      },
    },
  });

  if (!item) {
    throw new HttpError(
      404,
      `Shopping List Item with id ${shoppingListItemId} does not exist`
    );
  }

  await db.shoppingListItem.update({
    where: { id: shoppingListItemId },
    data: {
      marked,
    },
  });
}
