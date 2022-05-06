import { Router } from "express";

import { newEntry } from "../controllers/newEntryController.js"
import { validNewEntryJoi } from "../middlewares/newEntryJoiMiddeware.js";
import { validHeaderToken } from "../middlewares/userTokenMiddleware.js";

const newEntryRouter = Router();

newEntryRouter.post("/new-entry", validHeaderToken, validNewEntryJoi, newEntry);

export default newEntryRouter;