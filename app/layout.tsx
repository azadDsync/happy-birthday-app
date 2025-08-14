import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const shineMonday = localFont({
  src: "../public/fonts/Shine Monday.otf",
  variable: "--font-shine-monday",
  display: "swap",
});

const simpleThursday = localFont({
  src: "../public/fonts/Simple Thursday.otf",
  variable: "--font-simple-thursday",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happy Birthday Rahul",
  description: "A special birthday celebration",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={`${shineMonday.variable} ${simpleThursday.variable} overflow-hidden`}>
        {children}
      </body>
    </html>
  );
}
