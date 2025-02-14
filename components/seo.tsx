import { DefaultSeo } from "next-seo";

const config = {
  title: "Anurag Anand",
  description: "Software Engineer and UG at IIT Kharagpur",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anuraganand.vercel.app",
    site_name: "Anurag Anand",
    images: [
      {
        url: "https://anuraganand.vercel.app/og.png",
        alt: "Anurag Anand",
      },
    ],
  },
  linkedin: {
    handle: "Anurag Anand",
    url: "https://www.linkedin.com/in/anurag-anand-929471250/",
    cardType: "summary_large_image",
  },
};

export default function SEO() {
  return <DefaultSeo {...config} />;
}
