import { GetStaticProps } from "next";
import { allPosts, allProjects, Post, Project } from ".contentlayer/generated";
import { pick } from "@contentlayer/client";

import Link from "components/Link";
import Section from "components/Section";
import PostList from "components/postlist";
import Image from "next/image";
import appleLogo from "public/projects/apple.png";
import BitrefillGraphic from "components/projects/BitrefillGraphic";
import TrailRoutesGraphic from "components/projects/TrailRoutesGraphic";
import TracklibGraphic from "components/projects/TracklibGraphic";

type HomeProps = {
  posts: Post[];
  projects: Project[];
};

export const connectLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/anurag-anand-929471250/" },
  { label: "Email", href: "mailto:anuragsr26@gmail.com" },
  { label: "GitHub", href: "https://github.com/anuraganand92" },
];

export default function Home({ posts, projects }: HomeProps) {
  return (
    <>
      <div className="flex flex-col gap-12 md:gap-16">
        <div>
          <h1 className="animate-in text-4xl">Hi! I&apos;m Anurag</h1>
            <br/>
            <h2 className="animate-in text-2xl">
            Software Engineer at Apple{" "}
            <Image
              src={appleLogo}
              alt="Apple Logo"
              className="inline-block w-6 h-6 rounded-full align-middle"
            />
            </h2>
          <br/>

          <p
            className="text-secondary animate-in"
            style={{ "--index": 1 } as React.CSSProperties}
          >
            I am a software engineer at <Link href="https://apple.com">Apple</Link> with experience particularly in NLP and LLMs, with strong interest in
            applied AI and high-performance computing. I am a BTech graduate from IIT Kharagpur.
          </p>
          <br/>
          <p
            className="text-secondary animate-in"
            style={{ "--index": 1 } as React.CSSProperties}
          >
            I have previously interned at <Link href="https://amazon.com">Amazon</Link> as an Applied Scientist, along with two startups:{" "}
            <Link href="https://itso.co.jp">ITSO</Link> working on automating corporate solutions, and{" "}
            <Link href="https://synthax.ai">Synthax</Link>{" "}
            working on creating AI-based healthcare consultation.{" "}
          </p>
        </div>
        <div className="flex flex-col gap-12 md:gap-4">

          <h2 className="animate-in text-xl">Connect</h2>
            <ul className="flex gap-8 animated-list">
              {connectLinks.map((link) => (
                <li className="transition-opacity" key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
        </div>
        <div
          className="flex flex-col items-start gap-4 animate-in"
          style={{ "--index": 3 } as React.CSSProperties}
        >
          <h2>Selected posts</h2>
          <PostList posts={posts} />
          <Link href="/blog" className="items-start underline">
            See all →
          </Link>
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
    .filter((_, i) => i < 4) // Fetch the latest 4 posts
    .map((post) => pick(post, ["slug", "title", "publishedAt", "image"]));

  const projects = allProjects.map((post) =>
    pick(post, ["slug", "title", "description", "time"])
  );

  return {
    props: { posts, projects },
  };
};
