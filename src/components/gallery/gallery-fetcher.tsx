import GalleryFetcherClient from "./gallery-fetcher-client";
import { getYearPageGroqParams, makeFetcherInitInfo, makeGalleryPics } from "@/utils/serverHelpers";
import { GALLERY_BATCH_SIZE } from "@/utils/env-fallback";
import { getYearGallery } from "@/sanity/lib/fetches";

export default async function GalleryFetcher({ year }: {year?: number}) {
    const fetchParams = getYearPageGroqParams(GALLERY_BATCH_SIZE, year);
    const entries = await getYearGallery(fetchParams);

    // await new Promise((res, rej) => setTimeout(() => res(1), 3000));

    return <GalleryFetcherClient 
            initInfo={makeFetcherInitInfo(entries, GALLERY_BATCH_SIZE, fetchParams.start)}
            initItems={makeGalleryPics(entries)} 
    />
}