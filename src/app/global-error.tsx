"use client";

import ErrorHandling from "@/components/shared/ErrorHandling";
import { Vazirmatn } from "next/font/google";
const vazir = Vazirmatn({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-vazir",
});

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazir.className}>
        <ErrorHandling onClick={() => reset()} />
      </body>
    </html>
  );
}
