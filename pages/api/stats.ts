import type { NextApiRequest, NextApiResponse } from "next";
import { pick } from "@contentlayer/client";
import { getMentionsForSlug } from "lib/webmentions";
import { allPosts } from ".contentlayer/generated";
import { getDb } from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = getDb();

  const posts = allPosts.map((post) =>
    pick(post, ["slug", "title", "publishedAt", "image", "tags", "summary"])
  );
  const postsWithLikes = await Promise.all(
    posts
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
      .map(async (post) => {
        // Fetch webmentions
        const numberOfmentions = await getMentionsForSlug(post.slug);

        const faunaLikes = db.likes?.[post.slug] || 0;
        const totalLikes = faunaLikes + (numberOfmentions || 0);

        const faunaViews = db.hits?.[post.slug] || 0;

        return {
          ...post,
          id: post.slug,
          likes: totalLikes,
          views: faunaViews,
        };
      })
  );

  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");
  res.status(200).json({ posts: postsWithLikes });
}
