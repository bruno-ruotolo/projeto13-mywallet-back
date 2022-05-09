import { Router } from "express";

import { newEntry, newExit } from "../controllers/transactionsController.js"
import { transactionsSchema } from "../schemas/transactionsSchema.js";
import { userTokenMiddleware } from "../middlewares/userTokenMiddleware.js";

const transactionsRouter = Router();

transactionsRouter.post("/new-entry", userTokenMiddleware, transactionsSchema, newEntry);
transactionsRouter.post("/new-exit", userTokenMiddleware, transactionsSchema, newExit);

export default transactionsRouter;