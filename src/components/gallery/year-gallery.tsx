
import { getYearGallery } from "@/sanity/lib/fetches";
import { getGalleryYearContent } from "@/utils/serverHelpers";
import { YearListQueryParams } from "@/utils/types";
import GalleryFetcher from "./gallery-fetcher";

export default async function YearGallery({ fetchParams }: {
    fetchParams?: YearListQueryParams
}) {

    const entries = await getYearGallery(fetchParams);

    if (!entries)
        throw new Error('Failed to fetch gallery');

    const initInfo = getGalleryYearContent(entries, fetchParams?.year || null);

    return <GalleryFetcher initInfo={initInfo} />
}