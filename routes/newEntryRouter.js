import { Router } from "express";

import { newEntry } from "../controllers/newEntryController.js"
import { validTransactionJoi } from "../middlewares/transactionsJoiMiddeware.js";
import { validHeaderToken } from "../middlewares/userTokenMiddleware.js";

const newEntryRouter = Router();

newEntryRouter.post("/new-entry", validHeaderToken, validTransactionJoi, newEntry);

export default newEntryRouter;