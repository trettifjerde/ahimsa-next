import type { Metadata, Viewport } from "next";
import { Poppins, Shantell_Sans } from "next/font/google";
import localFont from "next/font/local";
import { getFooterContacts } from "@/sanity/lib/fetches";
import { DESCRIPTION } from "@/utils/data";
import Navigation from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import "@/styles/globals.css";
import "@/styles/icons.css";
import { getMetaImageUrl } from "@/utils/image-helpers";
import { getPageOGMeta } from "@/utils/serverHelpers";

const mainFont = Poppins({ subsets: ["latin-ext"], weight: ["300", "400", "500", "600"], variable: '--mainFont' });
const handwritten = Shantell_Sans({ subsets: ["latin-ext"], weight: ["300", "400", "500", "600"], variable: '--handwritten' });
const faIcons = localFont({ src: '../fonts/icomoon.ttf', variable: '--icons' });

export const metadata: Metadata = {
  title: {
    template: "%s | Ahimsa",
    default: 'Ahimsa'
  },
  description: DESCRIPTION,
  openGraph: getPageOGMeta(null)
};

export const viewport : Viewport = {
  themeColor: '#a9d3ec'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const footerInfo = await getFooterContacts();

  return (
    <html lang="hr">
      <body className={`${mainFont.className} ${mainFont.variable} ${handwritten.variable} ${faIcons.variable}`}>
        <Navigation />
          {children}
        <Footer info={footerInfo}/>
      </body>
    </html>
  );
}
