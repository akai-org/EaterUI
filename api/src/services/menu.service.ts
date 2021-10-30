import dayjs from "dayjs";
import { HttpError } from "../errors/HttpError";
import db from "../db";
import {
  MenuSummarySchema,
  MenuSummary,
  MenuSchema,
  Menu,
  MenuItemId,
  CreateMenuItemBody,
  UpdateMenuItemBody,
} from "../schema/menu.schema";

export async function menuSummaryByDateRange(
  userId: string,
  { startDate, endDate }: { startDate: Date; endDate: Date }
): Promise<MenuSummary> {
  const menuItemsOverview = await db.menuItem.groupBy({
    where: {
      userId,
      date: {
        gte: startDate,
        lte: endDate,
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
    date: item.date,
    count: item._count.recipeId,
  }));

  return MenuSummarySchema.parse(formattedMenuItemsOverview);
}

export async function menuItemsByDate(
  userId: string,
  date: Date
): Promise<Menu> {
  const menuItems = await db.menuItem.findMany({
    where: {
      userId,
      date: {
        equals: date,
      },
    },
    orderBy: {
      date: "desc",
    },
    include: {
      recipe: true,
    },
  });

  return MenuSchema.parse(menuItems);
}

export async function createMenuItem(
  userId: string,
  data: CreateMenuItemBody
): Promise<MenuItemId> {
  const { id } = await db.menuItem.create({
    data: { userId, ...data, date: dayjs(data.date).toDate() },
  });

  return { id };
}

export async function updateMenuItemById(
  userId: string,
  id: string,
  data: UpdateMenuItemBody
): Promise<void> {
  const menuItem = await db.menuItem.findFirst({ where: { id, userId } });
  if (!menuItem) {
    throw new HttpError(404, `Menu Item with id ${id} does not exist`);
  }

  await db.menuItem.update({ where: { id }, data });
}

export async function deleteMenuItemById(
  userId: string,
  id: string
): Promise<void> {
  const menuItem = await db.menuItem.findFirst({ where: { id, userId } });
  if (!menuItem) {
    throw new HttpError(404, `Menu Item with id ${id} does not exist`);
  }

  await db.menuItem.delete({ where: { id } });
}
