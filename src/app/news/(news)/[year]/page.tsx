import { redirect } from "next/navigation";
import { UDRUGA_ALL_YEARS } from "@/utils/clientHelpers";
import { getListQueryParams } from "@/utils/serverHelpers";
import YearNews from "@/components/news/year-news";

export default function News({ params }: { params?: { year?: string } }) {
    const fetchParams = getListQueryParams({selectedYear: params?.year});

    if (!fetchParams)
        redirect('/news');

    return <YearNews fetchParams={fetchParams} />
}

export async function generateStaticParams() {
    return UDRUGA_ALL_YEARS.map(year => ({year: year.toString()}));
}