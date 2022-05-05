import chalk from "chalk";

import db from "../db.js";

export async function getHome(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();

  if (!token) return res.status(401).send("first");

  try {
    const session = await db.collection("sessions").findOne({ token });

    if (!session) return res.status(401).send("Second");

    const userEntrys = await db.collection("entrys").find({ userId: session.userId }).toArray();

    res.status(200).send(userEntrys);
  } catch (e) {
    res.status(500).send(chalk.red.bold(e));
  }

}