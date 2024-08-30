import type { Metadata } from "next";
import dynamic from "next/dynamic";

const Messages = dynamic(
  () => import("@/screens").then((mod) => mod.Messages),
  {
    ssr: false,
  },
);

export const metadata: Metadata = {
  title: "HBD • som",
  description:
    "Borne out of my technical and intellectual dexterity, this website servers as a memoir of my love, wait, hope, despair, anger and apathy. তুমি ক্রোধের আগুনে জমে থাকা ব্যথা, আমার শেষ বিকেলের ধোঁকা। কোনো রোদেলা দুপুরে তোমায় ফিরে পাবো বলে, অর্থহীন খোঁজা। with ❤️ for love by sanam",
  generator: "Next.js",
  applicationName: "rp",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "GSAP",
    "Howler",
    "Swiper",
    "Birthday",
    "UI",
    "UX",
    "Love",
    "Memoir",
  ],
  authors: [
    { name: "Manas Pratim Biswas", url: "https://manaspratimbiswas.com" },
  ],
  creator: "Manas Pratim Biswas",
  publisher: "Manas Pratim Biswas",

  openGraph: {
    title: "HBD • som",
    description: "with ❤️ for love by sanam",
    url: "https://som.manaspratimbiswas.com",
    siteName: "som",
    images: [
      {
        url: "https://raw.githubusercontent.com/sanam2405/sanam2405/main/assets/images/som/opengraph-image.jpg",
        width: 800,
        height: 600,
      },
      {
        url: "https://raw.githubusercontent.com/sanam2405/sanam2405/main/assets/images/som/opengraph-image.jpg",
        width: 1800,
        height: 1600,
        alt: "som",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "som",
    description: "with ❤️ for love by sanam",
    creator: "@sanam2405",
    images: {
      url: "https://raw.githubusercontent.com/sanam2405/sanam2405/main/assets/images/som/opengraph-image.jpg",
      alt: "som",
    },
  },

  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function KigoTumi() {
  return (
    <>
      <Messages />
    </>
  );
}
