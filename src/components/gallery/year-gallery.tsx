import { getYearGallery } from "@/sanity/lib/fetches";
import { GalleryEvent } from "@/sanity/lib/types";
import { GALLERY_BATCH_SIZE, YearListQueryParams } from "@/utils/serverHelpers";
import GalleryFetcher from "./gallery-fetcher";
import { makeGalleryPics } from "@/utils/clientHelpers";

export default async function YearGallery({ fetchParams }: {
    fetchParams?: YearListQueryParams
}) {

    const entries = await getYearGallery(fetchParams);

    if (!entries)
        throw new Error('Failed to fetch gallery');

    const lastEntry: GalleryEvent | undefined = entries[entries.length - 1];

    return <GalleryFetcher initInfo={{
        lastDate: lastEntry?.date || '',
        hasMore: entries.length === GALLERY_BATCH_SIZE,
        year: fetchParams?.year || null,
        items: makeGalleryPics(entries)
    }} />
}