import {
  ShoppingList,
  ShoppingListItem,
  ShoppingListItemAmount,
} from ".prisma/client";
import dayjs from "dayjs";
import {
  ShoppingListOverviewSchema,
  ShoppingListSchema,
} from "../validators/shoppingList.validator";
import db from "../db";

export async function shoppingListOverview(
  userId: string,
  { limit = 10, offset = 0 }: { limit?: number; offset?: number } = {}
) {
  const shoppingListOverview = await db.shoppingList.findMany({
    where: { userId },
    skip: offset,
    take: Math.min(limit, 50),
    orderBy: { startsAt: "desc" },
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
    ({ id, startsAt, endsAt, ingredients }) => ({
      id,
      startsAt,
      endsAt,
      ingredients: ingredients.length,
      markedIngredients: ingredients.filter(({ marked }) => marked).length,
    })
  );

  return ShoppingListOverviewSchema.parse(formattedOverview);
}

export async function getShoppingListDetails(userId: string, id: number) {
  const shoppingList = await db.shoppingList.findFirst({
    where: { userId, id },
    include: {
      ingredients: {
        include: {
          amounts: true,
        },
      },
    },
  });

  return ShoppingListSchema.parse(shoppingList);
}

type IngredientsToMeasueToValue = { [key: string]: { [keys: string]: number } };

// TODO:
// 1. Prisma - transaction with raw SQL
// 2. Or write raw SQL for performed operations
export async function generateShoppingList(
  userId: string,
  { startDate, endDate }: { startDate: string; endDate: string }
) {
  const start = dayjs(startDate).hour(0).toDate();
  const end = dayjs(endDate).hour(0).toDate();

  const menuItems = await findIngredientsForMenuByDateRage(userId, start, end);

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

  const shoppingList = await createShoppingList(userId, start, end);
  const shoppingListItems = await createShoppingListItems(
    shoppingList.id,
    ingredients
  );

  const itemNameToId = shoppingListItems.reduce((acc, cur) => {
    acc[cur.name] = cur.id;

    return acc;
  }, {} as { [key: string]: number });

  const shoppingListItemAmounts = await createShoppingListItemAmount(
    ingredients,
    itemNameToId
  );

  const shoppingListStruct = buildShoppingListStruct(
    shoppingList,
    shoppingListItems,
    shoppingListItemAmounts
  );

  return ShoppingListSchema.parse(shoppingListStruct);
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
          ingredients: true,
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
      startsAt: startDate,
      endsAt: endDate,
    },
  });
}

async function createShoppingListItems(
  shoppingListId: number,
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
  itemNameToID: { [key: string]: number }
) {
  return Promise.all(
    Object.entries(ingredientsData)
      .map(([name, amounts]) =>
        Object.entries(amounts).map(([measure, amount]) =>
          db.shoppingListItemAmount.create({
            data: {
              measure,
              amount,
              shoppingListItemId: itemNameToID[name],
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
  }, {} as { [keys: number]: ShoppingListItem & { amounts: ShoppingListItemAmount[] } });

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
  shoppingListId: number,
  id: number,
  marked: boolean
) {
  const item = await db.shoppingListItem.findFirst({
    where: {
      id,
      shoppingList: {
        userId,
        id: shoppingListId,
      },
    },
  });
  if (!item) throw new Error(`Shopping List Item with id ${id} does not exist`);

  await db.shoppingListItem.update({
    where: { id },
    data: {
      marked,
    },
  });
}
