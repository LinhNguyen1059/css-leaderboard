import type { Metadata } from "next";
import { Fira_Code, Roboto } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/components/QueryProvider";

import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CSS - Bảng Thông Thần",
  description:
    "Nơi các 'Thông thủ' Counter-Strike Source tụ họp để thông nhau một cách văn minh nhất! Theo dõi chi tiết từng nhát dao, đếm từng lời chat, và xếp hạng ai là 'Vua Thông' của server I3 - tất cả đều được ghi chép tỉ mỉ như sổ sách nhà Ming. Đây chính là Wikipedia của làng 'đâm chém' I3! 🔪💬📊",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${firaCode.variable} font-[family-name:var(--font-roboto)] antialiased`}
      >
        <QueryProvider>
          {children}
          <Toaster richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
