import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getListQueryParams } from "@/utils/serverHelpers";
import YearLayout from "@/components/ui/year/layout/year-layout";
import NewsGrid from "@/components/news/news-grid";
import YearNews from "@/components/news/year-news";
import NewsLoading from "@/components/news/news-loading";

export const metadata: Metadata = {
    title: 'Novosti',
    description: 'Događanja i aktivnosti Udruge'
}

export default function News({ searchParams }: { searchParams?: { year?: string } }) {
    const year = searchParams?.year;
    const fetchParams = getListQueryParams({ year });

    // url params provided and invalid
    if (!fetchParams)
        redirect('/news');

    return <YearLayout header="Novosti" url="/news" GridComponent={NewsGrid} Fallback={NewsLoading}>
        <YearNews year={year} fetchParams={fetchParams} />
    </YearLayout>
}