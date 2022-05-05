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

  const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\d)[A-Za-z\d]{6,}$/).required(),
    passwordConfirm: joi.ref("password")
  });

  const { error } = signUpSchema.validate(signUpBody);
  if (error) return res.status(422).send(error.details.map(error => error.message));

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