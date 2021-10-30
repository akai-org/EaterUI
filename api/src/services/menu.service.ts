import dayjs from "dayjs";
import { HttpError } from "../errors/HttpError";
import db from "../db";
import {
  MenuSummarySchema,
  MenuSummary,
  MenuSchema,
  Menu,
  CreateMenuItemDto,
  UpdateMenuItemDto,
  MenuItemId,
} from "../validators/menu.validator";

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

  const formattedItems = menuItems.map((item) => ({
    ...item,
    date: dayjs(item.date).format("YYYY-MM-DD"),
  }));

  return MenuSchema.parse(formattedItems);
}

export async function createMenuItem(
  userId: string,
  data: CreateMenuItemDto
): Promise<MenuItemId> {
  const { id } = await db.menuItem.create({ data: { userId, ...data } });

  return { id };
}

export async function updateMenuItemById(
  userId: string,
  id: number,
  data: UpdateMenuItemDto
): Promise<void> {
  const menuItem = await db.menuItem.findFirst({ where: { id, userId } });
  if (!menuItem) {
    throw new HttpError(404, `Menu Item with id ${id} does not exist`);
  }

  await db.menuItem.update({ where: { id }, data });
}

export async function deleteMenuItemById(
  userId: string,
  id: number
): Promise<void> {
  const menuItem = await db.menuItem.findFirst({ where: { id, userId } });
  if (!menuItem) {
    throw new HttpError(404, `Menu Item with id ${id} does not exist`);
  }

  await db.menuItem.delete({ where: { id } });
}
