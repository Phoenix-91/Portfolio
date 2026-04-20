import type { Metadata } from "next";
import { Syne, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Paramveer Rana — Full Stack Developer",
  description:
    "Portfolio of Paramveer Rana — Full Stack Developer (MERN), BCA student at Chandigarh University. Specializing in React, Node.js, MongoDB and AI-powered applications.",
  keywords: [
    "Paramveer Rana",
    "Full Stack Developer",
    "MERN Stack",
    "React Developer",
    "Portfolio",
    "Chandigarh University",
  ],
  authors: [{ name: "Paramveer Rana" }],
  openGraph: {
    title: "Paramveer Rana — Full Stack Developer",
    description:
      "Building scalable web apps, AI-powered tools, and real-world solutions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@paramveer_91",
    title: "Paramveer Rana — Full Stack Developer",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${syne.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
