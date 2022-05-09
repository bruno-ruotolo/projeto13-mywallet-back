import { Router } from "express";

import { loginUser } from "../controllers/loginController.js";
import { loginSchema } from "../schemas/loginSchema.js";

const loginRouter = Router();

loginRouter.post("/sign-in", loginSchema, loginUser);

export default loginRouter;