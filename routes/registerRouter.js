import { Router } from "express";

import { registerUser } from "../controllers/registerController.js";
import { validRegisterJoi } from "../middlewares/registerJoiMiddleware.js";

const registerRouter = Router();

registerRouter.post("/sign-up", validRegisterJoi, registerUser);

export default registerRouter;