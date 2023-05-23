import { Router } from "express";
import { getHello } from "../controllers/base.controller.js";

const router = Router();

router.get("/", getHello);

export { router as baseRouter };
