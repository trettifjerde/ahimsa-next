
import { getYearGallery } from "@/sanity/lib/fetches";
import { makeFetcherInitInfo, makeGalleryPics } from "@/utils/serverHelpers";
import GalleryFetcher from "./gallery-fetcher";
import { GroqYearParams } from "@/utils/types";
import GalleryGrid from "./gallery-grid";
import { GALLERY_BATCH_SIZE } from "@/utils/env-fallback";

export default async function YearGallery({ fetchParams }: {
    fetchParams?: GroqYearParams,
}) {

    const entries = await getYearGallery(fetchParams);

    if (!entries)
        throw new Error('Failed to fetch gallery');

    return <>
        <h1>Galerije</h1>
        <GalleryGrid>
            <GalleryFetcher 
                initInfo={makeFetcherInitInfo(entries, GALLERY_BATCH_SIZE, fetchParams?.start)}
                initItems={makeGalleryPics(entries)} 
            />
        </GalleryGrid>
    </>
}