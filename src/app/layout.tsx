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

export const metadata: Metadata = {
  title: "Entourage",
  description: "Your personal entourage",
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
        <body
          className={`${switzer.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
