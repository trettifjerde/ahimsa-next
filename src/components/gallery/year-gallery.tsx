import GalleryGrid from "./gallery-grid";
import GalleryFetcher from "./gallery-fetcher";
import { Suspense } from "react";
import { GallerySkeletonFallback } from "./gallery-skeleton-fallback";

export default function YearGallery({ year }: {year?: number}) {

    return <>
        <h1>Galerije</h1>
        <GalleryGrid>
            <Suspense fallback={<GallerySkeletonFallback />}>
                <GalleryFetcher year={year} />
            </Suspense>
        </GalleryGrid>
    </>
}