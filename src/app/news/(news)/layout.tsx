import NewsGrid from "@/components/news/news-grid";
import ListLayout from "@/components/ui/list/layout/list-layout";
import { ReactNode } from "react";

export default function NewsLayo({children}: {children: ReactNode}) {
    return <ListLayout url="/news" GridComponent={NewsGrid}>
        {children}
    </ListLayout>
}