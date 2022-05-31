import dayjs from "dayjs";
import { HttpError } from "../errors/HttpError";
import db from "../db";
import {
  MenuSummarySchema,
  MenuSummary,
  MenuSchema,
  Menu,
  MenuItemId,
  CreateMenuItemPayload,
  UpdateMenuItemBody,
} from "../schema/menu.schema";
import { dateFormat } from "../config/date";

function generateMenu(
  startDate: Date,
  endDate: Date,
  data: Record<string, number>,
) {
  const days: Record<string, number> = {};

  const start = dayjs(startDate);
  // adding 1 more day to have endDate inclusive in the range of days
  const end = dayjs(endDate).add(1, "day");

  for (
    let currentDate = start;
    currentDate.isBefore(end);
    currentDate = currentDate.add(1, "day")
  ) {
    const strDay = currentDate.format(dateFormat);

    if (data[strDay]) {
      days[strDay] = data[strDay];
    } else {
      days[strDay] = 0;
    }
  }

  return Object.entries(days).map(([date, count]) => ({
    date,
    count,
  }));
}

export async function menuSummaryByDateRange(
  userId: string,
  { startDate, endDate }: { startDate: Date; endDate: Date },
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
  });

  const mappedDailyMealCount = menuItemsOverview.reduce((acc, item) => {
    const strDay = dayjs(item.date).format(dateFormat);
    acc[strDay] = item._count.recipeId;
    return acc;
  }, {} as Record<string, number>);

  const filledDailyMealCount = generateMenu(
    startDate,
    endDate,
    mappedDailyMealCount,
  );

  return MenuSummarySchema.parse(filledDailyMealCount);
}

export async function menuItemsByDate(
  userId: string,
  date: Date,
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
  data: CreateMenuItemPayload,
): Promise<MenuItemId> {
  const { id } = await db.menuItem.create({
    data: { userId, ...data },
  });

  return { id };
}

export async function updateMenuItemById(
  userId: string,
  id: string,
  data: UpdateMenuItemBody,
): Promise<void> {
  const menuItem = await db.menuItem.findFirst({ where: { id, userId } });
  if (!menuItem) {
    throw new HttpError(404, `Menu Item with id ${id} does not exist`);
  }

  await db.menuItem.update({ where: { id }, data });
}

export async function deleteMenuItemById(
  userId: string,
  id: string,
): Promise<void> {
  const menuItem = await db.menuItem.findFirst({ where: { id, userId } });
  if (!menuItem) {
    throw new HttpError(404, `Menu Item with id ${id} does not exist`);
  }

  await db.menuItem.delete({ where: { id } });
}
