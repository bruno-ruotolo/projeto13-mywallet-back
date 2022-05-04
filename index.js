import joi from "joi";
import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
dotenv.config();

//express config
const app = express();
app.use(express.json());
app.use(cors());

//mongodb configs
let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URI);
const promise = mongoClient.connect();

promise.then(() => {
  console.log(chalk.blue.bold("Data Base ON"));
  db = mongoClient.db(process.env.MONGO_DB);
});
promise.catch((e) => console.log(chalk.red.bold("Data Base OUT", e)));


//sign-up route
app.post("/sign-up", async (req, res) => {
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
    password: joi.string().required(),
    passwordConfirm: joi.string().required()
  });

  const { error } = signUpSchema.validate(signUpBody);

  if (error) {
    res.status(422).send(error.details.map(error => error.message));
    return;
  }

  if (passwordConfirm !== password) {
    res.status(422).send("As senhas devem ser iguais");
    return;
  }

  try {
    const participantExist = await db.collection("registeredUsers").findOne({ email });

    if (participantExist) {
      res.status(409).send("Usuario já existente");
      return;
    }

    await db.collection("registeredUsers").insertOne(signUpBody);
    res.sendStatus(201);

  } catch (e) {
    console.log(chalk.red.bold(e));
    res.status(500).send(e);
  }
})

app.listen(process.env.PORT, () => console.log(chalk.green.bold("Server ON")));