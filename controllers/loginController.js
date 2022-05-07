import joi from "joi";
import bcrypt from "bcrypt";
import chalk from "chalk";
import { v4 as uuid } from "uuid";

import db from "../db.js"

export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.collection("registeredUsers").findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      await db.collection("sessions").insertOne({
        userId: user._id,
        status: true,
        token
      });

      res.status(200).send({ token, email: user.email, name: user.name });

    } else {
      res.status(400).send("Usuario/senha invalida");
    }

  } catch (e) {
    console.log(chalk.red.bold(e))
    res.sendStatus(500);
  }
}