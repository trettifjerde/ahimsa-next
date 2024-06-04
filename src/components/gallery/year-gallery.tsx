
import { getYearGallery } from "@/sanity/lib/fetches";
import { getGalleryFetcherEntry } from "@/utils/serverHelpers";
import { YearListQueryParams } from "@/utils/types";
import GalleryFetcher from "./gallery-fetcher";
import { getEntriesKey } from "@/utils/clientHelpers";

export default async function YearGallery({ fetchParams, yearKey }: {
    fetchParams?: YearListQueryParams,
    yearKey?: string
}) {

    const entries = await getYearGallery(fetchParams);

    if (!entries)
        throw new Error('Failed to fetch gallery');

    const initInfo = {...getGalleryFetcherEntry(entries), key: getEntriesKey(yearKey)};

    return <GalleryFetcher initInfo={initInfo} />
}