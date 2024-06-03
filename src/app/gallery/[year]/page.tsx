import { redirect } from "next/navigation";
import { UDRUGA_ALL_YEARS } from "@/utils/clientHelpers";
import YearGallery from "@/components/gallery/year-gallery";
import { getGroqBatchParams } from "@/utils/serverHelpers";

export default function Gallery({ params }: { params?: { year?: string } }) {
    const fetchParams = getGroqBatchParams({selectedYear: params?.year});

    if (!fetchParams)
        redirect('/gallery');

    return <YearGallery fetchParams={fetchParams} />
}

export async function generateStaticParams() {
    return UDRUGA_ALL_YEARS.map(year => ({ year: year.toString() }));
}