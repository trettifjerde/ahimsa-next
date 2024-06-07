import { redirect } from "next/navigation";
import YearGallery from "@/components/gallery/year-gallery";
import { GALLERY_BATCH_SIZE, UDRUGA_ALL_YEARS, getYearFromString, getYearPageGroqParams } from "@/utils/serverHelpers";

export default function Gallery({ params }: { params: { year: string } }) {
    const year = getYearFromString(params.year);

    if (!year)
        redirect('/gallery');

    return <YearGallery fetchParams={getYearPageGroqParams(GALLERY_BATCH_SIZE, year)} />
}

export async function generateStaticParams() {
    return UDRUGA_ALL_YEARS.map(year => ({ year }));
}