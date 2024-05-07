import NewsGeneralLayout from "@/components/news/news-context";
import { NEWS_BATCH_SIZE } from "@/utils/serverHelpers";
import { ReactNode } from "react";

export default function NewsStoreLayout({children}: {children: ReactNode}) {
    return <NewsGeneralLayout batchSize={NEWS_BATCH_SIZE}>
        {children}
    </NewsGeneralLayout>
}