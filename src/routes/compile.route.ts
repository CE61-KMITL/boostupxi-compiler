import { Router } from "express";
import { add_request_to_queue } from "../controllers/compile.controller";
import { validate } from "../middlewares/validate.middleware";
import { compileSchema } from "../schema/compile.schema";
import { authorization } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authorization, validate(compileSchema), add_request_to_queue);

export { router as compileRouter };
