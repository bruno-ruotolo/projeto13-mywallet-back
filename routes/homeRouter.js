import { Router } from "express";

import { getHome, logout } from "../controllers/homeController.js";
import { userTokenMiddleware } from "../middlewares/userTokenMiddleware.js";

const homeRouter = Router();

homeRouter.get("/home", userTokenMiddleware, getHome);
homeRouter.put("/home", userTokenMiddleware, logout);

export default homeRouter;