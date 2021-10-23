import { Request, Response, NextFunction } from "express";
import dayjs from "dayjs";
import * as MenuService from "../services/menu.service";
import {
  CreateMenuItemSchema,
  GetMenuItemsDetailsFilterSchema,
  ListMenuItemsFilterSchema,
  UpdateMenuItemSchema,
} from "../validators/menu.validator";

export async function listMenuItems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const defaultStartDate = dayjs().subtract(7, "day").format("YYYY-MM-DD");
    const defaultEndDate = dayjs().add(7, "day").format("YYYY-MM-DD");
    const { startDate = defaultStartDate, endDate = defaultEndDate } =
      ListMenuItemsFilterSchema.parse(req.query);

    const menuItemsByDays = await MenuService.menuItemsOverviewByDateRange(
      req.user?.id!,
      { startDate, endDate }
    );
    res.status(200).json(menuItemsByDays);
  } catch (error) {
    next(error);
  }
}

export async function getMenuItemsDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const defaultDate = dayjs().format("YYYY-MM-DD");
    const { date = defaultDate } = GetMenuItemsDetailsFilterSchema.parse(
      req.query
    );

    const menuItems = await MenuService.getMenuItemsByDate(req.user?.id!, date);
    res.status(200).json(menuItems);
  } catch (error) {
    next(error);
  }
}

export async function createMenuItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { date } = req.body;
    if (date) {
      req.body.date = dayjs(date).hour(0).toDate();
    }
    const menuItemData = CreateMenuItemSchema.parse(req.body);

    const menuItem = await MenuService.createMenuItem(
      req.user?.id!,
      menuItemData
    );

    res.status(201).json(menuItem);
  } catch (error) {
    next(error);
  }
}

export async function updateMenuItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const menuItemId = Number(req.params.id);
    const menuItemData = UpdateMenuItemSchema.parse(req.body);

    await MenuService.updateMenuItemById(
      req.user?.id!,
      menuItemId,
      menuItemData
    );

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

export async function deleteMenuItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const menuItemId = Number(req.params.id);

    await MenuService.deleteMenuItemById(req.user?.id!, menuItemId);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}
