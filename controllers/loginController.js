import joi from "joi";
import bcrypt from "bcrypt";
import chalk from "chalk";

import db from "../db.js"

export async function loginUser(req, res) {
  const { email, password } = req.body;

  const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
  });

  const { error } = loginSchema.validate({ email, password });

  if (error) return res.status(422).send(error.details.map(error => error.message));

  try {
    const user = await db.collection("registeredUsers").findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      delete user.password;
      delete user._id

      res.status(200).send(user);
    } else {
      res.status(400).send("Usuario/senha invalida");
    }

  } catch (e) {
    console.log(chalk.red.bold(e))
    res.sendStatus(500);
  }
}