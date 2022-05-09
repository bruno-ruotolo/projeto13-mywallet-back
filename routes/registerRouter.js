import { Router } from "express";

import { registerUser } from "../controllers/registerController.js";
import { registerSchema } from "../schemas/registerSchema.js";

const registerRouter = Router();

registerRouter.post("/sign-up", registerSchema, registerUser);

export default registerRouter;