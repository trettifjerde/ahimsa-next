import { redirect } from "next/navigation";
import YearNews from "@/components/news/year-news";
import { UDRUGA_ALL_YEARS, getYearFromString } from "@/utils/serverHelpers";

export default function News({ params }: { params: { year: string } }) {

    const year = getYearFromString(params.year);

    if (!year)
        redirect('/news');

    return <YearNews year={year}/>
}

export async function generateStaticParams() {
    return UDRUGA_ALL_YEARS.map(year => ({year}));
}