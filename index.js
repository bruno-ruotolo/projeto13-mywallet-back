import express from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";

import { registerUser } from "./controllers/registerController.js";
import { loginUser } from "./controllers/loginController.js";
import { getHome, logout } from "./controllers/homeController.js";
import { newEntry } from "./controllers/newEntryController.js";

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
app.put("/home", logout);

//new entry
app.put("/new-entry", newEntry);

//open server
app.listen(process.env.PORT, () => console.log(chalk.green.bold("Server ON")));