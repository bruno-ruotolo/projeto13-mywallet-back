import express from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";

import registerRouter from "./routes/registerRouter.js";
import loginRouter from "./routes/loginRouter.js";
import homeRouter from "./routes/homeRouter.js";
import transactionsRouter from "./routes/transactionsRouter.js";

//express config
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

//routes
app.use(registerRouter);
app.use(loginRouter);
app.use(homeRouter)
app.use(transactionsRouter)

//open server
app.listen(process.env.PORT, () => console.log(chalk.green.bold("Server ON" + process.env.PORT)));