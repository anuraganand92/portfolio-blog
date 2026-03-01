import { NextApiRequest, NextApiResponse } from "next";
import { getDb, saveDb } from "../../lib/db";

type Data = {
  message?: string;
  hits?: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const slug = req.query.slug as string;
  if (!slug) {
    return res.status(400).json({
      message: "Article slug not provided",
    });
  }

  const db = getDb();
  if (!db.hits) db.hits = {};

  db.hits[slug] = (db.hits[slug] || 0) + 1;
  saveDb(db);

  return res.status(200).json({
    hits: db.hits[slug],
  });
}
