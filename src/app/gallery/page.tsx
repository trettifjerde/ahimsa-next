import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getListQueryParams } from "@/utils/serverHelpers";
import YearLayout from "@/components/ui/year/layout/year-layout";
import GalleryGrid from "@/components/gallery/gallery-grid";
import YearGallery from "@/components/gallery/year-gallery";
import GalleryLoading from "@/components/gallery/gallery-loading";

export const metadata: Metadata = {
    title: 'Galerije',
    description: 'Pogledajte slike Udruge Ahimsa'
}

export default function Gallery({ searchParams }: { searchParams?: { year?: string } }) {
    const year = searchParams?.year;
    const fetchParams = getListQueryParams({ year });

    // url params provided and invalid
    if (!fetchParams)
        redirect('/gallery');

    return <YearLayout header="Galerije" url="/gallery" GridComponent={GalleryGrid} Fallback={GalleryLoading}>
        <YearGallery fetchParams={fetchParams} year={year} />
    </YearLayout>
}