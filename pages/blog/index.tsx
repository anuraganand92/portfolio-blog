import { pick } from "@contentlayer/client";
import { allPosts, Post } from ".contentlayer/generated";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import PostList from "components/postlist";
import Input from "components/input";
import { useState } from "react";
import { IconSearch } from "components/Icons";

const seoTitle = "Blog | Anurag";
const seoDesc =
  "I write about deep level technical stuff, mostly in software engineering and applied AI";

type BlogProps = {
  posts: Post[];
};

export default function Blog({ posts }: BlogProps) {
  const [search, setSearch] = useState("");
  const filteredPosts = posts.filter(({ title, summary, tags }) => {
    const searchString = `${title.toLowerCase()} ${summary.toLowerCase()} ${tags?.join(
      " "
    )}`;
    return searchString.includes(search.toLowerCase());
  });

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDesc}
        openGraph={{
          title: seoTitle,
          url: `https://anuraganand.vercel.app/blog/`,
          description: seoDesc,
          site_name: "Anurag Anand",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <div className="flex flex-col gap-20">
        <div className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-2">
            <h1 className="animate-in">Blog</h1>
            <p
              className="text-secondary animate-in"
              style={{ "--index": 1 } as React.CSSProperties}
            >
              I write about deep level technical stuff, mostly in software engineering and applied AI
            </p>
          </div>
          <div
            className="animate-in"
            style={{ "--index": 2 } as React.CSSProperties}
          >
            <Input
              id="search"
              type="search"
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              pfix={<IconSearch className="w-5 h-5 text-secondary" />}
            />
          </div>
        </div>
        <div
          className="animate-in"
          style={{ "--index": 3 } as React.CSSProperties}
        >
          <PostList posts={filteredPosts} />
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = allPosts
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .map((post) =>
      pick(post, ["slug", "title", "summary", "publishedAt", "image"])
    );

  return {
    props: { posts },
  };
};
