import { Router } from "express";

import { newExit } from "../controllers/newExitController.js"
import { validTransactionJoi } from "../middlewares/transactionsJoiMiddeware.js";
import { validHeaderToken } from "../middlewares/userTokenMiddleware.js";

const newExitRouter = Router();

newExitRouter.post("/new-exit", validHeaderToken, validTransactionJoi, newExit);

export default newExitRouter;