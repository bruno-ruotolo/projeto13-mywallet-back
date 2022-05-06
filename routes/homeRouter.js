import { Router } from "express";

import { getHome, logout } from "../controllers/homeController.js";
import { validHeaderToken } from "../middlewares/userTokenMiddleware.js";

const homeRouter = Router();

homeRouter.get("/home", validHeaderToken, getHome);
homeRouter.put("/home", validHeaderToken, logout);

export default homeRouter;