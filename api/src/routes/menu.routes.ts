import express from "express";
import * as MenuController from "../controllers/menu.controller";

const router = express.Router();

router.get("/", MenuController.listMenuItems);
router.get("/details", MenuController.getMenuItemsDetails);
router.post("/", MenuController.createMenuItem);
router.put("/:id", MenuController.updateMenuItem);
router.delete("/:id", MenuController.deleteMenuItem);

export default router;
