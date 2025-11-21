import Script from "next/script";
import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({ 
  subsets: ["latin"],
  weight: ['300', '400', '600', '700'],
  variable: '--font-source-sans'
});

export const metadata: Metadata = {
  title: "Montblanc Book Advisor",
  description: "Demo app for Montblanc Book Advisor using OpenAI ChatKit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`antialiased ${sourceSans.variable}`}>{children}</body>
    </html>
  );
}
