import { ReactNode } from "react";
import { Metadata } from "next";
import ListContextProvider from "@/components/ui/list/list-context-provider";
import NewsContext from "@/components/news/news-context";

export const metadata: Metadata = {
    title: 'Novosti',
    description: 'Događanja i aktivnosti Udruge'
}

export default function NewsStoreLayout({ children }: { children: ReactNode }) {
    return <ListContextProvider url="/news" keyName="start" Cont={NewsContext} >
        {children}
    </ListContextProvider>
}