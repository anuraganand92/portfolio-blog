import { GetStaticProps } from "next";
import { allPosts, allProjects, Post, Project } from ".contentlayer/generated";
import { pick } from "@contentlayer/client";

import Link from "components/Link";
import Section from "components/Section";
import PostList from "components/postlist";

import BitrefillGraphic from "components/projects/BitrefillGraphic";
import TrailRoutesGraphic from "components/projects/TrailRoutesGraphic";
import TracklibGraphic from "components/projects/TracklibGraphic";

type HomeProps = {
  posts: Post[];
  projects: Project[];
};

export default function Home({ posts, projects }: HomeProps) {
  return (
    <>
      <div className="flex flex-col gap-16 md:gap-24"> {/* Reduced gap */}
        <div>
          <h1 className="animate-in text-4xl">Hi! I&apos;m Anurag</h1>
          <br/>
          <p
            className="text-secondary animate-in"
            style={{ "--index": 1 } as React.CSSProperties}
          >
            I am a student at IIT Kharagpur and a software engineer focused on applied AI, 
            with experience particularly in NLP and LLMs, with strong interest in AI research and 
            high-performance computing.
          </p>
          <br/>
          <p
            className="text-secondary animate-in"
            style={{ "--index": 1 } as React.CSSProperties}
          >
            My previous internship was at{" "}
            <Link href="https://itso.co.jp">ITSO Japan</Link> working on automating corporate solutions. 
            Before that I interned at <Link href="https://synthax.ai">Synthax AI</Link>{" "}
            working on creating AI-based healthcare consultation.{" "}
          </p>
        </div>
        {/* <div
          className="flex flex-col gap-4 animate-in"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <h2>Selected projects</h2>
          <ul className="flex flex-col gap-16">
            {projects.map((project) => (
              <li key={project.title}>
                <Section heading={project.time}>
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                      <h3>{project.title}</h3>
                      <p className="text-secondary">{project.description}</p>
                      <Link href={`/project/${project.slug}`} underline>
                        Read case study
                      </Link>
                    </div>
                    <Link href={`/project/${project.slug}`}>
                      {project.slug === "tracklib" && <TracklibGraphic />}
                      {project.slug === "bitrefill" && <BitrefillGraphic />}
                      {project.slug === "trailroutes" && <TrailRoutesGraphic />}
                    </Link>
                  </div>
                </Section>
              </li>
            ))}
          </ul>
        </div> */}
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
    .filter((_, i) => i < 4)
    .map((post) => pick(post, ["slug", "title", "publishedAt", "image"]));

  const projects = allProjects.map((post) =>
    pick(post, ["slug", "title", "description", "time"])
  );

  return {
    props: { posts, projects },
  };
};
