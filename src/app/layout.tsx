import type { Metadata, Viewport } from "next";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@/context/ThemeProvider";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-vazir",
});

const absoluteUrl = process.env.ABSOLUTE_URL || "";
const relativeUrl = process.env.RELATIVE_URL || "";
const owner = process.env.OWNER || "";
const siteName = process.env.SITENAME || "";
const twitterId = process.env.TWITTER_ID || "";
const twitterAcc = process.env.TWITTER_ACC || "";
const googleVerification = process.env.GOOGLE_VERIFICATION || "";

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl),
  category: "technology",
  generator: `${relativeUrl}`,
  applicationName: siteName,
  referrer: "origin-when-cross-origin",
  authors: { name: owner, url: absoluteUrl },
  creator: owner,
  publisher: owner,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    siteName,
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    siteId: twitterId,
    creator: twitterAcc,
    creatorId: twitterId,
  },
  verification: {
    google: googleVerification,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F1F1F1" },
    { media: "(prefers-color-scheme: dark)", color: "#22273b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <GoogleTagManager gtmId="GTM-WNVC3QP2" />
      <GoogleAnalytics gaId="G-GZ896FTNNQ" />
      <body className={vazir.className}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: "primary-gradient",
              footerActionLink: "primary-text-gradient hover:text-primary-500",
            },
          }}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
