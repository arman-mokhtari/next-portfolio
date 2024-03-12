import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-vazir",
});

export const metadata: Metadata = {
  title: "وبسایت شخصی",
  description:
    "اینجا مکانی است که من محتوا و ایده‌های خود را با دیگران به اشتراک می‌گذارم و امیدوارم که این تجربه برای دیگران نیز مفید و جذاب باشد.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: "primary-gradient",
          footerActionLink: "primary-text-gradient hover:text-primary-500",
        },
      }}
    >
      <html lang="fa" dir="rtl">
        <body className={vazir.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
