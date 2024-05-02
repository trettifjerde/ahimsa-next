import { ReactNode } from "react";
import YearLayout from "@/components/ui/year/layout/year-layout";
import NewsGrid from "@/components/news/news-grid";

export default function NewsLayout({children}: {children: ReactNode}) {
    return <YearLayout header="Novosti" url="/news" GridComponent={NewsGrid}>
        {children}
    </YearLayout>
}