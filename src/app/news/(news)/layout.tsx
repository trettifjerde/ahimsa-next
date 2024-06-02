import NewsGrid from "@/components/news/news-grid";
import YearLayout from "@/components/ui/year/layout/year-layout";
import { ReactNode } from "react";

export default function NewsLayo({children}: {children: ReactNode}) {
    return <YearLayout header="Novosti" url="/news" GridComponent={NewsGrid}>
        {children}
    </YearLayout>
}