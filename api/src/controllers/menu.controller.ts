import { Request, Response, NextFunction } from "express";
import dayjs from "dayjs";
import * as MenuService from "../services/menu.service";
import { HttpError } from "../errors/HttpError";
import {
  CreateMenuItemSchema,
  Menu,
  MenuItemId,
  MenuSummary,
  UpdateMenuItemSchema,
} from "../validators/menu.validator";

export async function listMenuItems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const startDate =
      String(req.query.startDate) ||
      dayjs().subtract(7, "day").format("YYYY-MM-DD");
    const endDate =
      String(req.query.endDate) || dayjs().add(7, "day").format("YYYY-MM-DD");

    if (!dayjs(startDate).isValid()) {
      throw new HttpError(400, `Start date is not a valid date`);
    }
    if (!dayjs(endDate).isValid()) {
      throw new HttpError(400, `End date is not a valid date`);
    }

    const menuItemsByDays: MenuSummary = await MenuService.menuSummaryByDateRange(
      req.user?.id!,
      {
        startDate: dayjs(startDate).hour(0).toDate(),
        endDate: dayjs(endDate).hour(0).toDate(),
      }
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
    const date = String(req.query.date) || dayjs().format("YYYY-MM-DD");

    if (!dayjs(date).isValid()) {
      throw new HttpError(400, `Date is not a valid date`);
    }

    const menuItems: Menu = await MenuService.menuItemsByDate(
      req.user?.id!,
      dayjs(date).hour(0).toDate()
    );
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
    if (!dayjs(date).isValid()) {
      throw new HttpError(400, `Date is not a valid date`);
    }

    req.body.date = dayjs(date).hour(0).toDate();
    const menuItemData = CreateMenuItemSchema.parse(req.body);

    const menuItem: MenuItemId = await MenuService.createMenuItem(
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
