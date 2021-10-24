import dayjs from "dayjs";
import db from "../db";
import {
  MenuItemSchema,
  MenuItemsOverviewSchema,
  MenuItemsWithRecipeDetails,
  CreateMenuItemDto,
  UpdateMenuItemDto,
} from "../validators/menu.validator";

export async function menuItemsOverviewByDateRange(
  userId: string,
  { startDate, endDate }: { startDate: string; endDate: string }
) {
  const menuItemsOverview = await db.menuItem.groupBy({
    where: {
      userId,
      date: {
        gte: dayjs(startDate).hour(0).toDate(),
        lte: dayjs(endDate).hour(0).toDate(),
      },
    },
    by: ["date"],
    _count: {
      recipeId: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  const formattedMenuItemsOverview = menuItemsOverview.map((item) => ({
    date: dayjs(item.date).format("YYYY-MM-DD"),
    count: item._count.recipeId,
  }));

  return MenuItemsOverviewSchema.parse(formattedMenuItemsOverview);
}

export async function getMenuItemsByDate(userId: string, date: string) {
  const menuItems = await db.menuItem.findMany({
    where: {
      userId,
      date: {
        equals: dayjs(date).hour(0).toDate(),
      },
    },
    orderBy: {
      date: "desc",
    },
    include: {
      recipe: true,
    },
  });

  const formattedItems = menuItems.map((item) => ({
    ...item,
    date: dayjs(item.date).format("YYYY-MM-DD"),
  }));

  return MenuItemsWithRecipeDetails.parse(formattedItems);
}

export async function createMenuItem(userId: string, data: CreateMenuItemDto) {
  const menuItem = await db.menuItem.create({ data: { userId, ...data } });

  const formattedDate = dayjs(menuItem.date).format("YYYY-MM-DD");
  const formattedItem = { ...menuItem, date: formattedDate };

  return MenuItemSchema.parse(formattedItem);
}

export async function updateMenuItemById(
  userId: string,
  id: number,
  data: UpdateMenuItemDto
) {
  const menuItem = await db.menuItem.findFirst({ where: { id, userId } });
  if (!menuItem) throw new Error(`Menu item with id ${id} does not exist`);

  await db.menuItem.update({ where: { id }, data });
}

export async function deleteMenuItemById(userId: string, id: number) {
  const menuItem = await db.menuItem.findFirst({ where: { id, userId } });
  if (!menuItem) throw new Error(`Menu item with id ${id} does not exist`);

  await db.menuItem.delete({ where: { id } });
}