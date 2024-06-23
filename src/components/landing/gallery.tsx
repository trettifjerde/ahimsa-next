import { makePics } from "@/utils/serverHelpers";
import GalleryViewer from "../gallery/gallery-viewer";
import { getLanding } from "@/sanity/lib/fetches";
import GalleryGrid from "../gallery/gallery-grid";
import { Suspense } from "react";
import { GallerySkeletonFallback } from "../gallery/gallery-skeleton-fallback";

export default function LandingGallery() {
    return <GalleryGrid>
        <Suspense fallback={<GallerySkeletonFallback />}>
            <LandingGalleryFetcher />
        </Suspense>
    </GalleryGrid>
}

async function LandingGalleryFetcher() {
    const landing = await getLanding();

    return <GalleryViewer pics={makePics(landing?.images || null)} />
}

