import type { Metadata } from "next";
import { Chilanka, Poppins } from "next/font/google";
import localFont from "next/font/local";
import Navigation from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { DESCRIPTION } from "@/utils/data";
import "../globals.css";
import "../icons.css";

const inter = Poppins({ subsets: ["latin-ext"], weight: ["300", "400", "500", "700"] });
const chilanka = Chilanka({ subsets: ["latin-ext"], weight: ["400"], variable: '--chilanka' });
const icons = localFont({ src: '../fonts/icomoon.ttf', variable: '--icons' });

export const metadata: Metadata = {
  title: "Ahimsa",
  description: DESCRIPTION
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr">
      <body className={`${inter.className} ${chilanka.variable} ${icons.variable}`}>
        <Navigation />
        <div id="content">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
