import chalk from "chalk";

import db from "../db.js";

export async function getHome(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();

  if (!token) return res.sendStatus(401)

  //TEM QUE SALVAR AS transactions COM O _ID DO USUARIO REGISTRADO NO "REGISTEREDUSER"

  try {
    const session = await db.collection("sessions").findOne({ token, status: true });

    if (!session) return res.status(401).send("Token Inexistente ou Inspirado")

    console.log(session);

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
    const session = await sessions.findOne({ token, status: true });
    if (!session) return res.status(401).send(("Token Invalido ou Inspirado"));
    sessions.updateOne({
      token
    }, { $set: { status: false } })

    res.sendStatus(201);
  } catch (e) {
    res.status(500).send(chalk.red.bold(e));
  }
}