import chalk from "chalk";
import dayjs from "dayjs";
import db from "../db.js";

export async function newEntry(req, res) {
  const reqBody = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();

  try {
    const session = await db.collection("sessions").findOne({ token });

    await db.collection("transactions").insertOne({
      ...reqBody,
      userId: session.userId,
      date: dayjs().format("DD/MM"),
      status: true
    });

    res.sendStatus(201);

  } catch (e) {
    console.log(chalk.red.bold(e));
    res.sendStatus(500);
  }
}