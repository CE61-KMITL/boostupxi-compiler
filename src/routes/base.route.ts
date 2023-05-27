import { Router } from "express";
import { getHello } from "../controllers/base.controller";

const router = Router();

router.get("/", getHello);

export { router as baseRouter };
