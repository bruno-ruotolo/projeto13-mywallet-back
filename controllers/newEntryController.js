import chalk from "chalk";
import dayjs from "dayjs";
import db from "../db.js";

export async function newEntry(req, res) {
  const reqBody = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();

  let valueCents = reqBody.value;

  if (!valueCents.includes(",")) {
    valueCents = valueCents + ",00";
  } else if (valueCents.split(",")[1].length < 2) {
    valueCents = valueCents + "0"
  } else {
    valueCents = valueCents;
  }

  console.log(valueCents);

  try {
    const session = await db.collection("sessions").findOne({ token });

    await db.collection("transactions").insertOne({
      ...reqBody,
      value: valueCents,
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