import { Router } from "express";

import { loginUser } from "../controllers/loginController.js";
import { validLoginJoi } from "../middlewares/loginJoiMiddleware.js";

const loginRouter = Router();

loginRouter.post("/sign-in", validLoginJoi, loginUser);

export default loginRouter;