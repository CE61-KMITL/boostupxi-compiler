import { Router } from "express";
import { compile } from "../controllers/compile.controller";
import { validate } from "../middleware/validate.middleware";
import { compileSchema } from "../schema/compile.schema";
import { authorization } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authorization, validate(compileSchema), compile);

export { router as compileRouter };
