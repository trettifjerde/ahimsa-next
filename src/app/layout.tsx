import type { Metadata, Viewport } from "next";
import { Poppins, Shantell_Sans } from "next/font/google";
import localFont from "next/font/local";
import { DESCRIPTION } from "@/utils/data";
import Navigation from "@/components/layout/nav";
import Main from "@/components/layout/main";
import Footer from "@/components/layout/footer";
import "@/styles/globals.css";
import "@/styles/icons.css";
import leafStyles from '@/styles/leaf.module.css';

const mainFont = Poppins({ subsets: ["latin-ext"], weight: ["300", "400", "500", "600"], variable: '--mainFont' });
const handwritten = Shantell_Sans({ subsets: ["latin-ext"], weight: ["300", "400", "500", "600"], variable: '--handwritten' });
const icons = localFont({ src: '../fonts/icomoon.ttf', variable: '--icons' });

export const metadata: Metadata = {
  title: "Ahimsa",
  description: DESCRIPTION,
};

export const viewport : Viewport = {
  themeColor: '#a9d3ec'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr">
      <body className={`${leafStyles.lf} ${mainFont.className} ${mainFont.variable} ${handwritten.variable} ${icons.variable}`}>
        <Navigation />
        <Main>
          {children}
        </Main>
        <Footer />
      </body>
    </html>
  );
}
