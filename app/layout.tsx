import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

import "./global.scss";

export const metadata: Metadata = {
  title: "Workflow Demo",
  description: "functional front-end workflow interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="apple-touch-icon" sizes="180x180" href="https://internal.hudu.app/app_assets/bunnyappleicon-fcdab4e6f2a31d85f99ab6acb00d81a937431229a8a204a25b1a947a2beb33f5.png"></link>
      <link rel="icon" type="image/png" sizes="32x32" href="https://internal.hudu.app/app_assets/bunnyfavicon-5a3a7ffe7353ceed2b204a3ce5bb1f522f1540a83dc93f538f14623ff64e8cc1.svg"></link>
      <body className={`${roboto.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
