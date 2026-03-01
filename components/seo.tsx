import { DefaultSeo } from "next-seo";

const config = {
  defaultTitle: "Anurag Anand | Software Engineer at Apple | IIT Kharagpur",
  titleTemplate: "%s | Anurag Anand",
  description: "Anurag Anand is a Software Engineer at Apple, specializing in NLP and LLMs. B.Tech graduate from IIT Kharagpur. Previously an Applied Scientist intern at Amazon.",
  canonical: "https://anuraganand.dev/",
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "https://anuraganand.dev",
    site_name: "Anurag Anand",
    title: "Anurag Anand | Software Engineer at Apple | IIT Kharagpur",
    description: "Anurag Anand is a Software Engineer at Apple, specializing in NLP and LLMs. B.Tech graduate from IIT Kharagpur.",
    profile: {
      firstName: "Anurag",
      lastName: "Anand",
      username: "anuraganand92",
    },
    images: [
      {
        url: "https://anuraganand.dev/og.png",
        width: 1200,
        height: 630,
        alt: "Anurag Anand Preview",
      },
    ],
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content: "Anurag Anand, Software Engineer, Apple, IIT Kharagpur, NLP, LLM, Machine Learning, Applied AI, Amazon, Portfolio",
    },
    {
      name: "author",
      content: "Anurag Anand",
    },
  ],
  twitter: {
    handle: "@anurag_anand",
    site: "@anurag_anand",
    cardType: "summary_large_image",
  },
  linkedin: {
    handle: "Anurag Anand",
    url: "https://www.linkedin.com/in/anurag-anand-929471250/",
    cardType: "summary_large_image",
  },
  github: {
    handle: "anuraganand92",
    url: "https://github.com/anuraganand92",
    cardType: "summary_large_image",
  },
};

export default function SEO() {
  return <DefaultSeo {...config} />;
}
