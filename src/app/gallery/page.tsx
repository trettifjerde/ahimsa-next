import { redirect } from "next/navigation";
import { getYearGallery } from "@/sanity/lib/fetches";
import { GALLERY_BATCH_SIZE, getListQueryParams } from "@/utils/serverHelpers";
import GalleryFetcher from "@/components/gallery/gallery-fetcher";

export default async function Gallery({ searchParams }: { searchParams?: { year?: string } }) {
    const year = searchParams?.year;
    const fetchParams = getListQueryParams({ year });

    // url params provided and invalid
    if (!fetchParams)
        redirect('/gallery');

    const entries = await getYearGallery(fetchParams);

    if (!entries)
        throw new Error('Failed to fetch gallery');

    return <GalleryFetcher initInfo={{entries, batchSize: GALLERY_BATCH_SIZE, year}}/>
}