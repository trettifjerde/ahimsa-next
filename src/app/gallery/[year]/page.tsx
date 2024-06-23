import { redirect } from "next/navigation";
import YearGallery from "@/components/gallery/year-gallery";
import { getYearFromString } from "@/utils/serverHelpers";
import { UDRUGA_ALL_YEARS } from "@/utils/env-fallback";

export default function Gallery({ params }: { params: { year: string } }) {
    const year = getYearFromString(params.year);

    if (!year)
        redirect('/gallery');

    return <YearGallery year={year} />
}

export async function generateStaticParams() {
    return UDRUGA_ALL_YEARS.map(year => ({ year }));
}