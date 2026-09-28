import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pavan-kumar-portfolio-jet.vercel.app"),

  title: "Pavan Kumar B P — Security Engineering",

  description:
    "Entry-level cybersecurity analyst focused on security operations, detection engineering and secure systems. Azure SOC monitoring, Mini-SIEM, and secure cloud file sharing case studies.",

  openGraph: {
    title: "Pavan Kumar B P — Security Engineering",
    description:
      "Building systems that detect and protect. Security operations, detection engineering, secure systems.",
    url: "https://pavan-kumar-portfolio-jet.vercel.app",
    siteName: "Pavan Kumar B P — Security Engineering",
    type: "website",
    images: [
      {
        url: "/avatar.png",
        width: 512,
        height: 512,
        alt: "Pavan Kumar B P — Cybersecurity Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary",
    title: "Pavan Kumar B P — Security Engineering",
    description:
      "Building systems that detect and protect. Security operations, detection engineering and secure systems.",
    images: ["/avatar.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-base text-ink font-sans antialiased selection:bg-accent selection:text-base">
        {children}
      </body>
    </html>
  );
}