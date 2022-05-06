import { Router } from "express";

import { newEntry } from "../controllers/newEntryController.js"

const newEntryRouter = Router();

newEntryRouter.post("/new-entry", newEntry);

export default newEntryRouter;