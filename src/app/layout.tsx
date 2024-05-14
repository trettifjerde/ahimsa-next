import type { Metadata } from "next";
import { Poppins, Shantell_Sans } from "next/font/google";
import localFont from "next/font/local";
import Navigation from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { DESCRIPTION } from "@/utils/data";
import "@/styles/globals.css";
import "@/styles/icons.css";
import Main from "@/components/layout/main";

const mainFont = Poppins({ subsets: ["latin-ext"], weight: ["300", "400", "500", "600"], variable: '--mainFont' });
const handwritten = Shantell_Sans({ subsets: ["latin-ext"], weight: ["300", "400", "500", "600"], variable: '--handwritten' });
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
      <body className={`${mainFont.className} ${mainFont.variable} ${handwritten.variable} ${icons.variable}`}>
        <Navigation />
        <div id="content">
          <Main>
            {children}
          </Main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
