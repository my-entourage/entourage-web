import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/providers";
import "./globals.css";

const switzer = localFont({
  src: [
    {
      path: "./fonts/Switzer-Variable.woff2",
      style: "normal",
    },
    {
      path: "./fonts/Switzer-VariableItalic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-switzer",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://myentourage.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Entourage - AI Task Extraction",
    template: "%s | Entourage",
  },
  description:
    "Know what needs to be done. Without touching your task list. Automatically extract actionable items from meetings, chats, emails, and documents.",
  keywords: [
    "AI",
    "task extraction",
    "productivity",
    "automation",
    "task management",
    "meeting notes",
    "email processing",
  ],
  authors: [{ name: "Entourage" }],
  creator: "Entourage",
  publisher: "Entourage",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Entourage",
    title: "Entourage - AI Task Extraction",
    description:
      "Know what needs to be done. Without touching your task list.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Entourage - AI Task Extraction Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Entourage - AI Task Extraction",
    description:
      "Know what needs to be done. Without touching your task list.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Entourage",
  url: "https://myentourage.dev",
  logo: "https://myentourage.dev/logo.svg",
  description:
    "AI-powered task extraction platform that automatically extracts actionable items from meetings, chats, emails, and documents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#10B981",
          colorDanger: "#F43F5E",
          colorSuccess: "#10B981",
          colorWarning: "#F59E0B",
          borderRadius: "0rem",
          fontFamily: '"Switzer", -apple-system, sans-serif',
        },
        elements: {
          formButtonPrimary:
            "bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white rounded-none hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors",
          card: "bg-white dark:bg-black border border-black dark:border-white rounded-none shadow-none",
          headerTitle: "text-black dark:text-white font-semibold",
          headerSubtitle: "text-zinc-500 dark:text-zinc-400",
          formFieldInput:
            "rounded-none border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black",
          footerActionLink: "text-emerald-500 hover:text-emerald-600",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
            }}
          />
        </head>
        <body
          className={`${switzer.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
