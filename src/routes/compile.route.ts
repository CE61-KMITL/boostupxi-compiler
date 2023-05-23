import { Router } from "express";
import { compile } from "../controllers/compile.controller.js";

const router = Router();

router.post("/", compile);

export { router as compileRouter };
