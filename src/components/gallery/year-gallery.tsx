import { getYearGallery } from "@/sanity/lib/fetches";
import { GALLERY_BATCH_SIZE, getListQueryParams } from "@/utils/serverHelpers";
import GalleryFetcher from "./gallery-fetcher";

export default async function YearGallery({fetchParams, year}: {
    fetchParams: Exclude<ReturnType<typeof getListQueryParams>, null>, 
    year?: string}) {

    const entries = await getYearGallery(fetchParams);

    if (!entries)
        throw new Error('Failed to fetch gallery');

    return <GalleryFetcher initInfo={{ entries, batchSize: GALLERY_BATCH_SIZE, year }} />
}