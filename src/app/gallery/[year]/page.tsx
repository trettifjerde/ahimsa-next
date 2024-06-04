import { redirect } from "next/navigation";
import YearGallery from "@/components/gallery/year-gallery";
import { UDRUGA_ALL_YEARS, getGroqGalleryParams } from "@/utils/serverHelpers";

export default function Gallery({ params }: { params: { year: string } }) {
    const year = params.year;
    const fetchParams = getGroqGalleryParams({selectedYear: year});

    if (!fetchParams)
        redirect('/gallery');

    return <YearGallery fetchParams={fetchParams} yearKey={year} />
}

export async function generateStaticParams() {
    return UDRUGA_ALL_YEARS.map(year => ({ year }));
}