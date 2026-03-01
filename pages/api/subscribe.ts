import type { NextApiRequest, NextApiResponse } from "next";
import { getDb, saveDb } from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body || {};

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const db = getDb();
    if (!db.subscribers) db.subscribers = [];
    if (!db.subscribers.includes(email)) {
      db.subscribers.push(email);
      saveDb(db);
    }

    return res.status(201).json({ error: "" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
}
