import { ReactNode } from "react";
import { Metadata } from "next";
import NewsGeneralLayout from "@/components/news/news-context";

export const metadata: Metadata = {
    title: 'Novosti',
    description: 'Događanja i aktivnosti Udruge'
}

export default function NewsStoreLayout({ children }: { children: ReactNode }) {
    return <NewsGeneralLayout>
        {children}
    </NewsGeneralLayout>
}