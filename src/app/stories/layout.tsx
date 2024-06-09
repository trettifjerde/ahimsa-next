import { ReactNode } from "react";
import { getCategoriesDict } from "@/sanity/lib/fetches";
import StoriesContextProvider from "@/components/stories/stories-context";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Priče',
    description: 'Priče Udruge Ahimsa'
}

export default async function GeneralStoryLayout({children}: {children: ReactNode}) {
    const categories = await getCategoriesDict();

    return <StoriesContextProvider categories={categories}>
        {children}
    </StoriesContextProvider>
}