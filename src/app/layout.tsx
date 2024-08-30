import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { AudioProvider, DarkModeProvider } from "@/context";
import { Layout } from "@/components";
import { CSSProperties } from "react";
import { Aura } from "@/components";

const inter = Inter({ subsets: ["latin"] });

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

const backgroundStyle: CSSProperties = {
  position: "relative",
  overflow: "hidden",
};

const backgroundOverlay: CSSProperties = {
  content: "",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: "url('/wordcloud.png')",
  backgroundSize: "cover",
  backgroundRepeat: "repeat-x repeat-y",
  backgroundPosition: "center top",
  zIndex: -1,
  opacity: 0.15,
  filter: "grayscale(100%) contrast(150%)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-wallpaper animate-fade-in" style={backgroundStyle}>
          <div style={backgroundOverlay}></div>
          <DarkModeProvider>
            <AudioProvider>
              {/* <Loader /> */}
              <Layout>
                <div className="w-full absolute inset-0 h-screen">
                  <Aura
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={100}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                  />
                </div>
                {children}
              </Layout>
            </AudioProvider>
          </DarkModeProvider>
        </div>
        <Analytics mode={"production"} />
        <SpeedInsights />
      </body>
    </html>
  );
}
