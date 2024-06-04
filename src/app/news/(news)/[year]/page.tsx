import { redirect } from "next/navigation";
import YearNews from "@/components/news/year-news";
import { UDRUGA_ALL_YEARS, getGroqNewsParams } from "@/utils/serverHelpers";

export default function News({ params }: { params: { year: string } }) {
    const key = params.year;
    const fetchParams = getGroqNewsParams({selectedYear: key});

    if (!fetchParams)
        redirect('/news');

    return <YearNews fetchParams={fetchParams} yearKey={key} />
}

export async function generateStaticParams() {
    return UDRUGA_ALL_YEARS.map(year => ({year}));
}