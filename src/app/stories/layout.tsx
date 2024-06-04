import { ReactNode } from "react";
import { getCategoriesDict } from "@/sanity/lib/fetches";
import StoriesContextProvider from "@/components/stories/stories-context";

export default async function GeneralStoryLayout({children}: {children: ReactNode}) {
    const categories = await getCategoriesDict();

    return <StoriesContextProvider categories={categories}>
        {children}
    </StoriesContextProvider>
}