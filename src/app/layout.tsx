import type { Metadata } from "next";
import {
  Figtree,
  JetBrains_Mono,
} from "next/font/google";

import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const title =
  "repo·scope — GitHub Repository Search";

const description =
  "Search and explore public GitHub repositories by stars, language, topics, and freshness.";

export const metadata: Metadata = {
  title,
  description,

  applicationName: "repo·scope",

  openGraph: {
    title,
    description,
    siteName: "repo·scope",
    type: "website",
  },

  twitter: {
    card: "summary",
    title,
    description,
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`
        ${figtree.variable}
        ${jetbrainsMono.variable}
        h-full
        antialiased
      `}
    >
      <body className="flex min-h-full flex-col">
        {children}
      </body>
    </html>
  );
}