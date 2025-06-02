import { Router } from "express";
import itemController from "./controllers/itemController";
const router = Router();

router.use("/items", itemController);

export default router;
