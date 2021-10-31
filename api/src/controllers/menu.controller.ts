import { Request, Response, NextFunction } from "express";
import dayjs from "dayjs";
import * as MenuService from "../services/menu.service";
import {
  MenuSummaryQuery,
  MenuSummary,
  MenuDetailsQuery,
  Menu,
  CreateMenuItemBody,
  MenuItemId,
  UpdateMenuItemBody,
} from "../schema/menu.schema";

const parseFilterDate = (
  dateStr: string | undefined,
  defaultDate: dayjs.Dayjs
) => {
  const date = dateStr ? dayjs(dateStr) : defaultDate;
  return date.hour(0).minute(0).second(0).toDate();
};
const parseDate = (date: Date) =>
  dayjs(date).hour(0).minute(0).second(0).toDate();

export async function listMenuItems(
  req: Request<{}, {}, {}, MenuSummaryQuery>,
  res: Response,
  next: NextFunction
) {
  try {
    const { startDate, endDate } = req.query;

    const defaultStartDate = dayjs().subtract(7, "day");
    const defaultEndDate = dayjs().add(7, "day");

    const menuItemsByDays: MenuSummary = await MenuService.menuSummaryByDateRange(
      req.user?.id!,
      {
        startDate: parseFilterDate(startDate, defaultStartDate),
        endDate: parseFilterDate(endDate, defaultEndDate),
      }
    );

    res.status(200).json(menuItemsByDays);
  } catch (error) {
    next(error);
  }
}

export async function getMenuItemsDetails(
  req: Request<{}, {}, {}, MenuDetailsQuery>,
  res: Response,
  next: NextFunction
) {
  try {
    const defaultDate = dayjs().subtract(7, "day");

    const menuItems: Menu = await MenuService.menuItemsByDate(
      req.user?.id!,
      parseFilterDate(req.query.date, defaultDate)
    );

    res.status(200).json(menuItems);
  } catch (error) {
    next(error);
  }
}

export async function createMenuItem(
  req: Request<{}, CreateMenuItemBody>,
  res: Response,
  next: NextFunction
) {
  try {
    const data = { ...req.body, date: parseDate(req.body.date) };

    const menuItem: MenuItemId = await MenuService.createMenuItem(
      req.user?.id!,
      data
    );

    res.status(201).json(menuItem);
  } catch (error) {
    next(error);
  }
}

export async function updateMenuItem(
  req: Request<MenuItemId, {}, UpdateMenuItemBody>,
  res: Response,
  next: NextFunction
) {
  try {
    await MenuService.updateMenuItemById(
      req.user?.id!,
      req.params.id,
      req.body
    );

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

export async function deleteMenuItem(
  req: Request<MenuItemId>,
  res: Response,
  next: NextFunction
) {
  try {
    await MenuService.deleteMenuItemById(req.user?.id!, req.params.id);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}
