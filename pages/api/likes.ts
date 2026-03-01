import { NextApiRequest, NextApiResponse } from "next";
import { getDb, saveDb } from "../../lib/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const slug = req.query.slug as string;
    if (!slug) {
        return res.status(400).json({
            message: "Article slug not provided",
        });
    }

    const db = getDb();
    if (!db.likes) db.likes = {};

    if (req.method === "POST") {
        const action = req.body?.action || "like";
        if (action === "unlike") {
            db.likes[slug] = Math.max(0, (db.likes[slug] || 0) - 1);
        } else {
            db.likes[slug] = (db.likes[slug] || 0) + 1;
        }
        saveDb(db);
        return res.status(200).json({ likes: db.likes[slug] });
    } else if (req.method === "GET") {
        return res.status(200).json({ likes: db.likes[slug] || 0 });
    }

    return res.status(405).json({ message: "Method not allowed" });
}
