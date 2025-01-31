import { DefaultSeo } from "next-seo";

const config = {
  title: "Anurag Anand",
  description: "Software Engineer and UG at IIT Kharagpur",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://samuelkraft.com",
    site_name: "Samuel Kraft",
    images: [
      {
        url: "https://samuelkraft.com/og.jpg",
        alt: "Samuel Kraft",
      },
    ],
  },
  twitter: {
    handle: "@samuelkraft",
    site: "@samuelkraft",
    cardType: "summary_large_image",
  },
};

export default function SEO() {
  return <DefaultSeo {...config} />;
}
