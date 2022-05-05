import express from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";

import { registerUser } from "./controllers/registerController.js";
import { loginUser } from "./controllers/loginController.js";
import { getHome } from "./controllers/homeController.js";

//express config
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

//sign-up route
app.post("/sign-up", registerUser);

//sign-in route
app.post("/sign-in", loginUser);

//home route
app.get("/home", getHome);

//open server
app.listen(process.env.PORT, () => console.log(chalk.green.bold("Server ON")));