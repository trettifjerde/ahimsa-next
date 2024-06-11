import ArticlePageLayout from "@/components/article/art-page-layout";
import { ReactNode } from "react";

export default function NewsArticleLayout({children}: {children: ReactNode}) {
    return <ArticlePageLayout url="/stories" text="natrag na priče">
        {children}
    </ArticlePageLayout>
}