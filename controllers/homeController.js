import chalk from "chalk";

import db from "../db.js";

export async function getHome(req, res) {
  const { session } = res.locals;

  try {
    const userTransactions = await db.collection("transactions").find({ userId: session.userId }).toArray();
    res.status(200).send(userTransactions);
  } catch (e) {
    res.status(500).send(chalk.red.bold(e));
  }
}

export async function logout(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();

  try {
    const sessions = await db.collection("sessions");
    sessions.updateOne({
      token
    }, { $set: { status: false } })

    res.sendStatus(201);
  } catch (e) {
    res.status(500).send(chalk.red.bold(e));
  }
}