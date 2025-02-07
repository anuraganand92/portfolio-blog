import Image from "next/image";
import { NextSeo } from "next-seo";

import Link from "components/Link";
import Section from "components/Section";
import Workplaces from "components/Workplaces";

import itsoLogo from "public/projects/itsoLogo.png";
import synthaxLogo from "public/projects/synthax-logo.png";
import avatar from "public/avatar.jpg";
import { ActivityType } from "components/Activity";

export const connectLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/anurag-anand-929471250/" },
  { label: "Email", href: "mailto:anuragsr26@gmail.com" },
  { label: "GitHub", href: "https://github.com/anuraganand92" },
];

const workplaces = [
  {
    title: "R&D Engineer Intern",
    description: "ITSO",
    time: "May 2024 - Jul 2024",
    imageSrc: itsoLogo,
    link: "https://itso.co.jp",
  },
  {
    title: "Software Engineer Intern",
    description: "Synthax AI",
    time: "Nov 2023 - Dec 2023",
    imageSrc: synthaxLogo,
    link: "https://synthax.ai",
  },
];

// const sideProjects = [
//   {
//     title: "Shape",
//     description: "A calendar for your workouts",
//     imageSrc: shapeLogo,
//     link: "https://shapecalendar.com",
//   },
  
// ];

const seoTitle = "About | Anurag Anand";
const seoDesc =
  "Student at IIT Kharagpur and Software Engineer particularly working in applied AI and low-latency systems.";

export default function About({
  lastActivity,
}: {
  lastActivity: ActivityType;
}) {
  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDesc}
        openGraph={{
          title: seoTitle,
          description: seoDesc,
          url: `https://anuraganand.vercel.app/about/`,
          site_name: "Anurag Anand",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <div className="flex flex-col gap-16 md:gap-24">
        <div className="-mb-8 sm:hidden animate-in">
          <Image
            src={avatar}
            width={48}
            height={48}
            alt="avatar of Anurag Anand"
          />
        </div>
        <div
          className="flex flex-col gap-16 animate-in sm:animate-none md:gap-12"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <Section heading="About me" headingAlignment="right">
            <div className="flex flex-col gap-6">
              <p>
                <em className="font-semibold">Hi there!</em>&nbsp; I’m Anurag, a student at IIT Kharagpur and a software 
                engineer specializing in applied AI. I focus on building intelligent, scalable AI solutions, 
                particularly in LLMs, deep learning, and real-world AI applications. I have worked extensively
                 with Python, developing, optimizing, and deploying large-scale AI systems.
              </p>
              <p>
                Beyond AI, I’m passionate about high-performance and low-latency software engineering, 
                especially in C++. I explore performance optimization, memory management, and real-time
                 systems, frequently sharing my insights through blogs. While I’ve worked on 
                 cutting-edge AI projects, my long-term goal is to specialize in low-latency 
                 system development.
              </p>
              <p>
                If you share similar interests or have exciting ideas to discuss, feel free to 
                connect!
              </p>
            </div>
          </Section>
          <Section heading="Connect" headingAlignment="right">
            <ul className="flex gap-6 animated-list">
              {connectLinks.map((link) => (
                <li className="transition-opacity" key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </Section>
          <Section heading="Experience" headingAlignment="right">
            <div className="flex flex-col gap-6">
              <p>
                My previous internship was at{" "}
                <Link href="https://itso.co.jp">ITSO</Link> working on automating corporate solutions. 
                Before that I interned at <Link href="https://synthax.ai">Synthax AI</Link>{" "}
                working on creating AI-based healthcare consultation.{" "}
              </p>
            </div>
          </Section>
          
          <Section heading="" headingAlignment="right">
            <div className="flex flex-col w-full gap-8">
              {/* <p>
                {new Date().getFullYear() - 2025}+ years of experience working
                in engineering.
              </p> */}
              <Workplaces items={workplaces} />
            </div>
          </Section>
          {/* <Section heading="Side projects" headingAlignment="right">
            <div className="flex flex-col w-full gap-8">
              <p>I enjoy hacking on the side.</p>
              <Workplaces items={sideProjects} />
            </div>
          </Section> */}
        </div>
      </div>
    </>
  );
}

// export const getStaticProps = async () => {
//   const activities: ActivityType[] = await getActivities();
//   const lastNonVirtualActivityWithPhoto = activities
//     .filter((activity) =>
//       [
//         "Run",
//         "TrailRun",
//         "Bike",
//         "Ride",
//         "Swim",
//         "Hike",
//         "GravelRide",
//         "NordicSki",
//       ].includes(activity.sport_type)
//     )
//     .find((activity) => activity.total_photo_count > 0);
//   const activity = await getActivity(
//     lastNonVirtualActivityWithPhoto?.id as number
//   );
//   return {
//     props: {
//       lastActivity: activity,
//     },
//     revalidate: 3600,
//   };
// };
