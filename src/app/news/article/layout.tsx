import ArticlePageLayout from "@/components/article/art-page-layout";
import { ReactNode } from "react";

export default function NewsArticleLayout({children}: {children: ReactNode}) {
    return <ArticlePageLayout url="/news" text="back to news">
        {children}
    </ArticlePageLayout>
}