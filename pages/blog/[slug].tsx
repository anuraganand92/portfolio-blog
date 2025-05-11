import { pick } from "@contentlayer/client";
import { useMDXComponent } from "next-contentlayer/hooks";
import { allPosts, Post as PostType } from ".contentlayer/generated";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

import { formatDate } from "lib/formatdate";
import HitCounter from "components/hitcounter";
import PostList from "components/postlist";
import Image from "next/image";
import NewsletterInput from "components/NewsletterInput";
import Tags from "components/tags";
import LikeButton from "components/likebutton";
import MDXComponents from "components/MDXComponents";
import Parallax from "components/blog/parallax";
import Link from "next/link";

type PostProps = {
  post: PostType;
  related: PostType[];
};

export default function Post({ post, related }: PostProps) {
  const Component = useMDXComponent(post.body.code);

  return (
    <>
      <NextSeo
        title={`${post.title} | Anurag Anand`}
        description={post.summary}
        canonical={`https://anuraganand.vercel.app/blog/${post.slug}`}
        openGraph={{
          title: post.title,
          description: post.summary,
          url: `https://anuraganand.vercel.app/blog/${post.slug}`,
          images: [
            {
              url: post.og || post.image,
              alt: post.title,
            },
          ],
        }}
      />

      <div className="flex flex-col gap-20 animate-in">
        <article>
          <div className="h-8" />
          <div className="flex flex-col gap-3 animate-in">
            <h1 className="text-2xl font-semibold">{post.title}</h1>
            <p className="text-secondary">
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
              {post.updatedAt ? ` (Updated ${formatDate(post.updatedAt)})` : ""}{" "}
              <HitCounter slug={post.slug} />
            </p>
          </div>
          <div className="h-8" />
          <div className="prose prose-h2:text-lg prose-h2:mb-2 prose-h2:font-semibold">
            <Component components={MDXComponents} />
          </div>
        </article>

        <Tags tags={post.tags} />

        <div className="flex flex-col gap-4">
          <h3 className="text-xl">Subscribe</h3>
          <p className="text-secondary">
            Get an email when I write new posts. Learn deep level technical stuff, or some applied AI
          </p>
          <NewsletterInput />
        </div>

        {related.length ? (
          <div className="flex flex-col items-start gap-10">
            <h3 className="text-xl">Related posts</h3>
            <div className="will-change-transform">
              <PostList posts={related} />
            </div>
            <Link href="/blog">
              ← See all
            </Link>
          </div>
        ) : null}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allPosts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = allPosts.find((p) => p.slug === params?.slug);
  const related = allPosts
    .filter((p) => p.slug !== params?.slug)
    .filter((p) => p.tags?.some((tag) => post?.tags?.includes(tag)))
    .slice(0, 3)
    .map((p) => pick(p, ["slug", "title", "summary", "publishedAt", "image"]));

  return {
    props: {
      post,
      related,
    },
  };
};
