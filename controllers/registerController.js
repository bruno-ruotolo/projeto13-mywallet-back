import joi from "joi";
import bcrypt from "bcrypt";

import db from "../db.js";

export async function registerUser(req, res) {
  const { name, email, password, passwordConfirm } = req.body;

  const signUpBody = {
    name,
    email,
    password,
    passwordConfirm
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  delete signUpBody.passwordConfirm;

  try {
    const participantExist = await db.collection("registeredUsers").findOne({ email });
    if (participantExist) return res.status(409).send("Usuario já existente");

    await db.collection("registeredUsers").insertOne({
      ...signUpBody,
      password: passwordHash
    });
    res.sendStatus(201);

  } catch (e) {
    console.log(chalk.red.bold(e));
    res.status(500).send(e);
  }
}