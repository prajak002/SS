import { Myxomycete } from "@/components";
import type { Metadata } from "next";

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
    { name: "Prajak Sen"}
  ],
  creator: "Manas Pratim Biswas",
  publisher: "Manas Pratim Biswas",

  openGraph: {
    title: "HBD • som",
    description: "with ❤️ for love by  Prajak",
        locale: "en_US",
    type: "website",
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

export default function Ilu() {
  return <Myxomycete />;
}
